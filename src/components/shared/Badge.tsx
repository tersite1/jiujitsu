import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: string;
  variant?: "filled" | "outline" | "solid";
  className?: string;
}

export default function Badge({ label, color, variant = "filled", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-[3px] text-[11px] font-medium rounded-[5px]",
        variant === "solid"
          ? "bg-[#222] text-white font-semibold"
          : variant === "filled"
          ? "bg-kream-bg text-kream-black"
          : "bg-transparent border border-kream-lightgray text-kream-dark",
        className
      )}
      style={color ? (variant === "filled" ? { backgroundColor: `${color}18`, color } : variant === "outline" ? { borderColor: color, color } : undefined) : undefined}
    >
      {label}
    </span>
  );
}
