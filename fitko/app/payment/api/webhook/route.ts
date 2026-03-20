import { headers } from "next/headers"
import Stripe from "stripe"
import { updateBookingStatus, handleFailedPayment } from "@/lib/bookSession"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
})

export async function POST(req: Request) {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
        return new Response("No signature", { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.error("Webhook signature verification failed:", err)
        return new Response("Invalid signature", { status: 400 })
    }

    switch (event.type) {
        case "payment_intent.succeeded": {
            const intent = event.data.object as Stripe.PaymentIntent
            await updateBookingStatus(intent.id)
            break
        }
        case "payment_intent.payment_failed": {
            const intent = event.data.object as Stripe.PaymentIntent
            await handleFailedPayment(intent.id)
            break
        }
    }

    return new Response("OK", { status: 200 })
}