import type { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
  variant?: "error" | "success" | "info" | "warning";
};

const variantStyles = {
  error:
    "border border-red-300/20 bg-red-400/10 text-red-100 [&_svg]:text-red-300",
  success:
    "border border-green-300/20 bg-green-400/10 text-green-100 [&_svg]:text-green-300",
  info: "border border-blue-300/20 bg-blue-400/10 text-blue-100 [&_svg]:text-blue-300",
  warning:
    "border border-yellow-300/20 bg-yellow-400/10 text-yellow-100 [&_svg]:text-yellow-300",
};

export default function Alert({
  children,
  variant = "error",
}: AlertProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm ${variantStyles[variant]}`}
      role="alert"
    >
      <div className="flex-1">{children}</div>
    </div>
  );
}
