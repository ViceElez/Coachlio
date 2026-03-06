"use server"

import {createClient} from "@/utils/supabase/server";
import Stripe from "stripe";
import {convertToSubcurrency} from "@/lib/helper/convertToSubcurrency";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
})

export async function reserveSession(sessionId: number) {
    const supabase = await createClient()


    const { data: session, error: sessionError } = await supabase
        .from("sessions")
        .select("price")
        .eq("id", sessionId)
        .single()

    if (sessionError || !session) throw new Error("Session not found")

    const paymentIntent = await stripe.paymentIntents.create({
        amount: convertToSubcurrency(session.price),
        currency: "eur",
        automatic_payment_methods: { enabled: true },
        metadata: { sessionId: String(sessionId) },
    })

    const { data: booking, error: rpcError } = await supabase.rpc("reserve_session", {
        p_session_id: sessionId,
        p_client_secret: paymentIntent.client_secret,
        p_payment_intent_id: paymentIntent.id,
    })

    if (rpcError) {
        await stripe.paymentIntents.cancel(paymentIntent.id)
        throw new Error(rpcError.message)
    }

    return booking
}

export async function getBookingSession(bookingId: number) {
    const supabase = await createClient()

    const { data: booking, error } = await supabase.from('bookings').select(`id,stripe_client_secret,stripe_payment_intent_id, sessions!inner(id,price,trainer:users (first_name,last_name))`)
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

    const session = Array.isArray(booking.sessions) ? booking.sessions[0] : booking.sessions

    if (!session) {
        console.error("No session found for booking:", booking)
        throw new Error("Session data not available for this booking.")
    }

    const trainer = Array.isArray(session?.trainer) ? session?.trainer[0] : session?.trainer

    return {
        ...booking,
        sessions: {
            ...session,
            trainer,
        }
    }
}

export async function updateBookingStatus(intentId: string) {
    const supabase = await createClient()

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

export async function cancelBookingSession(clientSecret: string) {
    const supabase = await createClient()

    const { data: booking, error: fetchError } = await supabase
        .from("bookings")
        .select("id, stripe_payment_intent_id, status")
        .eq("stripe_client_secret", clientSecret)
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