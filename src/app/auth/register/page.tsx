"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/src/components/Input";
import { registerSchema } from "@/src/lib/validations/auth";

export default function Register() {
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");

        const result = registerSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();


        if (!res.ok) {
            setError(data.error);
            return;
        }
        
        router.push("/login");
    };
    return (
        <div className="flex flex-col gap-4">
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

            <button 
             onClick={handleRegister}
             className="bg-green-600 p-2 rounded"
            >
             Create account
            </button>
        </div>
    );
}
