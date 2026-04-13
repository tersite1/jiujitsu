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
import { MapPin, Clock, DollarSign, Globe, Phone, Link as LinkIcon, Users, Dumbbell } from "lucide-react";

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
    ...(gym.instagram ? [{ icon: LinkIcon, label: "인스타그램", value: gym.instagram }] : []),
    ...(gym.memberCount ? [{ icon: Users, label: "회원 수", value: `${gym.memberCount}명` }] : []),
  ];

  return (
    <AppShell>
      <TopBar title={gym.name} showBack />

      <div className="pb-[88px]">
        {/* Hero with overlay */}
        <div className="h-52 bg-kream-bg relative">
          <img src={gym.imageUrl} alt={gym.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-black text-white tracking-[-0.02em] leading-tight">{gym.name}</h2>
            {gym.nameEn && <p className="text-xs text-white/60 mt-0.5">{gym.nameEn}</p>}
          </div>
        </div>

        <div className="px-4 pt-4 space-y-5">
          {/* Location + Rating strip */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1 bg-[#222] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[5px]">
              {countryFlags[gym.country] || "🌍"} {gym.city}
            </div>
            <div className="flex items-center gap-1.5">
              <RatingStars rating={gym.rating} size={14} showValue />
              <span className="text-xs text-kream-gray">({gym.reviewCount})</span>
            </div>
          </div>

          {/* Description */}
          {gym.description && (
            <Card>
              <p className="text-sm text-kream-gray leading-relaxed">{gym.description}</p>
            </Card>
          )}

          {/* Info */}
          <div>
            <h3 className="section-header mb-2">도장 정보</h3>
            <Card padding="none">
              {infoRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-start gap-3 px-4 py-3 ${
                    i < infoRows.length - 1 ? "border-b border-kream-border" : ""
                  }`}
                >
                  <row.icon size={16} className="text-[#333] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-kream-gray">{row.label}</p>
                    <p className="text-sm font-medium text-[#111]">{row.value}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Instructors */}
          {gym.instructors && gym.instructors.length > 0 && (
            <div>
              <h3 className="section-header mb-2">지도자</h3>
              <div className="space-y-2">
                {gym.instructors.map((inst) => (
                  <Card key={inst.name} padding="sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center shrink-0">
                        <Dumbbell size={16} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#111]">{inst.name}</p>
                        <p className="text-[11px] text-kream-gray">{inst.title}</p>
                        <p className="text-[11px] text-kream-gray">전문: {inst.specialty}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Schedule */}
          {gym.schedule && gym.schedule.length > 0 && (
            <div>
              <h3 className="section-header mb-2">수업 시간표</h3>
              <Card padding="none">
                {gym.schedule.map((sch, i) => (
                  <div
                    key={sch.day}
                    className={`px-4 py-3 ${
                      i < gym.schedule!.length - 1 ? "border-b border-kream-border" : ""
                    }`}
                  >
                    <p className="text-xs font-bold text-[#111] mb-1.5">{sch.day}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sch.classes.map((cls) => (
                        <Badge key={cls} label={cls} variant="outline" />
                      ))}
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* Facilities */}
          {gym.facilities && gym.facilities.length > 0 && (
            <div>
              <h3 className="section-header mb-2">시설</h3>
              <div className="flex gap-1.5 flex-wrap">
                {gym.facilities.map((f) => (
                  <Badge key={f} label={f} variant="outline" />
                ))}
              </div>
            </div>
          )}

          {/* Atmosphere */}
          <div>
            <h3 className="section-header mb-2">분위기</h3>
            <div className="flex gap-1.5 flex-wrap">
              {gym.atmosphere.map((a) => (
                <Badge key={a} label={a} variant="solid" />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="section-header mb-2">프로그램</h3>
            <div className="flex gap-1.5 flex-wrap">
              {gym.tags.map((t) => (
                <Badge key={t} label={t} variant="outline" />
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-header">
                리뷰 ({reviews.length})
              </h3>
            </div>
            {reviews.length > 0 ? (
              <div className="space-y-2.5">
                {reviews.map((review) => (
                  <Card key={review.id} padding="sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#111]">{review.authorName}</span>
                      <div className="flex items-center gap-1.5">
                        <RatingStars rating={review.rating} size={12} />
                        <span className="text-[11px] text-kream-gray">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-kream-gray leading-relaxed">{review.content}</p>
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
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-[#E0E0E0] z-30">
        <div className="flex gap-2.5">
          <Button
            variant="outline"
            size="md"
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
            className="flex-[2]"
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
