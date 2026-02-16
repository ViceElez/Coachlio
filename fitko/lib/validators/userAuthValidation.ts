import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
    lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
    email: z.email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters"),
});
