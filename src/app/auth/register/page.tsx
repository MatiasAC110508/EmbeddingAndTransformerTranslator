"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import Input from "@/src/components/Input";
import { registerSchema } from "@/src/lib/validations/auth";


export default function Register() {
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleKeyDown = (email: React.KeyboardEvent) => {
        if (email.key === "Enter") {
            handleRegister();
        }
    }

    const handleRegister = async () => {
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = registerSchema.safeParse({ email, password, confirmPassword });
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        // Initialize the loading and call the API
        setLoading(true);
        try {
            const res = await fetch ("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                setLoading(false);
                return;
            }

            router.push("/auth/login");
        } catch (error) {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
            <h1 className="text-xl font-bold">Register</h1>

            <Input 
             type="email"
             placeholder="Email"
             value={email}
             onChange={setEmail} 
            />

            <Input 
             type="password"
             placeholder="Password"
             value={password}
             onChange={setPassword} 
            />

            <Input 
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword} 
            />

            {error && (
                <div className="bg-red-900/20 border border-red-600 text-red-400 p-3 rounded">
                    {error}
                </div>
            )}

            <button 
                onClick={handleRegister}
                disabled={loading}  
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-2 rounded"
            >
                {loading ? "Creating..." : "Create Account"}  {/* ← Change the text */}
            </button>

            <p className="text-sm text-gray-400 text-center">
            Already have an account? <Link href="/auth/login">Login</Link>
            </p>
        </div>
    );
}
