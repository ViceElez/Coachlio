"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import React, { useRef, useState } from "react";

const SignInWithGoogleButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const didStartRef = useRef(false);

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isSubmitting}
            onClick={() => {
                if (didStartRef.current) return;
                didStartRef.current = true;
                setIsSubmitting(true);

                window.setTimeout(() => {
                    void signInWithGoogle();
                }, 0);
            }}
        >
            {isSubmitting ? "Continuing..." : "Continue with Google"}
        </Button>
    );
};

export default SignInWithGoogleButton;

