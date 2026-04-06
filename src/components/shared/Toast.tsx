"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export default function Toast({ message, isVisible, onHide }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setExiting(false);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(onHide, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100]">
      <div
        className={`flex items-center gap-2 px-4 py-3 bg-kream-black text-white rounded-xl shadow-lg ${
          exiting ? "toast-exit" : "toast-enter"
        }`}
      >
        <Check size={16} className="text-kream-green" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
