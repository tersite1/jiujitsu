"use client";

interface SplashScreenProps {
  fadeOut: boolean;
}

export default function SplashScreen({ fadeOut }: SplashScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#00533E] transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/oss-logo.svg"
        alt="오스"
        className="w-72 h-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      />
      <p className="mt-8 text-[40px] font-black italic text-white tracking-tight leading-none">
        Oss
      </p>
      <p className="mt-2 text-sm text-white/50 tracking-[0.25em]">押忍</p>
    </div>
  );
}
