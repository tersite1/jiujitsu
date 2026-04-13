"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import EmptyState from "@/components/shared/EmptyState";
import { events } from "@/data/mock-events";
import { EventCategory, EVENT_CATEGORY_LABELS } from "@/types/event";
import { getProgressPercent } from "@/lib/utils";
import { Calendar } from "lucide-react";

const categoryColors: Record<EventCategory, string> = {
  seminar: "#EF6253",
  competition: "#1E88E5",
  "open-mat": "#31B46E",
  workshop: "#FF9800",
};

const tabs: Array<{ key: EventCategory | "all"; label: string }> = [
  { key: "all", label: "전체" },
  { key: "seminar", label: "세미나" },
  { key: "competition", label: "대회" },
  { key: "open-mat", label: "오픈매트" },
  { key: "workshop", label: "워크샵" },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<EventCategory | "all">("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return events;
    return events.filter((e) => e.category === activeTab);
  }, [activeTab]);

  return (
    <AppShell>
      <TopBar title="이벤트" />

      {/* Category Tabs */}
      <div className="bg-[#2D2D2D]">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-4 py-3 text-sm font-medium relative transition-colors ${
                activeTab === tab.key
                  ? "text-white font-bold"
                  : "text-white/40"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-4">
        <p className="text-sm text-kream-gray mb-3">
          <span className="font-bold text-[#111]">{filtered.length}건</span>의 이벤트
        </p>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Calendar size={40} />}
            title="이벤트가 없습니다"
            description="다른 카테고리를 확인해보세요"
          />
        ) : (
          <div className="space-y-2.5">
            {filtered.map((ev) => {
              const dateObj = new Date(ev.date);
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const progress = getProgressPercent(ev.registered, ev.capacity);
              const catColor = categoryColors[ev.category];

              return (
                <Link key={ev.id} href={`/events/${ev.id}`}>
                  <Card padding="sm" className="flex gap-3 items-start mb-2.5">
                    {/* Date Block */}
                    <div className="shrink-0 w-14 h-16 bg-[#222] rounded-xl flex flex-col items-center justify-center">
                      <span className="text-[10px] text-white/60 leading-tight">{month}월</span>
                      <span className="text-xl font-bold text-white leading-tight">{day}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Badge label={EVENT_CATEGORY_LABELS[ev.category]} color={catColor} />
                        {ev.price === "무료" && (
                          <Badge label="무료" color="#31B46E" />
                        )}
                      </div>
                      <p className="text-sm font-bold text-[#111] leading-snug tracking-tight">{ev.title}</p>
                      {ev.instructor && (
                        <p className="text-[11px] text-kream-gray mt-0.5">
                          {ev.instructor}{ev.instructorTitle && ` · ${ev.instructorTitle}`}
                        </p>
                      )}
                      <p className="text-[11px] text-kream-gray mt-1">
                        {ev.location} · {ev.time}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#111]">{ev.price}</span>
                        {ev.capacity && (
                          <span className="text-[11px] text-kream-gray">
                            {ev.registered}/{ev.capacity}명
                          </span>
                        )}
                      </div>
                      {ev.capacity && (
                        <div className="mt-1.5">
                          <div className="h-1 bg-kream-bg rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${progress}%`,
                                backgroundColor: progress > 80 ? "#EF6253" : "#31B46E",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
