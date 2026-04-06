import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: string;
  variant?: "filled" | "outline";
  className?: string;
}

export default function Badge({ label, color, variant = "filled", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md",
        variant === "filled"
          ? "bg-kream-bg text-kream-black"
          : "bg-transparent border border-kream-border text-kream-gray",
        className
      )}
      style={color ? (variant === "filled" ? { backgroundColor: `${color}18`, color } : { borderColor: color, color }) : undefined}
    >
      {label}
    </span>
  );
}
