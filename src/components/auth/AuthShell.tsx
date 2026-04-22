import type { ReactNode } from "react";
import AppLogo from "@/src/components/ui/AppLogo";

type AuthShellProps = {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};

const authHighlights = [
  {
    title: "Access",
    description: "JWT protected entry to the workspace.",
    accent: "border-emerald-300/16 bg-emerald-300/8 text-emerald-50",
    label: "text-emerald-200",
  },
  {
    title: "Output",
    description: "Transformer and vector panels stay readable.",
    accent: "border-sky-300/16 bg-sky-300/8 text-sky-50",
    label: "text-sky-200",
  },
  {
    title: "Flow",
    description: "Minimal steps from sign-in to analysis.",
    accent: "border-amber-300/16 bg-amber-300/8 text-amber-50",
    label: "text-amber-200",
  },
] as const;

const authSteps = [
  "Authenticate with your account.",
  "Open the private dashboard.",
  "Submit text and review the outputs.",
] as const;

// The auth shell stays short and screen-filling so login and register do not need page scroll.
export default function AuthShell({
  children,
  description,
  footer,
  title,
}: AuthShellProps) {
  return (
    <section className="grid h-full min-h-0 gap-4 overflow-hidden lg:grid-cols-[minmax(0,1.08fr)_minmax(23rem,0.92fr)]">
      <div className="surface-panel relative min-h-0 overflow-hidden rounded-[2rem] p-6 sm:p-7 animate-fade-up">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.1),_transparent_24%)]" />

        <div className="relative flex h-full min-h-0 items-center justify-center">
          <div className="flex h-full min-h-0 w-full max-w-[38rem] flex-col justify-center gap-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <AppLogo />
            </div>

            <div className="space-y-4">
              <p className="section-label text-xs">Authentication</p>
              <h1 className="mx-auto max-w-xl text-4xl font-semibold leading-tight text-white sm:text-[3rem] lg:mx-0">
                {title}
              </h1>
              <p className="mx-auto max-w-lg text-sm leading-7 text-slate-400 lg:mx-0">
                {description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {authHighlights.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-[1.45rem] border p-5 ${item.accent}`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.label}`}
                  >
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-6">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 rounded-[1.7rem] border border-white/10 bg-slate-950/32 p-5">
              <div className="space-y-2">
                <p className="section-label text-xs">Workspace flow</p>
                <p className="text-sm leading-6 text-slate-300">
                  A short path from account access to model outputs.
                </p>
              </div>

              <div className="grid gap-3">
                {authSteps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-3"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-panel-strong relative flex min-h-0 flex-col overflow-hidden rounded-[2rem] p-6 sm:p-7 animate-fade-up-delay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.08),_transparent_32%)]" />

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-3">
              <p className="section-label text-xs">Form</p>
              <p className="text-sm leading-6 text-slate-400">
                Only the required fields.
              </p>
            </div>

            <div className="min-h-0">{children}</div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-5 text-center text-xs text-slate-500">
          {footer}
        </div>
      </div>
    </section>
  );
}
