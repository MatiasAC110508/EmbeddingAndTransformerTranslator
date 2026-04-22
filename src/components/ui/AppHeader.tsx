import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="app-header container">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="section-label text-sm" aria-label="Home">
          E&T Workspace
        </Link>
      </div>

      <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link 
          href="/dashboard" 
          className="text-muted hover:text-foreground transition-colors text-sm"
        >
          Dashboard
        </Link>
        <Link 
          href="/auth/login" 
          className="text-muted hover:text-foreground transition-colors text-sm"
        >
          Sign in
        </Link>
        <Link 
          href="/auth/register" 
          className="text-muted hover:text-foreground transition-colors text-sm"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
