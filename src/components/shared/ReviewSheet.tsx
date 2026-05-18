"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import BottomSheet from "./BottomSheet";
import Button from "./Button";

interface ReviewSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, content: string) => void;
  /** Heading shown in the sheet, e.g. "도장 리뷰 작성" / "스파링 후 평가" */
  title: string;
  /** Subject being reviewed (gym name / partner name) */
  subjectName: string;
  /** Min characters required */
  minLength?: number;
  /** Optional placeholder for the textarea */
  placeholder?: string;
}

export default function ReviewSheet({
  isOpen, onClose, onSubmit,
  title, subjectName,
  minLength = 10,
  placeholder = "솔직한 후기를 남겨주세요. 다른 수련자에게 큰 도움이 됩니다.",
}: ReviewSheetProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHover(0);
      setContent("");
    }
  }, [isOpen]);

  const canSubmit = rating > 0 && content.trim().length >= minLength;
  const display = hover || rating;

  const ratingLabels = ["", "별로예요", "그저 그래요", "괜찮아요", "좋아요", "최고예요"];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-xs text-kream-gray mb-3">
        <span className="font-semibold text-kream-black">{subjectName}</span>에 대한 평가
      </p>

      {/* Star input */}
      <div className="rounded-xl bg-[var(--color-surface-sunken)] p-4 mb-3 flex flex-col items-center">
        <div
          className="flex items-center gap-1"
          role="radiogroup"
          aria-label="별점"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((i) => {
            const filled = i <= display;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={rating === i}
                aria-label={`${i}점`}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                className="p-1 active:scale-90 transition-transform"
              >
                <Star
                  size={32}
                  strokeWidth={1.5}
                  className={
                    filled
                      ? "text-[var(--color-accent)] fill-[var(--color-accent)]"
                      : "text-kream-lightgray"
                  }
                />
              </button>
            );
          })}
        </div>
        <p
          className={`text-xs mt-2 h-4 transition-opacity ${
            display > 0 ? "opacity-100 text-kream-black font-semibold" : "opacity-0"
          }`}
          aria-live="polite"
        >
          {ratingLabels[display] || "별점을 선택해주세요"}
        </p>
      </div>

      {/* Textarea */}
      <label className="block">
        <span className="sr-only">리뷰 내용</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          maxLength={500}
          rows={5}
          className="w-full rounded-xl border border-kream-border bg-white p-3 text-sm text-kream-black placeholder:text-kream-gray resize-none focus:outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      </label>
      <div className="flex items-center justify-between mb-4 mt-1.5">
        <span className={`text-[11px] ${content.trim().length < minLength ? "text-kream-gray" : "text-[var(--color-success)]"}`}>
          {content.trim().length < minLength
            ? `최소 ${minLength}자 (${content.trim().length}/${minLength})`
            : "✓ 작성 가능"}
        </span>
        <span className="text-[11px] tnum text-kream-gray">{content.length}/500</span>
      </div>

      <Button
        size="lg"
        variant="primary"
        fullWidth
        disabled={!canSubmit}
        onClick={() => {
          if (!canSubmit) return;
          onSubmit(rating, content.trim());
        }}
      >
        리뷰 등록
      </Button>
    </BottomSheet>
  );
}
