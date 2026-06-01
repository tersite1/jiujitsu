"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-2xl slide-up max-h-[80dvh] overflow-y-auto">
        <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-kream-border">
          <div className="w-10 h-1 bg-kream-lightgray rounded-full mx-auto mb-3" />
          {title && <h3 className="text-base font-semibold text-kream-black">{title}</h3>}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
