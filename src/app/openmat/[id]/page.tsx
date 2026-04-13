"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Toast from "@/components/shared/Toast";
import { openmats } from "@/data/mock-openmats";
import { chatRooms } from "@/data/mock-chats";
import { getProgressPercent } from "@/lib/utils";
import { Calendar, MapPin, DollarSign, Users, Clock, RefreshCw } from "lucide-react";

export default function OpenMatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const om = openmats.find((o) => o.id === params.id);

  if (!om) {
    return (
      <AppShell>
        <TopBar title="오픈매트" showBack />
        <div className="p-8 text-center text-kream-gray">오픈매트를 찾을 수 없습니다</div>
      </AppShell>
    );
  }

  const progress = getProgressPercent(om.registered, om.capacity);
  const dateObj = new Date(om.date);
  const dateStr = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
  const isFull = om.registered >= om.capacity;

  const infoRows = [
    { icon: Calendar, label: "날짜", value: `${dateStr} (${dayOfWeek})` },
    { icon: Clock, label: "시간", value: om.time },
    { icon: MapPin, label: "장소", value: `${om.gymName}\n${om.address}` },
    { icon: DollarSign, label: "비용", value: om.price },
    { icon: Users, label: "정원", value: `${om.registered}/${om.capacity}명` },
    ...(om.isRecurring ? [{ icon: RefreshCw, label: "반복", value: om.recurringNote || "" }] : []),
  ];

  return (
    <AppShell>
      <TopBar title="오픈매트" showBack />

      <div className="pb-[88px]">
        {/* Hero with overlay */}
        <div className="h-52 bg-kream-bg relative">
          <img src={om.gymImageUrl} alt={om.gymName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {om.price === "무료" && (
            <div className="absolute top-3 left-3">
              <Badge label="무료" color="#31B46E" />
            </div>
          )}
          {isFull && (
            <div className="absolute top-3 right-3">
              <Badge label="마감" color="#EF6253" />
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-black text-white tracking-[-0.02em] leading-tight">{om.gymName}</h2>
            <p className="text-sm text-white/70 mt-1">{om.location}</p>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-5">
          {/* Capacity Progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-kream-gray">참여 현황</span>
              <span className="text-xs font-bold text-[#111]">
                {om.registered}/{om.capacity}명
              </span>
            </div>
            <div className="h-2 bg-kream-bg rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress > 80 ? "#EF6253" : "#31B46E",
                }}
              />
            </div>
            {progress > 80 && !isFull && (
              <p className="text-[11px] text-kream-red mt-1 font-medium">마감 임박!</p>
            )}
            {isFull && (
              <p className="text-[11px] text-kream-red mt-1 font-medium">정원이 마감되었습니다</p>
            )}
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
                <row.icon size={16} className="text-[#333] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-kream-gray">{row.label}</p>
                  <p className="text-sm font-medium text-[#111] whitespace-pre-line">{row.value}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Description */}
          <div>
            <h3 className="section-header mb-2">상세 정보</h3>
            <Card>
              <p className="text-sm text-kream-gray leading-relaxed">{om.description}</p>
            </Card>
          </div>

          {/* Tags */}
          <div>
            <h3 className="section-header mb-2">태그</h3>
            <div className="flex gap-1.5 flex-wrap">
              {om.tags.map((t) => (
                <Badge key={t} label={t} variant="solid" />
              ))}
            </div>
          </div>

          {/* Participants Preview */}
          {om.registered > 0 && (
            <div>
              <h3 className="section-header mb-2">참가자</h3>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(6, om.registered) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-[#222] flex items-center justify-center"
                    >
                      <span className="text-white text-[10px] font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-xs text-kream-gray">
                  {om.registered}명이 참가 예정
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-[#E0E0E0] z-30">
        <Button
          size="lg"
          variant={isFull ? "outline" : "primary"}
          fullWidth
          onClick={() => {
            if (isFull) return;
            setShowToast(true);
            // Navigate to chat room for this gym after brief delay
            const chatRoom = chatRooms.find((r) => r.gymId === om.gymId);
            setTimeout(() => {
              if (chatRoom) {
                router.push(`/chat/${chatRoom.id}`);
              } else {
                router.push("/chat");
              }
            }, 1200);
          }}
        >
          {isFull ? "마감되었습니다" : `참가 신청하기 · ${om.price}`}
        </Button>
      </div>

      <Toast
        message="참가 신청 완료! 채팅방으로 이동합니다..."
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </AppShell>
  );
}
