'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/constants/routes";

const LogoutPage =  () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(()=> router.push(routes.WELCOME), 2000);
    }, []);
    return <div>You have logged out... redirecting in a sec.</div>;
};

export default LogoutPage;