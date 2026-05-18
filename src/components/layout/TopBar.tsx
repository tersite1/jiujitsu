"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

export default function TopBar({ title, showBack, rightAction }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_#E8E2D5]">
      <div className="flex items-center justify-between h-12 px-4">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-[40px]">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="p-1 -ml-1 active:scale-95 transition-transform"
            >
              <ChevronLeft size={22} strokeWidth={2.5} className="text-[#161512]" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="h-6 w-auto" />
              <span className="text-[19px] font-black text-[#00533E] tracking-tight leading-none">Oss</span>
            </div>
          )}
        </div>

        {/* Center title */}
        {title && (
          <h1 className="text-[15px] font-bold text-[#161512] absolute left-1/2 -translate-x-1/2 tracking-tight">
            {title}
          </h1>
        )}

        {/* Right */}
        <div className="min-w-[40px] flex justify-end">{rightAction}</div>
      </div>
    </header>
  );
}
