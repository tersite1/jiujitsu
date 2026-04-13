"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import RatingStars from "@/components/shared/RatingStars";
import EmptyState from "@/components/shared/EmptyState";
import { gyms } from "@/data/mock-gyms";
import { Search, MapPin } from "lucide-react";

const countryFlags: Record<string, string> = {
  "한국": "🇰🇷", "일본": "🇯🇵", "브라질": "🇧🇷", "태국": "🇹🇭", "미국": "🇺🇸",
};

const tagFilters = ["드랍인 가능", "영어 가능", "초보 환영", "Gi", "No-Gi"];

type LocationFilter = "all" | "domestic" | "international";

export default function GymsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<LocationFilter>("all");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return gyms.filter((g) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !g.name.toLowerCase().includes(q) &&
          !(g.nameEn?.toLowerCase().includes(q)) &&
          !g.city.toLowerCase().includes(q) &&
          !g.country.toLowerCase().includes(q)
        ) return false;
      }
      if (location === "domestic" && g.country !== "한국") return false;
      if (location === "international" && g.country === "한국") return false;
      if (selectedTags.size > 0) {
        const gymSearchable = [...g.tags, ...g.atmosphere, ...g.languageSupport, g.dropInAvailable ? "드랍인 가능" : ""].map(t => t.toLowerCase());
        for (const tag of selectedTags) {
          const tLower = tag.toLowerCase();
          if (tLower === "영어 가능") {
            if (!g.languageSupport.some(l => l.toLowerCase().includes("english") || l.toLowerCase().includes("영어"))) return false;
          } else if (!gymSearchable.some(t => t.includes(tLower))) return false;
        }
      }
      return true;
    });
  }, [search, location, selectedTags]);

  return (
    <AppShell>
      <TopBar title="도장 찾기" />

      <div className="px-4 pt-3 pb-4">
        {/* Search + Filters (dark zone) */}
        <div className="bg-[#2D2D2D] -mx-4 px-4 pt-3 pb-3 mb-4">
          {/* Search */}
          <div className="relative mb-2.5">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="도장, 도시, 국가 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-white/10 rounded-xl text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>

          {/* Location Toggle */}
          <div className="flex gap-1.5 mb-2">
            {([
              { key: "all" as LocationFilter, label: "전체" },
              { key: "domestic" as LocationFilter, label: "국내" },
              { key: "international" as LocationFilter, label: "해외" },
            ]).map((opt) => (
              <button
                key={opt.key}
                onClick={() => setLocation(opt.key)}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                  location === opt.key
                    ? "bg-white text-[#222]"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {tagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`shrink-0 px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                  selectedTags.has(tag)
                    ? "bg-white text-[#222]"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-kream-gray mb-3">
          <span className="font-bold text-[#111]">{filtered.length}개</span>의 도장
        </p>

        {/* Gym List */}
        {filtered.length === 0 ? (
          <EmptyState icon={<MapPin size={40} />} title="검색 결과가 없습니다" description="다른 조건으로 검색해보세요" />
        ) : (
          <div className="space-y-3">
            {filtered.map((gym) => (
              <Link key={gym.id} href={`/gyms/${gym.id}`}>
                <Card padding="none" className="overflow-hidden mb-3">
                  <div className="h-36 bg-kream-bg relative">
                    <img src={gym.imageUrl} alt={gym.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-base font-bold leading-snug tracking-tight">{gym.name}</p>
                      {gym.nameEn && (
                        <p className="text-white/60 text-[11px]">{gym.nameEn}</p>
                      )}
                    </div>
                    {gym.dropInAvailable && (
                      <div className="absolute top-2.5 right-2.5">
                        <Badge label={gym.dropInPrice || "드랍인 가능"} />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-kream-gray">
                        {countryFlags[gym.country] || "🌍"} {gym.city}
                      </p>
                      <div className="flex items-center gap-1">
                        <RatingStars rating={gym.rating} size={12} />
                        <span className="text-[11px] font-semibold text-[#111]">
                          {gym.rating}
                        </span>
                        <span className="text-[11px] text-kream-gray">
                          ({gym.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {gym.tags.slice(0, 3).map((t) => (
                        <Badge key={t} label={t} variant="outline" />
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
