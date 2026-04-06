"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MapPin, Calendar, User } from "lucide-react";

const tabs = [
  { label: "홈", href: "/", icon: Home },
  { label: "매칭", href: "/matching", icon: Users },
  { label: "도장", href: "/gyms", icon: MapPin },
  { label: "이벤트", href: "/events", icon: Calendar },
  { label: "MY", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-kream-border z-50">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.5}
                className={active ? "text-kream-black" : "text-kream-gray"}
              />
              <span
                className={`text-[10px] ${
                  active
                    ? "text-kream-black font-semibold"
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
