import AuthShell from "@/src/components/auth/AuthShell";
import RegisterForm from "@/src/components/auth/RegisterForm";

// The register page matches the login layout with the same compact structure.
export default function RegisterPage() {
  return (
    <AuthShell title="Create account" description="Start your workspace." footer="Passwords are hashed.">
      <RegisterForm />
    </AuthShell>
  );
}
