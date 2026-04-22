"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/src/components/Input";
import AppButton from "@/src/components/ui/AppButton";
import Alert from "@/src/components/ui/Alert";
import { registerSchema } from "@/src/lib/validations/auth";

// The register form remains compact so it fits the viewport comfortably.
export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);

    const parsed = registerSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to create the account.");
        return;
      }

      router.push("/auth/login");
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
        autoComplete="new-password"
        label="Password"
        name="password"
        placeholder="Create a password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Input
        autoComplete="new-password"
        label="Confirm password"
        name="confirmPassword"
        placeholder="Repeat your password"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
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
        {loading ? "Creating account..." : "Create account"}
      </AppButton>

      <p className="text-center text-sm text-slate-400">
        Already registered?{" "}
        <Link className="text-sky-200 hover:text-sky-100" href="/auth/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
