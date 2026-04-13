"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { APP_NAME } from "@/lib/constants";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

export default function TopBar({ title, showBack, rightAction }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-[#222]">
      <div className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-2 min-w-[40px]">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="p-1 -ml-1 active:scale-95 transition-transform"
            >
              <ChevronLeft size={22} strokeWidth={2.5} className="text-white" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <img src="/logo.png" alt="매치핏" className="h-7 w-auto" />
              <span className="text-[15px] font-bold text-white tracking-tight">{APP_NAME}</span>
            </div>
          )}
        </div>
        {showBack && (
          <h1 className="text-[15px] font-bold text-white absolute left-1/2 -translate-x-1/2 tracking-tight">
            {title}
          </h1>
        )}
        <div className="min-w-[40px] flex justify-end [&_svg]:text-white">{rightAction}</div>
      </div>
    </header>
  );
}
