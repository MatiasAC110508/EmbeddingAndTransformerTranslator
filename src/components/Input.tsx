import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

// The shared input component keeps auth forms visually aligned and accessible.
export default function Input({
  hint,
  label,
  className = "",
  id,
  ...props
}: Props) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-white/90" htmlFor={inputId}>
      <span className="font-medium">{label}</span>

      <input
        id={inputId}
        aria-label={label}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        className={`w-full rounded-2xl border border-white/10 bg-[rgba(2,6,23,0.6)] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[rgba(125,211,252,0.14)] focus:border-accent ${className}`}
        {...props}
      />

      {hint ? (
        <span id={`${inputId}-hint`} className="text-xs text-slate-400">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
