"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

export default function TopBar({ title, showBack, rightAction }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-kream-border">
      <div className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-2 min-w-[40px]">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-1 -ml-1 active:scale-95 transition-transform"
            >
              <ChevronLeft size={24} className="text-kream-black" />
            </button>
          )}
        </div>
        <h1 className="text-base font-semibold text-kream-black absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
        <div className="min-w-[40px] flex justify-end">{rightAction}</div>
      </div>
    </header>
  );
}
