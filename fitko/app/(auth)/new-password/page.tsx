"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/lib/auth-client";
import { routes } from "@/constants/routes";
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
import { Eye, EyeOff } from "lucide-react";

export default function NewPasswordPage() {
	const router = useRouter()
	const [data,setData]=useState<{
		password: string,
		confirmPassword: string
	}>({
		password:'',
		confirmPassword:''
	})
	const [showPassword,setShowPassword]=useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const confirmPassword=async ()=>{
		setError(null)
		setSuccess(null)
		const{password,confirmPassword}=data
		if(password!==confirmPassword){
			setError("Passwords do not match")
			return
		}
		if(password.length<8){
			setError("Password must be at least 8 characters")
			return
		}
		const {success:resetData,error}=await updatePassword(password)
		if(error){
			setError(error)
			return
		}
		if(resetData){
			setSuccess("Password updated successfully")
			setTimeout(() => {
				router.push(routes.DASHBOARD)
			}, 1500)
		}
	}

	const handleChange=(e:any)=>{
		const {name,value}=e.target
		setData((prev:any)=>({
			...prev,
			[name]:value
		}))
	}
	return (
		<div className="flex min-h-svh items-center justify-center px-4 py-10">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Set a new password</CardTitle>
					<CardDescription>
						Choose a strong password (at least 8 characters).
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{error && (
							<p className="text-red-500 text-center text-sm">{error}</p>
						)}
						{success && (
							<p className="text-emerald-600 text-center text-sm">{success}</p>
						)}
						<div className="grid gap-2">
							<Label htmlFor="password">New password</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword?"text":"password"}
									name="password"
									value={data?.password}
									onChange={handleChange}
									className="pr-11"
								/>
								<button
									type="button"
									onClick={()=>setShowPassword(prev=>!prev)}
									aria-label={showPassword ? "Hide password" : "Show password"}
									className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400"
								>
									{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirm new password</Label>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirmPassword?"text":"password"}
									name="confirmPassword"
									value={data?.confirmPassword}
									onChange={handleChange}
									className="pr-11"
								/>
								<button
									type="button"
									onClick={()=>setShowConfirmPassword(prev=>!prev)}
									aria-label={showConfirmPassword ? "Hide password" : "Show password"}
									className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400"
								>
									{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
						</div>

						<Button onClick={confirmPassword} className="w-full">
							Confirm
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

