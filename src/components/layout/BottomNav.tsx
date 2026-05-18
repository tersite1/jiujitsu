"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, CalendarDays, MapPin, User } from "lucide-react";

const tabs = [
  { label: "홈",    href: "/",        icon: Home },
  { label: "매칭",  href: "/matching", icon: Users },
  { label: "이벤트", href: "/events",  icon: CalendarDays },
  { label: "도장",  href: "/gyms",     icon: MapPin },
  { label: "마이",  href: "/profile",  icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-kream-border z-50">
      <div className="flex items-center justify-around h-14 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 relative"
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[var(--color-accent)] rounded-full" />
              )}
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-[var(--color-accent)]" : "text-kream-gray"}
              />
              <span className={`text-[9px] tracking-tight ${active ? "text-[var(--color-accent)] font-bold" : "text-kream-gray font-normal"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
