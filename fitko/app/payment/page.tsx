import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "@/app/payment/components/CheckoutPage";
import {convertToSubcurrency} from "@/lib/helper/convertToSubcurrency";

if(!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY){
    throw new Error("Stripe public key is not defined in environment variables");
}

const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentPage(){
    const value=50
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1>FITTONIA has requested ${value}</h1>

            <Elements
                stripe={stripePromise}
                options={{
                    mode:"payment",
                    amount:convertToSubcurrency(value),
                    currency:"eur",
                }}
            >
                <CheckoutPage amount={value}/>
            </Elements>
        </div>
    )
}