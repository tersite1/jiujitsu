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
      // Search
      if (search) {
        const q = search.toLowerCase();
        if (
          !g.name.toLowerCase().includes(q) &&
          !(g.nameEn?.toLowerCase().includes(q)) &&
          !g.city.toLowerCase().includes(q) &&
          !g.country.toLowerCase().includes(q)
        ) return false;
      }
      // Location
      if (location === "domestic" && g.country !== "한국") return false;
      if (location === "international" && g.country === "한국") return false;
      // Tags
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
        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-kream-gray" />
          <input
            type="text"
            placeholder="도장, 도시, 국가 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-kream-bg rounded-xl text-sm text-kream-black placeholder:text-kream-lightgray outline-none focus:ring-1 focus:ring-kream-black"
          />
        </div>

        {/* Location Toggle */}
        <div className="flex gap-1.5 mb-3">
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
        <p className="text-xs text-kream-gray mb-3">{filtered.length}개의 도장</p>

        {/* Gym List */}
        {filtered.length === 0 ? (
          <EmptyState icon={<MapPin size={40} />} title="검색 결과가 없습니다" description="다른 조건으로 검색해보세요" />
        ) : (
          <div className="space-y-3">
            {filtered.map((gym) => (
              <Link key={gym.id} href={`/gyms/${gym.id}`}>
                <Card padding="none" className="overflow-hidden mb-3">
                  <div className="h-32 bg-kream-bg">
                    <img src={gym.imageUrl} alt={gym.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-kream-black">{gym.name}</p>
                        {gym.nameEn && (
                          <p className="text-[11px] text-kream-lightgray">{gym.nameEn}</p>
                        )}
                      </div>
                      {gym.dropInAvailable && (
                        <Badge label={gym.dropInPrice || "드랍인 가능"} className="shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-[11px] text-kream-gray mt-1">
                      {countryFlags[gym.country] || "🌍"} {gym.city}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <RatingStars rating={gym.rating} size={12} />
                      <span className="text-[11px] text-kream-gray">
                        {gym.rating} ({gym.reviewCount})
                      </span>
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
