"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import EmptyState from "@/components/shared/EmptyState";
import CalendarView from "@/components/shared/CalendarView";
import { events } from "@/data/mock-events";
import { EventCategory, EVENT_CATEGORY_LABELS } from "@/types/event";
import { getProgressPercent } from "@/lib/utils";
import { Calendar, List } from "lucide-react";

const categoryColors: Record<EventCategory, string> = {
  seminar: "#F7633D",      // coral
  competition: "#00533E",  // forest
  "open-mat": "#1E8A52",   // success-green
  workshop: "#D98627",     // warm amber
};

const tabs: Array<{ key: EventCategory | "all"; label: string }> = [
  { key: "all", label: "전체" },
  { key: "seminar", label: "세미나" },
  { key: "competition", label: "대회" },
  { key: "open-mat", label: "오픈매트" },
  { key: "workshop", label: "워크샵" },
];

type ViewMode = "list" | "calendar";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<EventCategory | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const tabFiltered = useMemo(() => {
    if (activeTab === "all") return events;
    return events.filter((e) => e.category === activeTab);
  }, [activeTab]);

  const filtered = useMemo(() => {
    if (viewMode === "calendar" && selectedDate) {
      return tabFiltered.filter((e) => e.date === selectedDate);
    }
    return tabFiltered;
  }, [tabFiltered, viewMode, selectedDate]);

  return (
    <AppShell>
      <TopBar
        title="이벤트"
        rightAction={
          <button
            type="button"
            onClick={() => {
              setViewMode((m) => (m === "list" ? "calendar" : "list"));
              setSelectedDate(null);
            }}
            aria-label={viewMode === "list" ? "캘린더 뷰로 전환" : "리스트 뷰로 전환"}
            aria-pressed={viewMode === "calendar"}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[var(--color-surface-sunken)] text-[11px] font-semibold text-kream-black active:scale-95 transition"
          >
            {viewMode === "list" ? (
              <><Calendar size={13} /> 캘린더</>
            ) : (
              <><List size={13} /> 리스트</>
            )}
          </button>
        }
      />

      {/* Category Tabs */}
      <div className="border-b border-[var(--color-line)]" role="tablist" aria-label="이벤트 카테고리">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-4 py-3 text-sm font-medium relative transition-colors ${
                activeTab === tab.key
                  ? "text-[#161512] font-bold"
                  : "text-kream-gray"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "calendar" && (
        <CalendarView
          events={tabFiltered}
          categoryColors={categoryColors}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}

      <div className="px-4 pt-3 pb-4">
        <p className="text-sm text-kream-gray border-t border-kream-border pt-3 mb-2">
          {viewMode === "calendar" && selectedDate ? (
            <>
              <span className="font-bold text-[#161512] tnum">
                {selectedDate.slice(5).replace("-", "월 ")}일
              </span>{" "}
              <span className="font-bold text-[#161512]">{filtered.length}건</span>
            </>
          ) : viewMode === "calendar" ? (
            <>날짜를 선택하면 해당 일의 이벤트만 표시됩니다</>
          ) : (
            <><span className="font-bold text-[#161512]">{filtered.length}건</span>의 이벤트</>
          )}
        </p>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Calendar size={40} />}
            title={viewMode === "calendar" && selectedDate ? "이 날짜에 이벤트가 없습니다" : "이벤트가 없습니다"}
            description={viewMode === "calendar" && selectedDate ? "다른 날짜를 선택해보세요" : "다른 카테고리를 확인해보세요"}
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
                    <div className="shrink-0 w-14 h-16 bg-[var(--color-forest)] rounded-xl flex flex-col items-center justify-center">
                      <span className="text-[10px] text-white/60 leading-tight">{month}월</span>
                      <span className="text-xl font-bold text-white leading-tight">{day}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Badge label={EVENT_CATEGORY_LABELS[ev.category]} color={catColor} />
                        {ev.price === "무료" && (
                          <Badge label="무료" color="#1E8A52" />
                        )}
                      </div>
                      <p className="text-sm font-bold text-[#161512] leading-snug tracking-tight">{ev.title}</p>
                      {ev.instructor && (
                        <p className="text-[11px] text-kream-gray mt-0.5">
                          {ev.instructor}{ev.instructorTitle && ` · ${ev.instructorTitle}`}
                        </p>
                      )}
                      <p className="text-[11px] text-kream-gray mt-1">
                        {ev.location} · {ev.time}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#161512]">{ev.price}</span>
                        {ev.capacity && (
                          <span className="text-[11px] text-kream-gray tnum">
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
                                backgroundColor: progress > 80 ? "#F7633D" : "#1E8A52",
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
