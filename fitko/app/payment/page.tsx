"use client"

import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "@/app/payment/components/CheckoutPage";
import {convertToSubcurrency} from "@/lib/helper/convertToSubcurrency";
import {useState} from "react";

if(!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY){
    throw new Error("Stripe public key is not defined in environment variables");
}

const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentPage(){
    const [value] = useState<number>(() => {
        try {
            const raw = sessionStorage.getItem("checkout_session");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed.price === "number") {
                    return parsed.price;
                }
            }
        } catch(e) {
            console.error("Failed to parse checkout session from sessionStorage:", e);
        }
        return 50;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
                    <p className="text-gray-500 mt-1">Your session is reserved. Confirm your payment to finalize the booking.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Amount due</p>
                            <p className="text-3xl font-bold text-gray-900 mt-0.5">${value ?? "..."}</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode:"payment",
                            amount:convertToSubcurrency(value ?? 50),
                            currency:"eur",
                        }}
                    >
                        <CheckoutPage amount={value ?? 50}/>
                    </Elements>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Payments are processed securely via Stripe. Your card details are never stored.
                </p>
            </div>
        </div>
    )
}