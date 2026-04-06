"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import RatingStars from "@/components/shared/RatingStars";
import Toast from "@/components/shared/Toast";
import { gyms, gymReviews } from "@/data/mock-gyms";
import { MapPin, Clock, DollarSign, Globe, Phone, Link } from "lucide-react";

const countryFlags: Record<string, string> = {
  "한국": "🇰🇷", "일본": "🇯🇵", "브라질": "🇧🇷", "태국": "🇹🇭", "미국": "🇺🇸",
};

export default function GymDetailPage() {
  const params = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const gym = gyms.find((g) => g.id === params.id);
  const reviews = gymReviews.filter((r) => r.gymId === params.id);

  if (!gym) {
    return (
      <AppShell>
        <TopBar title="도장" showBack />
        <div className="p-8 text-center text-kream-gray">도장을 찾을 수 없습니다</div>
      </AppShell>
    );
  }

  const infoRows = [
    { icon: MapPin, label: "주소", value: gym.address },
    { icon: Clock, label: "운영시간", value: gym.hours },
    ...(gym.dropInAvailable ? [{ icon: DollarSign, label: "드랍인 비용", value: gym.dropInPrice || "문의" }] : []),
    { icon: Globe, label: "언어 지원", value: gym.languageSupport.join(", ") },
    ...(gym.phone ? [{ icon: Phone, label: "연락처", value: gym.phone }] : []),
    ...(gym.instagram ? [{ icon: Link, label: "인스타그램", value: gym.instagram }] : []),
  ];

  return (
    <AppShell>
      <TopBar title={gym.name} showBack />

      <div className="pb-28">
        {/* Hero */}
        <div className="h-48 bg-kream-bg">
          <img src={gym.imageUrl} alt={gym.name} className="w-full h-full object-cover" />
        </div>

        <div className="px-4 pt-4 space-y-5">
          {/* Name + Rating */}
          <div>
            <h2 className="text-lg font-bold text-kream-black">{gym.name}</h2>
            {gym.nameEn && <p className="text-xs text-kream-lightgray">{gym.nameEn}</p>}
            <p className="text-xs text-kream-gray mt-1">
              {countryFlags[gym.country] || "🌍"} {gym.city}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <RatingStars rating={gym.rating} size={14} showValue />
              <span className="text-xs text-kream-gray">({gym.reviewCount}개 리뷰)</span>
            </div>
          </div>

          {/* Info */}
          <Card padding="none">
            {infoRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-start gap-3 px-4 py-3 ${
                  i < infoRows.length - 1 ? "border-b border-kream-border" : ""
                }`}
              >
                <row.icon size={16} className="text-kream-gray shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-kream-gray">{row.label}</p>
                  <p className="text-sm text-kream-black">{row.value}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Atmosphere */}
          <div>
            <h3 className="text-sm font-bold text-kream-black mb-2">분위기</h3>
            <div className="flex gap-1.5 flex-wrap">
              {gym.atmosphere.map((a) => (
                <Badge key={a} label={a} />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-bold text-kream-black mb-2">프로그램</h3>
            <div className="flex gap-1.5 flex-wrap">
              {gym.tags.map((t) => (
                <Badge key={t} label={t} variant="outline" />
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-kream-black">
                리뷰 ({reviews.length})
              </h3>
            </div>
            {reviews.length > 0 ? (
              <div className="space-y-2.5">
                {reviews.map((review) => (
                  <Card key={review.id} padding="sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-kream-black">{review.authorName}</span>
                        <Badge label={review.authorBelt} variant="outline" />
                      </div>
                      <span className="text-[10px] text-kream-gray">{review.date}</span>
                    </div>
                    <RatingStars rating={review.rating} size={12} />
                    <p className="text-sm text-kream-gray mt-2 leading-relaxed">{review.content}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <p className="text-sm text-kream-gray text-center py-4">아직 리뷰가 없습니다</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-kream-border z-30">
        <div className="flex gap-2.5">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => {
              setToastMsg("리뷰 작성 페이지로 이동합니다");
              setShowToast(true);
            }}
          >
            리뷰 작성
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => {
              setToastMsg(gym.phone ? `${gym.phone}로 전화 연결합니다` : "연락처 정보가 없습니다");
              setShowToast(true);
            }}
          >
            전화 문의
          </Button>
        </div>
      </div>

      <Toast message={toastMsg} isVisible={showToast} onHide={() => setShowToast(false)} />
    </AppShell>
  );
}
