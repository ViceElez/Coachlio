"use server"

import {createClient} from "@/utils/supabase/server";
import Stripe from "stripe";
import {convertToSubcurrency} from "@/lib/helper/convertToSubcurrency";
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import {revalidatePath} from "next/cache";
import {routes} from "@/constants/routes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
})

export async function reserveSession(sessionId: number) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const [{ data: session, error: sessionError }, { data: userPrivate }] = await Promise.all([
        supabase.from("sessions").select("price, capacity_available").eq("id", sessionId).single(),
        supabase.from("user_private").select("credits").eq("id", user.id).single(),
    ])

    if (sessionError || !session) throw new Error("Session not found")
    if (typeof session.capacity_available === "number" && session.capacity_available <= 0) {
        throw new Error("Session is full. Please refresh the page and choose another time.")
    }

    const priceInCents = convertToSubcurrency(session.price)
    const credits = userPrivate?.credits ?? 0
    const creditsToApply = Math.min(credits, priceInCents)
    const stripeAmount = priceInCents - creditsToApply

    if (stripeAmount === 0) {
        const { data: booking, error: rpcError } = await supabase.rpc("reserve_session", {
            p_session_id: sessionId,
            p_payment_intent_id: null,
        })

        if (rpcError) throw new Error(rpcError.message)

        await supabase.rpc("deduct_credits", {
            p_user_id: user.id,
            p_amount: creditsToApply,
            p_booking_id: booking.id,
        })

        await supabase.from("bookings").update({ status: "paid" }).eq("id", booking.id)

        return { ...booking, clientSecret: null, fullyPaidWithCredits: true, creditsApplied: creditsToApply }
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: stripeAmount,
        currency: "eur",
        automatic_payment_methods: { enabled: true },
        metadata: { sessionId: String(sessionId) },
    })

    const { data: booking, error: rpcError } = await supabase.rpc("reserve_session", {
        p_session_id: sessionId,
        p_payment_intent_id: paymentIntent.id,
    })

    if (rpcError) {
        await stripe.paymentIntents.cancel(paymentIntent.id)
        throw new Error(rpcError.message)
    }

    if (creditsToApply > 0) {
        const { error: creditError } = await supabase.rpc("deduct_credits", {
            p_user_id: user.id,
            p_amount: creditsToApply,
            p_booking_id: booking.id,
        })

        if (creditError) {
            await stripe.paymentIntents.cancel(paymentIntent.id)
            throw new Error(creditError.message)
        }
    }

    return {
        ...booking,
        clientSecret: paymentIntent.client_secret,
        fullyPaidWithCredits: false,
        creditsApplied: creditsToApply,
    }
}

export async function getBookingSession(bookingId: number) {
    const supabase = await createClient()

    const { data: booking, error } = await supabase
        .from('bookings')
        .select(`id, status, stripe_payment_intent_id, sessions!inner(id, price, trainer:users (first_name, last_name))`)
        .eq("id", bookingId)
        .single()

    if (error) {
        console.error("Error fetching booking:", error)
        throw new Error("Unable to fetch booking. Please try again later.")
    }

    if (!booking) {
        console.error("Booking not found for id:", bookingId)
        throw new Error("Booking not found.")
    }

    const { data: creditTx } = await supabase
        .from("credit_transactions")
        .select("amount")
        .eq("booking_id", bookingId)
        .eq("type", "purchase")
        .single()

    const creditsApplied = creditTx ? Math.abs(creditTx.amount) : 0

    const intent = booking.stripe_payment_intent_id
        ? await stripe.paymentIntents.retrieve(booking.stripe_payment_intent_id)
        : null
    const session = Array.isArray(booking.sessions) ? booking.sessions[0] : booking.sessions

    if (!session) {
        console.error("No session found for booking:", booking)
        throw new Error("Session data not available for this booking.")
    }

    const trainer = Array.isArray(session?.trainer) ? session?.trainer[0] : session?.trainer

    return {
        ...booking,
        clientSecret: intent?.client_secret ?? null,
        creditsApplied,
        sessions: {
            ...session,
            trainer,
        }
    }
}

export async function updateBookingStatus(intentId: string) {
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("stripe_payment_intent_id", intentId)
        .single()

    if (error) {
        console.error("Error updating booking status:", error)
        throw new Error("Unable to update booking status. Please try again later.")
    }

    return data
}

export async function cancelBookingSession(bookingId: number) {
    const supabase = await createClient()

    const { data: booking, error: fetchError } = await supabase
        .from("bookings")
        .select("id, stripe_payment_intent_id, status")
        .eq("id", bookingId)
        .single()

    if (fetchError || !booking) {
        throw new Error("Unable to find booking. Please try again later.")
    }

    if (booking.status === "cancelled") {
        throw new Error("Booking is already cancelled.")
    }

    if (booking.status === "paid") {
        throw new Error("Cannot cancel a booking that has already been paid.")
    }

    if (booking.stripe_payment_intent_id) {
        try {
            await stripe.paymentIntents.cancel(booking.stripe_payment_intent_id)
        } catch (err: any) {
            if (err.code === "payment_intent_unexpected_state") {
                await stripe.refunds.create({
                    payment_intent: booking.stripe_payment_intent_id,
                })
            } else {
                throw new Error("Failed to cancel payment.")
            }
        }
    }

    const { error: rpcError } = await supabase.rpc("cancel_booking", {
        p_booking_id: booking.id,
    })

    if (rpcError) throw new Error(rpcError.message)
}

export async function handleFailedPayment(paymentIntentId: string) {
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("stripe_payment_intent_id", paymentIntentId)
        .eq("status", "reserved")

    if (error) throw new Error("Unable to update booking status.")
}

export async function handleStripeCancellation(bookingId: number) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .select("id, status, sessions!inner(price,start_time)")
        .eq("id", bookingId)
        .eq("client_id", user.id)
        .single();

    if (bookingError || !booking) return { error: "Booking not found" };
    if (booking.status === "cancelled") return { error: "Already cancelled" };

    const sessionRow = Array.isArray(booking.sessions) ? booking.sessions[0] : booking.sessions;
    const price = sessionRow?.price;

    const startTimeRaw = sessionRow?.start_time;
    const startTime = startTimeRaw ? new Date(startTimeRaw) : null;

    if (!startTime || Number.isNaN(startTime.getTime())) {
        return { error: "Session start time not available" };
    }

    const MS_12_HOURS = 12 * 60 * 60 * 1000;
    const timeUntilStart = startTime.getTime() - Date.now();

    if (timeUntilStart <= MS_12_HOURS) {
        return { error: "You cannot cancel within 12 hours of the session start time." };
    }

    if (typeof price !== "number") {
        return { error: "Session price not available" };
    }

    const { error: rpcError } = await supabase.rpc("cancel_booking_and_credit", {
        p_booking_id: bookingId,
        p_user_id: user.id,
        p_amount: convertToSubcurrency(price),
    });

    if (rpcError) return { error: rpcError.message };

    revalidatePath(routes.BOOK);
    return { success: true };
}
