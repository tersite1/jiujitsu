import { BELT_COLORS, BELT_LABELS, BeltLevel } from "@/types/common";

interface BeltIndicatorProps {
  level: BeltLevel;
  stripes: number;
  showLabel?: boolean;
}

export default function BeltIndicator({ level, stripes, showLabel = true }: BeltIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-3 h-3 rounded-full border border-kream-border"
        style={{ backgroundColor: BELT_COLORS[level] }}
      />
      {showLabel && (
        <span className="text-xs font-medium text-kream-black">
          {BELT_LABELS[level]} {stripes > 0 && `${stripes}그랄`}
        </span>
      )}
    </div>
  );
}
