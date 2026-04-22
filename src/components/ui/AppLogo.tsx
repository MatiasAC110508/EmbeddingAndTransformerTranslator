import Link from "next/link";

// The brand mark is reused across the landing page, auth screens, and dashboard.
export default function AppLogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:border-sky-200/30 hover:bg-white/10"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-300 via-cyan-200 to-amber-200 text-sm font-semibold text-slate-950">
        ET
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] font-semibold tracking-[0.22em] uppercase text-white/60">
          Embeddings
        </span>
        <span className="block text-sm text-white">Transformer Workspace</span>
      </span>
    </Link>
  );
}
