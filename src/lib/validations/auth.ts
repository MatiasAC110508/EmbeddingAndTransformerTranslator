import { z, string } from "zod";

// Zod object for registration
export const registerSchema = z.object({
    email: string().email("Please enter a valid email address").lowercase().trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Zod object for login
export const loginSchema = z.object({
    email: string().email("Please enter a valid email address").lowercase().trim(),
    password: z.string().min(1, "Password is required"),
});

