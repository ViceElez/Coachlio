"use client"

import { useEffect } from "react"
import Link from "next/link"
import { routes } from "@/constants/routes"

export default function PaymentFailed() {
    useEffect(() => {
        alert("Your payment failed. Please try again or use a different card.")
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md text-center">
                <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
                    <p className="text-gray-500 mt-3 leading-relaxed">
                        We couldn't process your payment. Please try again or use a different card.
                    </p>
                    <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col gap-3">
                        <Link
                            href={routes.BOOK}
                            className="w-full inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                            Try Again
                        </Link>
                        <Link
                            href={routes.DASHBOARD}
                            className="w-full inline-flex items-center justify-center border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}