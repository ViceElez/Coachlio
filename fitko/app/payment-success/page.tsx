import Link from "next/link"
import { redirect } from "next/navigation"
import { routes } from "@/constants/routes"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
})

export default async function PaymentSuccess({searchParams,}: {
    searchParams: Promise<{ payment_intent: string; redirect_status: string }>
}) {
    const { payment_intent, redirect_status } = await searchParams

    if (redirect_status === "failed") redirect(routes.PAYMENT_FAILED)
    if (!payment_intent) redirect("/")

    const intent = await stripe.paymentIntents.retrieve(payment_intent)
    if (intent.status !== "succeeded") redirect(routes.PAYMENT_FAILED)

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md text-center">
                <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Confirmed</h1>
                    <p className="text-gray-500 mt-3 leading-relaxed">
                        Thank you! Your session has been successfully booked.
                    </p>
                    <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col gap-3">
                        <Link
                            href={routes.DASHBOARD}
                            className="w-full inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                            Go to Dashboard
                        </Link>
                        <Link
                            href={routes.BOOK}
                            className="w-full inline-flex items-center justify-center border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Back to Bookings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}