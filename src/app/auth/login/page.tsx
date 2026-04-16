"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/src/components/Input";
import { loginSchema } from "@/src/lib/validations/auth";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        <div className="flex flex-col gap-4">
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

            <button
             onClick={handleLogin}
             className="bg-blue-600 p-2 rounded"
            >    
             Login
            </button>
        </div>
    );
}   