import type { ButtonHTMLAttributes, ReactNode } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

const variantClasses = {
  primary:
    "bg-[var(--accent)] text-slate-950 shadow-[0_12px_40px_rgba(56,189,248,0.16)] hover:brightness-95",
  secondary:
    "border border-white/12 bg-white/6 text-white hover:border-sky-200/25 hover:bg-white/10",
  ghost:
    "border border-transparent bg-transparent text-white/80 hover:border-white/10 hover:bg-white/6",
};

// This button centralizes interaction states so forms and dashboard actions stay consistent.
export default function AppButton({
  children,
  className = "",
  disabled,
  fullWidth = false,
  type = "button",
  variant = "primary",
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
        fullWidth ? "w-full" : ""
      } ${variantClasses[variant]} ${className} disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[rgba(125,211,252,0.16)]`}
      {...props}
    >
      {children}
    </button>
  );
}
