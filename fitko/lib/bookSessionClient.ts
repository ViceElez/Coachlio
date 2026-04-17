import {createClient} from "@supabase/supabase-js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
})

export async function handleFailedPayment(paymentIntentId: string) {
    const supabase = createClient(
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

export async function updateBookingStatus(intentId: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: booking, error } = await supabase
        .from("bookings")
        .select("id, status, expires_at")
        .eq("stripe_payment_intent_id", intentId)
        .single()

    if (error || !booking) {
        console.error("Booking not found for payment intent:", intentId)
        return
    }

    if (booking.status === "expired" || new Date(booking.expires_at) < new Date()) {
        console.warn("Payment succeeded but booking expired:", booking.id)

        const { data: creditTx } = await supabase
            .from("credit_transactions")
            .select("amount")
            .eq("booking_id", booking.id)
            .eq("type", "purchase")
            .single()

        const creditsApplied = creditTx ? Math.abs(creditTx.amount) : 0

        const intent = await stripe.paymentIntents.retrieve(intentId)
        const stripeCharged = intent.amount

        if (stripeCharged > 0) {
            await stripe.refunds.create({
                payment_intent: intentId,
                amount: stripeCharged,
            })
        }

        if (booking.status !== "expired") {
            await supabase
                .from("bookings")
                .update({ status: "expired" })
                .eq("id", booking.id)
        }

        return
    }

    if (booking.status !== "reserved") {
        console.warn("Booking not in reserved state:", booking.id, booking.status)
        return
    }

    const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("id", booking.id)

    if (updateError) {
        console.error("Failed to mark booking as paid:", updateError)
        throw new Error("Unable to update booking status.")
    }
}