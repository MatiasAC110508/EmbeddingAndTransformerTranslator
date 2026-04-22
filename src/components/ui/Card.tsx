import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "ghost";
};

const variantStyles = {
  default:
    "border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
  strong:
    "border border-white/8 bg-white/6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)]",
  ghost: "border border-transparent bg-transparent",
};

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={`rounded-[1.5rem] p-6 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
