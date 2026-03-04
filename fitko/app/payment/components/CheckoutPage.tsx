'use client';

import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {convertToSubcurrency} from "@/lib/helper/convertToSubcurrency";

const CheckoutPage = ({amount}:{amount:number}) => {
    const stripe=useStripe()
    const elements=useElements()
    const [errorMessage,setErrorMessage]=useState<string|null>(null)
    const [clientSecret,setClientSecret]=useState<string|null>(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        fetch("/payment/api/create-payment-intent",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({amount:convertToSubcurrency(amount)})
        })
            .then((res)=>res.json())
            .then((data)=>setClientSecret(data.clientSecret))
    },[amount])

    const handleSubmit=async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        setLoading(true)

        if(!stripe || !elements){
            setErrorMessage("Stripe has not loaded yet. Please try again later.")
            setLoading(false)
            return
        }

        const {error:submitError}= await elements.submit()
        if(submitError){
            setErrorMessage(submitError.message || "An error occurred while submitting the payment details.")
            setLoading(false)
            return
            }

        const {error}=await stripe.confirmPayment({
            elements,
            clientSecret:clientSecret!,
            confirmParams:{
                return_url:`${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
            }
        })

        if(error){
            setErrorMessage(error.message || "An error occurred while confirming the payment.")
        }

        setLoading(false)
    }

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div
                    className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-emerald-500 border-e-transparent"
                    role="status"
                    aria-label="Loading"
                />
                <p className="text-sm text-gray-400">Loading payment details...</p>
            </div>
        );
    }

    return(
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {clientSecret && (
                <div className="rounded-xl overflow-hidden">
                    <PaymentElement/>
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || !clientSecret || loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors mt-1"
            >
                {loading ? "Processing..." : `Pay $${amount}`}
            </button>
        </form>
    )
}

export default CheckoutPage;
