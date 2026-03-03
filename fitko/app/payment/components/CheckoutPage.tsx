'use client';

import {useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";

const CheckoutPage = ({amount}:{amount:number}) => {
    const stripe=useStripe()
    const elements=useElements()
    const [erorrMessage,setErrorMessage]=useState<string|null>(null)
    const [clinetSecret,setClientSecret]=useState<string|null>(null)
    const [loading,setLoading]=useState(false)


    useEffect(()=>{
        
    },[])
}

export default CheckoutPage;
