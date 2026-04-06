"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-container">
      <main className="pb-20 min-h-[100dvh]">{children}</main>
      <BottomNav />
    </div>
  );
}
