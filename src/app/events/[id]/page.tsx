"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Toast from "@/components/shared/Toast";
import { events } from "@/data/mock-events";
import { EVENT_CATEGORY_LABELS } from "@/types/event";
import { getProgressPercent } from "@/lib/utils";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";

const categoryColors: Record<string, string> = {
  seminar: "#EF6253",
  competition: "#1E88E5",
  "open-mat": "#31B46E",
  workshop: "#FF9800",
};

const mockParticipantColors = ["#EF6253", "#1E88E5", "#31B46E", "#FF9800", "#8E24AA", "#795548"];

export default function EventDetailPage() {
  const params = useParams();
  const [showToast, setShowToast] = useState(false);

  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <AppShell>
        <TopBar title="이벤트 상세" showBack />
        <div className="p-8 text-center text-kream-gray">이벤트를 찾을 수 없습니다</div>
      </AppShell>
    );
  }

  const progress = getProgressPercent(event.registered, event.capacity);
  const dateObj = new Date(event.date);
  const dateStr = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  const catColor = categoryColors[event.category];

  const infoRows = [
    { icon: Calendar, label: "일시", value: `${dateStr} ${event.time}` },
    { icon: MapPin, label: "장소", value: `${event.location}\n${event.address}` },
    { icon: DollarSign, label: "비용", value: event.price },
    ...(event.capacity ? [{ icon: Users, label: "정원", value: `${event.registered}/${event.capacity}명` }] : []),
  ];

  return (
    <AppShell>
      <TopBar title="이벤트 상세" showBack />

      <div className="pb-28">
        {/* Hero */}
        <div className="h-48 bg-kream-bg relative">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3">
            <Badge label={EVENT_CATEGORY_LABELS[event.category]} color={catColor} />
          </div>
        </div>

        <div className="px-4 pt-4 space-y-5">
          {/* Title */}
          <div>
            <h2 className="text-lg font-bold text-kream-black leading-snug">{event.title}</h2>
            {event.instructor && (
              <p className="text-sm text-kream-gray mt-1">
                {event.instructor}
                {event.instructorTitle && (
                  <span className="text-kream-lightgray"> · {event.instructorTitle}</span>
                )}
              </p>
            )}
          </div>

          {/* Capacity Progress */}
          {event.capacity && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-kream-gray">등록 현황</span>
                <span className="text-xs font-semibold text-kream-black">
                  {event.registered}/{event.capacity}명
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
              {progress > 80 && (
                <p className="text-[11px] text-kream-red mt-1 font-medium">마감 임박!</p>
              )}
            </div>
          )}

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
                  <p className="text-sm text-kream-black whitespace-pre-line">{row.value}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-kream-black mb-2">상세 정보</h3>
            <Card>
              <p className="text-sm text-kream-gray leading-relaxed">{event.description}</p>
            </Card>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-bold text-kream-black mb-2">태그</h3>
            <div className="flex gap-1.5 flex-wrap">
              {event.tags.map((t) => (
                <Badge key={t} label={t} variant="outline" />
              ))}
            </div>
          </div>

          {/* Participants Preview */}
          {event.registered && event.registered > 0 && (
            <div>
              <h3 className="text-sm font-bold text-kream-black mb-2">참가자</h3>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {mockParticipantColors.slice(0, Math.min(6, event.registered)).map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-kream-gray">
                  {event.registered}명이 참가 예정
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-kream-border z-30">
        <Button
          size="lg"
          variant="primary"
          fullWidth
          onClick={() => setShowToast(true)}
        >
          참가 신청하기 · {event.price}
        </Button>
      </div>

      <Toast
        message="참가 신청이 완료되었습니다!"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </AppShell>
  );
}
