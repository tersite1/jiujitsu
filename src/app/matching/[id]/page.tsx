"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import IntensityBadge from "@/components/shared/IntensityBadge";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Toast from "@/components/shared/Toast";
import ReviewSheet from "@/components/shared/ReviewSheet";
import RatingStars from "@/components/shared/RatingStars";
import { practitioners } from "@/data/mock-practitioners";
import { BELT_COLORS, WEIGHT_LABELS } from "@/types/common";
import { Star } from "lucide-react";

type PartnerReview = { rating: number; content: string; date: string };

export default function PractitionerDetailPage() {
  const params = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("매칭 요청을 보냈어요");
  const [showReviewSheet, setShowReviewSheet] = useState(false);
  const [partnerReview, setPartnerReview] = useState<PartnerReview | null>(null);

  const practitioner = practitioners.find((p) => p.id === params.id);

  if (!practitioner) {
    return (
      <AppShell>
        <TopBar title="수련자" showBack />
        <div className="p-8 text-center text-kream-gray">수련자를 찾을 수 없습니다</div>
      </AppShell>
    );
  }

  const p = practitioner;

  const infoItems = [
    { label: "체급", value: WEIGHT_LABELS[p.weightClass] },
    { label: "체중", value: `${p.weightKg}kg` },
    { label: "지역", value: p.region },
    { label: "소속", value: p.gym },
    { label: "수련 빈도", value: p.trainFrequency },
    { label: "경력", value: p.experience },
  ];

  return (
    <AppShell>
      <TopBar title={p.name} showBack />

      <div className="px-4 pt-6 pb-28 space-y-5">
        {/* Profile Hero */}
        <div
          className="flex flex-col items-center text-center gap-3 belt-edge overflow-hidden rounded-xl bg-white border border-[var(--color-line)] p-4"
          style={{ ["--belt"]: BELT_COLORS[p.beltLevel] } as React.CSSProperties}
        >
          <Avatar name={p.name} size="xl" beltLevel={p.beltLevel} />
          <div>
            <h2 className="text-lg font-bold text-kream-black">{p.name}</h2>
            <p className="text-xs text-kream-gray">{p.age}세</p>
          </div>
          <BeltIndicator level={p.beltLevel} stripes={p.stripes} />
        </div>

        {/* Info Grid */}
        <Card padding="none">
          {infoItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-4 py-3 ${
                i < infoItems.length - 1 ? "border-b border-kream-border" : ""
              }`}
            >
              <span className="text-sm text-kream-gray">{item.label}</span>
              <span className="text-sm font-medium text-kream-black">{item.value}</span>
            </div>
          ))}
        </Card>

        {/* Bio */}
        <div>
          <h3 className="section-header mb-2">자기소개</h3>
          <Card>
            <p className="text-sm text-kream-gray leading-relaxed">{p.bio}</p>
          </Card>
        </div>

        {/* Schedule */}
        <div>
          <h3 className="section-header mb-2">선호 스파링 시간</h3>
          <div className="flex gap-2 flex-wrap">
            {p.preferredSchedule.map((s) => (
              <Badge key={s} label={s} variant="outline" />
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div>
          <h3 className="section-header mb-2">선호 강도</h3>
          <IntensityBadge intensity={p.intensityPreference} />
        </div>

        {/* Sparring review (post-match) */}
        <div>
          <h3 className="section-header mb-2">스파링 후 평가</h3>
          {partnerReview ? (
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-kream-gray">내가 남긴 평가 · {partnerReview.date}</span>
                <RatingStars rating={partnerReview.rating} size={14} />
              </div>
              <p className="text-sm text-kream-black leading-relaxed">{partnerReview.content}</p>
              <button
                type="button"
                onClick={() => setShowReviewSheet(true)}
                className="mt-3 text-[11px] font-semibold text-[var(--color-accent)] hover:underline"
              >
                평가 다시 작성
              </button>
            </Card>
          ) : (
            <Card>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-coral-soft)] flex items-center justify-center shrink-0">
                  <Star size={18} className="text-[var(--color-accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-kream-black">스파링했다면 평가를 남겨주세요</p>
                  <p className="text-[11px] text-kream-gray mt-0.5">강도·페어플레이·매너에 대한 솔직한 후기는 다음 매칭의 신뢰가 됩니다.</p>
                  <button
                    type="button"
                    onClick={() => setShowReviewSheet(true)}
                    className="mt-2.5 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-coral-deep)] px-3 py-1.5 rounded-lg active:scale-95 transition"
                  >
                    평가 작성하기
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-kream-border z-30">
        <Button
          size="lg"
          variant="primary"
          fullWidth
          onClick={() => {
            setToastMsg(`${p.name}님에게 매칭 요청을 보냈어요`);
            setShowToast(true);
          }}
          disabled={!p.isAvailable}
        >
          매칭 요청하기
        </Button>
      </div>

      <ReviewSheet
        isOpen={showReviewSheet}
        onClose={() => setShowReviewSheet(false)}
        title="스파링 파트너 평가"
        subjectName={p.name}
        placeholder="강도, 페어플레이, 매너 등 솔직한 평가를 남겨주세요."
        onSubmit={(rating, content) => {
          setPartnerReview({
            rating,
            content,
            date: new Date().toISOString().slice(0, 10),
          });
          setShowReviewSheet(false);
          setToastMsg("평가가 등록되었어요");
          setShowToast(true);
        }}
      />

      <Toast
        message={toastMsg}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </AppShell>
  );
}
