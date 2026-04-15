import {createClient} from "@supabase/supabase-js";

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