import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "none" | "sm" | "md";
}

export default function Card({ children, className, onClick, padding = "md" }: CardProps) {
  const paddings = { none: "", sm: "p-3", md: "p-4" };
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-[#E0E0E0]",
        paddings[padding],
        onClick && "cursor-pointer active:scale-[0.99] transition-transform",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
