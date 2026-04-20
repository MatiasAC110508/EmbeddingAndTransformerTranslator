"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/src/components/Input";
import { loginSchema } from "@/src/lib/validations/auth";
import Link from "next/link";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleKeyDown = (email: React.KeyboardEvent) => {
        if (email.key === "Enter") {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        setError("");

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            setError(data.error);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
            <h1 className="text-xl font-bold">Login</h1>

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

            {error && (
                <div className="bg-red-900/20 border border-red-600 text-red-400 p-3 rounded">
                    {error}
                </div>
            )}

            <button 
                onClick={handleLogin}
                disabled={loading}  
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-2 rounded"
            >
                {loading ? "Creating..." : "Login"}  {/* ← change the text */}
            </button>

            <p className="text-sm text-gray-400 text-center">
                Don't have an account? <Link href="/auth/register">Create one</Link>
            </p>
        </div>
    );
}   