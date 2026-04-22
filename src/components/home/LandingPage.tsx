import Link from "next/link";
import AppButton from "@/src/components/ui/AppButton";
import AppLogo from "@/src/components/ui/AppLogo";

const featureItems = [
  { title: "JWT auth", description: "Private access to the dashboard." },
  { title: "Transformer output", description: "Readable model feedback in one panel." },
  { title: "Vector output", description: "Embedding values with internal scroll only." },
];

const steps = ["Sign in", "Submit text", "Review the outputs"];

// The landing page introduces the product with short copy and one clear visual preview.
export default function LandingPage() {
  return (
    <section className="grid h-full min-h-0 gap-4 overflow-hidden lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)]">
      <section className="surface-panel relative min-h-0 overflow-hidden rounded-[2rem] p-6 sm:p-7 animate-fade-up">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_36%),radial-gradient(circle_at_88%_18%,_rgba(34,197,94,0.12),_transparent_22%),linear-gradient(135deg,_rgba(8,15,25,0.04),_rgba(255,216,139,0.05))]" />

        <div className="relative flex h-full min-h-0 flex-col justify-between gap-6">
          <div className="space-y-6">
            <AppLogo />

            <div className="space-y-4">
              <p className="section-label text-xs">Workspace</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl xl:text-[3.15rem]">
                Transformer and vector analysis in one clean workspace
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-400">
                Sign in, submit text, read the transformer result, and inspect the
                embedding vector without breaking the layout.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[auto_auto_1fr]">
              <Link href="/auth/register">
                <AppButton className="w-full min-w-44">Create account</AppButton>
              </Link>
              <Link href="/auth/login">
                <AppButton className="w-full min-w-44" variant="secondary">
                  Sign in
                </AppButton>
              </Link>
              <div className="rounded-[1.35rem] border border-emerald-300/18 bg-emerald-300/8 px-4 py-3 text-sm text-emerald-100">
                Ready for text analysis
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {featureItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.45rem] border border-white/10 bg-white/6 p-5"
              >
                <h2 className="text-base font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="surface-panel-strong grid min-h-0 gap-5 overflow-hidden rounded-[2rem] p-6 animate-fade-up-delay lg:grid-rows-[auto_auto_minmax(0,1fr)]">
        <div className="space-y-3">
          <p className="section-label text-xs">Flow</p>
          <p className="text-sm leading-6 text-slate-300">
            A short path from authentication to model outputs.
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {steps.map((step, index) => (
            <li
              key={step}
              className="rounded-[1.35rem] border border-white/10 bg-slate-950/40 px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm text-slate-300">{step}</p>
            </li>
          ))}
        </ol>

        <div className="grid min-h-0 gap-3 rounded-[1.6rem] border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                Preview
              </p>
              <p className="mt-2 text-sm text-slate-300">Compact dashboard layout</p>
            </div>

            <div className="rounded-full border border-sky-300/20 bg-sky-300/8 px-3 py-2 text-xs font-medium text-sky-100">
              Internal output scroll
            </div>
          </div>

          <div className="grid min-h-0 gap-3 lg:grid-rows-[auto_minmax(0,1fr)]">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.2rem] border border-emerald-300/14 bg-emerald-300/8 px-4 py-3 text-sm text-emerald-100">
                Session
              </div>
              <div className="rounded-[1.2rem] border border-amber-300/14 bg-amber-300/8 px-4 py-3 text-sm text-amber-100">
                Transformer
              </div>
              <div className="rounded-[1.2rem] border border-sky-300/14 bg-sky-300/8 px-4 py-3 text-sm text-sky-100">
                Vector
              </div>
            </div>

            <div className="grid min-h-0 gap-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4">
                <div className="h-11 rounded-[1rem] border border-white/8 bg-slate-900/90" />
                <div className="mt-3 h-40 rounded-[1.1rem] border border-white/8 bg-slate-900/70" />
                <div className="mt-3 h-11 rounded-[1rem] border border-sky-300/12 bg-sky-300/7" />
              </div>

              <div className="grid min-h-0 gap-3 lg:grid-rows-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <div className="rounded-[1.35rem] border border-amber-300/14 bg-amber-300/7 p-4">
                  <div className="h-full min-h-20 rounded-[1.1rem] border border-white/8 bg-slate-950/70" />
                </div>
                <div className="rounded-[1.35rem] border border-sky-300/14 bg-sky-300/7 p-4">
                  <div className="h-full min-h-28 rounded-[1.1rem] border border-white/8 bg-slate-950/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
