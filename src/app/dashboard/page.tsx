import InterfacePanel from "@/src/components/InterfacePanel";
import AppLogo from "@/src/components/ui/AppLogo";
import { requireSession } from "@/src/lib/auth/session";

// The dashboard is server-protected so anonymous users never reach the private UI.
export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <section className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-hidden">
      <header className="surface-panel flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] px-5 py-4 sm:px-6 animate-fade-up">
        <div className="flex min-w-0 items-center gap-4">
          <AppLogo />

          <div className="hidden h-10 w-px bg-white/8 lg:block" />

          <div className="hidden min-w-0 lg:block">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-200">
              Dashboard
            </p>
            <p className="mt-1 truncate text-sm text-slate-400">
              One workspace for text input, transformer output, and embedding vectors.
            </p>
          </div>
        </div>

        <div className="rounded-full border border-emerald-300/16 bg-emerald-300/8 px-4 py-2 text-sm text-emerald-100">
          {session.email}
        </div>
      </header>

      <InterfacePanel userEmail={session.email} />
    </section>
  );
}
