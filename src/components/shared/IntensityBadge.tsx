import { INTENSITY_COLORS, INTENSITY_LABELS, IntensityPreference } from "@/types/common";

interface IntensityBadgeProps {
  intensity: IntensityPreference;
}

export default function IntensityBadge({ intensity }: IntensityBadgeProps) {
  const color = INTENSITY_COLORS[intensity];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {INTENSITY_LABELS[intensity]}
    </span>
  );
}
