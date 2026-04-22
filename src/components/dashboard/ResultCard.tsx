import type { ReactNode } from "react";

type ResultCardProps = {
  title: string;
  description: string;
  accent: "sky" | "amber";
  children: ReactNode;
};

const accentStyles = {
  sky: "border-sky-200/12 bg-sky-300/6 text-sky-100",
  amber: "border-amber-200/12 bg-amber-300/6 text-amber-100",
};

// Result panels share one component so both outputs follow the same layout rules.
export default function ResultCard({
  accent,
  children,
  description,
  title,
}: ResultCardProps) {
  return (
    <article
      className={`flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.8rem] border p-6 ${accentStyles[accent]}`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-5 min-h-[8.5rem] min-w-0 flex-1 overflow-hidden">
        {children}
      </div>
    </article>
  );
}
