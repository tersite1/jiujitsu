import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function RatingStars({ rating, size = 14, showValue = false }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "text-[var(--color-rating)] fill-[var(--color-rating)]" : "text-kream-lightgray"}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-medium text-kream-black tnum">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
