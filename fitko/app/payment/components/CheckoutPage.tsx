"use client"

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

const CheckoutPage = ({amount, clientSecret,}: {
    amount: number
    clientSecret: string
}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        if (!stripe || !elements) {
            setLoading(false)
            return
        }

        const { error: submitError } = await elements.submit()
        if (submitError) {
            setErrorMessage(submitError.message || "Payment error")
            setLoading(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
            },
        })

        if (error) setErrorMessage(error.message || "Payment failed")
        setLoading(false)
    }

    if (!stripe || !elements) {
        return (
            <div className="flex flex-col items-center py-10 gap-3">
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-emerald-500 border-e-transparent" />
                <p className="text-sm text-gray-400">Loading payment...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <PaymentElement />
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    {errorMessage}
                </div>
            )}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl"
            >
                {loading ? "Processing..." : `Pay €${amount}`}
            </button>
        </form>
    )
}

export default CheckoutPage