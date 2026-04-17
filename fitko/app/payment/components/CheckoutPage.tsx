"use client"

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { cancelBookingSession } from "@/lib/bookSession"
import { routes } from "@/constants/routes"

function formatMMSS(seconds: number) {
    const clamped = Math.max(0, Math.floor(seconds))
    const m = Math.floor(clamped / 60)
    const s = clamped % 60
    return `${m}:${String(s).padStart(2, "0")}`
}

const CheckoutPage = ({ amount, clientSecret,bookingId }: {
    amount: number
    clientSecret: string
    bookingId: number
}) => {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [cancelling, setCancelling] = useState(false)

    const hasExpiredRef = useRef(false)


    const [secondsLeft, setSecondsLeft] = useState(5 * 60)

    useEffect(() => {
        const id = window.setInterval(() => {
            setSecondsLeft((s) => Math.max(0, s - 1))
        }, 1000)
        return () => window.clearInterval(id)
    }, [])

    useEffect(() => {
        if (secondsLeft > 0 || hasExpiredRef.current) return

        hasExpiredRef.current = true
        setErrorMessage("Time ran out (5 minutes). Please try again.")

        const t = window.setTimeout(() => {
            router.push(`${routes.BOOK}?error=payment_timeout`)
        }, 1800)

        return () => window.clearTimeout(t)
    }, [secondsLeft, router])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (secondsLeft <= 0) {
            setErrorMessage("Time ran out (5 minutes). Please try again.")
            router.push(`${routes.BOOK}?error=payment_timeout`)
            return
        }

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

    const handleCancel = async () => {
        setCancelling(true)
        try {
            await cancelBookingSession(bookingId)
        } catch (err) {
            console.error("Cancel error:", err)
        } finally {
            router.push(routes.BOOK)
        }
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
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">Time left</p>
                <p className="text-sm text-gray-600 mt-1">{formatMMSS(secondsLeft)}</p>
            </div>
            <PaymentElement />
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    {errorMessage}
                </div>
            )}
            <button
                type="submit"
                disabled={!stripe || loading || secondsLeft <= 0}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:hover:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl"
            >
                {loading ? "Processing..." : `Pay €${amount}`}
            </button>
            <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling || loading}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-3 rounded-xl"
            >
                {cancelling ? "Cancelling..." : "Cancel & Go Back"}
            </button>
        </form>
    )
}

export default CheckoutPage