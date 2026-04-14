"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutPage from "../components/CheckoutPage"
import { convertToSubcurrency } from "@/lib/helper/convertToSubcurrency"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function PaymentClient({ amount, clientSecret, bookingId, creditsApplied }: {
    amount: number
    clientSecret: string
    bookingId: number
    creditsApplied: number
}) {
    const priceInCents = convertToSubcurrency(amount)
    const remainingInCents = priceInCents - creditsApplied
    const remainingFormatted = (remainingInCents / 100).toFixed(2)
    const creditsFormatted = (creditsApplied / 100).toFixed(2)

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
                </div>

                <div className="bg-white border rounded-2xl p-6 mb-6 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Session price</span>
                        <span>€{amount}</span>
                    </div>

                    {creditsApplied > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600">
                            <span>Credits applied</span>
                            <span>− €{creditsFormatted}</span>
                        </div>
                    )}

                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                        <span>Total due</span>
                        <span>€{remainingFormatted}</span>
                    </div>
                </div>

                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutPage
                        amount={remainingInCents / 100}
                        clientSecret={clientSecret}
                        bookingId={bookingId}
                    />
                </Elements>
            </div>
        </div>
    )
}