"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[var(--color-coral)] text-white rounded-xl hover:bg-[var(--color-coral-deep)] active:bg-[var(--color-coral-deep)] shadow-[0_1px_0_rgba(196,66,31,0.4)]",
    secondary: "bg-[var(--color-forest)] text-white rounded-xl hover:bg-[var(--color-forest-deep)] active:bg-[var(--color-forest-deep)]",
    outline: "bg-white text-[var(--color-brand)] border border-[var(--color-brand)] rounded-xl hover:bg-[var(--color-forest-soft)]",
    ghost: "bg-transparent text-kream-gray",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs rounded-lg",
    md: "h-11 px-5 text-sm",
    lg: "h-[52px] px-6 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
