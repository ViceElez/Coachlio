"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { sendResetPassword } from "@/lib/auth-client";

export default function ResetPasswordPage() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const resetPassword = async (email: string) => {
		try {
			setError(null);
			setSuccess(null);
			if (!email) {
				setError("Please enter your email");
				return;
			}
			setLoading(true);
			const res = await sendResetPassword(email);
			if (res?.error) {
				setError(res.error);
				return;
			}
			setSuccess("If an account with that email exists, a password reset link has been sent.");
		} catch (error) {
			console.log(error);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-svh items-center">
			<Card className="mx-auto max-w-sm w-full">
				<CardHeader>
					<CardTitle className="text-2xl">Reset password</CardTitle>
					<CardDescription>
						Enter your email and we’ll send you a password reset link.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							const form = e.currentTarget;
							const formData = new FormData(form);
							const email = String(formData.get("email") ?? "");
							await resetPassword(email);
							form.reset();
						}}
					>
						{error && (
							<p className="text-red-500 text-center mb-2 text-sm">{error}</p>
						)}
						{success && (
							<p className="text-emerald-600 text-center mb-2 text-sm">{success}</p>
						)}
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>

							<Button type="submit" className="w-full" disabled={loading}>
								Send reset link
							</Button>
						</div>
					</form>

					<div className="mt-4 text-center text-sm text-muted-foreground">
						Remembered your password?{" "}
						<Link href="/login" className="underline text-foreground">
							Back to login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
