"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/layout/SplashScreen";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1600);
    const t2 = setTimeout(() => setVisible(false), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {visible && <SplashScreen fadeOut={fadeOut} />}
      {children}
    </>
  );
}
