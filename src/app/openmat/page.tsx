"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import EmptyState from "@/components/shared/EmptyState";
import { openmats } from "@/data/mock-openmats";
import { getProgressPercent } from "@/lib/utils";
import { Search, Calendar, MapPin, Users } from "lucide-react";

type LocationFilter = "all" | "domestic" | "international";
type TimeFilter = "all" | "today" | "week" | "month";

const tagFilters = ["무료", "여성", "초보 환영", "No-Gi", "타도장 환영", "드랍인 환영"];

export default function OpenMatPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<LocationFilter>("all");
  const [timeRange, setTimeRange] = useState<TimeFilter>("all");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const monthEnd = new Date(now);
    monthEnd.setMonth(monthEnd.getMonth() + 1);

    return openmats.filter((om) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        if (
          !om.gymName.toLowerCase().includes(q) &&
          !om.location.toLowerCase().includes(q) &&
          !om.tags.some((t) => t.toLowerCase().includes(q))
        ) return false;
      }
      // Location
      const isDomestic = om.location.includes("서울") || om.location.includes("부산") || om.location.includes("대구") || om.location.includes("인천");
      if (location === "domestic" && !isDomestic) return false;
      if (location === "international" && isDomestic) return false;
      // Time
      if (timeRange === "today" && om.date !== todayStr) return false;
      if (timeRange === "week" && new Date(om.date) > weekEnd) return false;
      if (timeRange === "month" && new Date(om.date) > monthEnd) return false;
      // Tags
      if (selectedTags.size > 0) {
        const omTags = [...om.tags, om.price === "무료" ? "무료" : ""].map((t) => t.toLowerCase());
        for (const tag of selectedTags) {
          if (!omTags.some((t) => t.includes(tag.toLowerCase()))) return false;
        }
      }
      return true;
    });
  }, [search, location, timeRange, selectedTags]);

  return (
    <AppShell>
      <TopBar title="오픈매트" />

      <div className="px-4 pt-3 pb-4">
        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-kream-gray" />
          <input
            type="text"
            placeholder="도장, 지역 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-kream-bg rounded-xl text-sm text-kream-black placeholder:text-kream-lightgray outline-none focus:ring-1 focus:ring-kream-black"
          />
        </div>

        {/* Location Toggle */}
        <div className="flex gap-1.5 mb-2.5">
          {([
            { key: "all" as LocationFilter, label: "전체" },
            { key: "domestic" as LocationFilter, label: "국내" },
            { key: "international" as LocationFilter, label: "해외" },
          ]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setLocation(opt.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                location === opt.key
                  ? "bg-kream-black text-white"
                  : "bg-kream-bg text-kream-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Time Range Toggle */}
        <div className="flex gap-1.5 mb-2.5">
          {([
            { key: "all" as TimeFilter, label: "전체" },
            { key: "today" as TimeFilter, label: "오늘" },
            { key: "week" as TimeFilter, label: "이번 주" },
            { key: "month" as TimeFilter, label: "이번 달" },
          ]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setTimeRange(opt.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                timeRange === opt.key
                  ? "bg-kream-black text-white"
                  : "bg-kream-bg text-kream-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Tag Filters */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar mb-4">
          {tagFilters.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTags.has(tag)
                  ? "bg-kream-black text-white"
                  : "bg-kream-bg text-kream-black"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-xs text-kream-gray mb-3">{filtered.length}건의 오픈매트</p>

        {/* Open Mat Cards */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Calendar size={40} />}
            title="오픈매트가 없습니다"
            description="다른 조건으로 검색해보세요"
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((om) => {
              const dateObj = new Date(om.date);
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
              const progress = getProgressPercent(om.registered, om.capacity);
              const isFull = om.registered >= om.capacity;

              return (
                <Link key={om.id} href={`/openmat/${om.id}`}>
                  <Card padding="none" className="overflow-hidden mb-3">
                    {/* Gym Image */}
                    <div className="h-36 bg-kream-bg relative">
                      <img src={om.gymImageUrl} alt={om.gymName} className="w-full h-full object-cover" />
                      {isFull && (
                        <div className="absolute top-2.5 right-2.5">
                          <Badge label="마감" color="#EF6253" />
                        </div>
                      )}
                      {om.price === "무료" && (
                        <div className="absolute top-2.5 left-2.5">
                          <Badge label="무료" color="#31B46E" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-kream-black">{om.gymName}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin size={12} className="text-kream-gray shrink-0" />
                            <p className="text-[11px] text-kream-gray">{om.location}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-kream-black shrink-0 ml-2">
                          {om.price}
                        </span>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-1 mt-1.5">
                        <Calendar size={12} className="text-kream-gray shrink-0" />
                        <p className="text-[11px] text-kream-gray">
                          {month}/{day}({dayOfWeek}) {om.time}
                        </p>
                        {om.isRecurring && (
                          <span className="text-[10px] text-kream-lightgray ml-1">
                            ({om.recurringNote})
                          </span>
                        )}
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <Users size={12} className="text-kream-gray shrink-0" />
                        <div className="flex-1">
                          <div className="h-1.5 bg-kream-bg rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${progress}%`,
                                backgroundColor: progress > 80 ? "#EF6253" : "#31B46E",
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] text-kream-gray shrink-0">
                          {om.registered}/{om.capacity}명
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-1 mt-2.5 flex-wrap">
                        {om.tags.slice(0, 4).map((t) => (
                          <Badge key={t} label={t} variant="outline" />
                        ))}
                      </div>
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
