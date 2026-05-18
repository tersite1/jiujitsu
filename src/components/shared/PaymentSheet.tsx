"use client";

import { useEffect, useState } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";
import BottomSheet from "./BottomSheet";
import Button from "./Button";

type Step = "select" | "processing" | "success";

interface PaymentMethod {
  id: string;
  label: string;
  badge: string;
  badgeBg: string;
  badgeFg: string;
}

const METHODS: PaymentMethod[] = [
  { id: "card",    label: "신용·체크카드", badge: "CARD", badgeBg: "#161512", badgeFg: "#FAF8F4" },
  { id: "tosspay", label: "토스페이",      badge: "TOSS", badgeBg: "#0064FF", badgeFg: "#FFFFFF" },
  { id: "kakao",   label: "카카오페이",    badge: "PAY",  badgeBg: "#FEE500", badgeFg: "#191919" },
];

interface PaymentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  subtitle?: string;
  amount: string; // "50,000원" or "무료"
}

export default function PaymentSheet({
  isOpen, onClose, onSuccess, title, subtitle, amount,
}: PaymentSheetProps) {
  const isFree = amount === "무료" || amount === "0원" || amount === "₩0";
  const [step, setStep] = useState<Step>(isFree ? "processing" : "select");
  const [methodId, setMethodId] = useState<string>(METHODS[0].id);

  // Reset when reopened
  useEffect(() => {
    if (isOpen) setStep(isFree ? "processing" : "select");
  }, [isOpen, isFree]);

  // Advance through processing → success
  useEffect(() => {
    if (!isOpen) return;
    if (step === "processing") {
      const t = setTimeout(() => setStep("success"), 1200);
      return () => clearTimeout(t);
    }
    if (step === "success") {
      const t = setTimeout(() => {
        onSuccess();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [step, isOpen, onSuccess]);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={step === "processing" ? () => {} : onClose}
      title={
        step === "select" ? "결제 수단 선택" :
        step === "processing" ? "결제 진행 중" : "결제 완료"
      }
    >
      {/* Order summary */}
      <div className="rounded-xl bg-[var(--color-surface-sunken)] p-4 mb-4">
        <p className="text-[11px] text-kream-gray mb-1">{subtitle ?? "신청 항목"}</p>
        <p className="text-sm font-bold text-kream-black truncate">{title}</p>
        <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-kream-border">
          <span className="text-xs text-kream-gray">결제 금액</span>
          <span className="tnum text-lg font-bold text-kream-black">{amount}</span>
        </div>
      </div>

      {step === "select" && (
        <>
          <div className="space-y-2 mb-4">
            {METHODS.map((m) => {
              const selected = methodId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethodId(m.id)}
                  aria-pressed={selected}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${
                    selected
                      ? "border-[var(--color-accent)] bg-[var(--color-coral-soft)]"
                      : "border-kream-border bg-white hover:bg-[var(--color-surface-sunken)]"
                  }`}
                >
                  <span
                    className="inline-flex items-center justify-center text-[10px] font-bold tracking-tight px-2 py-1 rounded-md min-w-[44px]"
                    style={{ background: m.badgeBg, color: m.badgeFg }}
                  >
                    {m.badge}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-kream-black">{m.label}</span>
                  <span
                    aria-hidden
                    className={`w-4 h-4 rounded-full border-2 ${
                      selected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                        : "border-kream-lightgray"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <Button
            size="lg"
            variant="primary"
            fullWidth
            onClick={() => setStep("processing")}
          >
            {amount} 결제하기
          </Button>
          <p className="text-[11px] text-kream-gray text-center mt-3">
            * 본 결제는 데모입니다. 실제 결제가 이루어지지 않습니다.
          </p>
        </>
      )}

      {step === "processing" && (
        <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
          <Loader2
            size={48}
            className="text-kream-gray animate-spin"
            aria-hidden
          />
          <p className="mt-4 text-sm font-medium text-kream-black">
            {isFree ? "신청 처리 중..." : "결제 진행 중..."}
          </p>
          <p className="text-[11px] text-kream-gray mt-1">잠시만 기다려주세요</p>
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
          <div className="w-16 h-16 rounded-full bg-[var(--color-success)] flex items-center justify-center">
            <Check size={36} className="text-white" strokeWidth={3} />
          </div>
          <p className="mt-4 text-base font-bold text-kream-black">
            {isFree ? "신청이 완료되었어요" : "결제가 완료되었어요"}
          </p>
          <p className="text-xs text-kream-gray mt-1">채팅방으로 이동합니다</p>
        </div>
      )}
    </BottomSheet>
  );
}

// Silence unused-import warnings if ever stripped
void CreditCard;
