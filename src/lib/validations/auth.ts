import { string, z } from "zod";

// Register validation keeps all account creation rules in one place.
export const registerSchema = z
  .object({
    email: string()
      .email("Please enter a valid email address")
      .lowercase()
      .trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Login validation is intentionally smaller because it only checks sign-in inputs.
export const loginSchema = z.object({
  email: string()
    .email("Please enter a valid email address")
    .lowercase()
    .trim(),
  password: z.string().min(1, "Password is required"),
});
