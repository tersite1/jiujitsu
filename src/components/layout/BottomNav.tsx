"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, MessageCircle, User } from "lucide-react";

const tabs = [
  { label: "홈", href: "/", icon: Home },
  { label: "오픈매트", href: "/openmat", icon: Calendar },
  { label: "채팅", href: "/chat", icon: MessageCircle },
  { label: "마이", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const unreadCount = 1;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-kream-border z-50">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          const showBadge = tab.href === "/chat" && unreadCount > 0 && !active;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 relative"
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#222] rounded-full" />
              )}
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={active ? "text-[#111]" : "text-kream-gray"}
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1.5 w-[14px] h-[14px] bg-[#EF6253] rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">{unreadCount}</span>
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] ${
                  active
                    ? "text-[#111] font-bold"
                    : "text-kream-gray font-normal"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
