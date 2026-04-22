import AuthShell from "@/src/components/auth/AuthShell";
import LoginForm from "@/src/components/auth/LoginForm";

// The login page keeps only the minimal copy needed for orientation.
export default function LoginPage() {
  return (
    <AuthShell title="Sign in" description="Open the workspace." footer="Protected by JWT.">
      <LoginForm />
    </AuthShell>
  );
}
