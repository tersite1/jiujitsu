import { cn, getInitial } from "@/lib/utils";
import { BELT_COLORS, BeltLevel } from "@/types/common";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  beltLevel?: BeltLevel;
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
};

export default function Avatar({ name, src, size = "md", beltLevel, className }: AvatarProps) {
  const ringColor = beltLevel ? BELT_COLORS[beltLevel] : undefined;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold text-white bg-kream-lightgray shrink-0",
        sizes[size],
        ringColor && "ring-2 ring-offset-1",
        className
      )}
      style={ringColor ? { "--tw-ring-color": ringColor } as React.CSSProperties : undefined}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-kream-gray">{getInitial(name)}</span>
      )}
    </div>
  );
}
