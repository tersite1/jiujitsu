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
          className={i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-kream-lightgray"}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-medium text-kream-black">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
