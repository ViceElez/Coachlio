"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutPage from "../components/CheckoutPage"

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
)

export default function PaymentClient({amount, clientSecret,}: {
    amount: number
    clientSecret: string
}) {

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Complete Your Payment
                    </h1>
                </div>

                <div className="bg-white border rounded-2xl p-6 mb-6">
                    <p className="text-sm text-gray-500">Amount due</p>
                    <p className="text-3xl font-bold">€{amount}</p>
                </div>

                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutPage amount={amount} clientSecret={clientSecret} />
                </Elements>

            </div>
        </div>
    )
}