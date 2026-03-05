import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getBookingSession } from "@/lib/bookSession"
import {convertToSubcurrency} from "@/lib/helper/convertToSubcurrency";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
})

export async function POST(request: NextRequest) {

    try {
        const { bookingId } = await request.json()
        if (!bookingId) {
            return NextResponse.json(
                { error: "Missing bookingId" },
                { status: 400 }
            )
        }
        const booking = await getBookingSession(Number(bookingId))
        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            )
        }

        const price = booking?.sessions.price
        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertToSubcurrency(price),
            currency: "eur",
            automatic_payment_methods: { enabled: true },

            metadata: {
                bookingId: booking.id
            }
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {

        console.error("Error creating payment intent:", error)

        return NextResponse.json(
            { error: "Failed to create payment intent" },
            { status: 500 }
        )
    }
}