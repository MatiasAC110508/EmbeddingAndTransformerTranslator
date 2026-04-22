"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "@/src/components/Input";
import AppButton from "@/src/components/ui/AppButton";
import Alert from "@/src/components/ui/Alert";
import { loginSchema } from "@/src/lib/validations/auth";

// The login form keeps only the minimum interaction needed for authentication.
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);

    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to sign in right now.");
        return;
      }

      // A full navigation avoids race conditions between client routing and the fresh auth cookie.
      window.location.assign("/dashboard");
    } catch (submissionError) {
      console.error(submissionError);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-5 text-left">
      <Input
        autoComplete="email"
        label="Email"
        name="email"
        placeholder="you@example.com"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <Input
        autoComplete="current-password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      {error ? (
        <Alert variant="error">{error}</Alert>
      ) : null}

      <AppButton fullWidth disabled={loading} onClick={handleSubmit}>
        {loading ? "Signing in..." : "Sign in"}
      </AppButton>

      <p className="text-center text-sm text-slate-400">
        No account?{" "}
        <Link className="text-sky-200 hover:text-sky-100" href="/auth/register">
          Create one
        </Link>
      </p>
    </div>
  );
}
