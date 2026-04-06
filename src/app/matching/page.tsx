"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import IntensityBadge from "@/components/shared/IntensityBadge";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Toast from "@/components/shared/Toast";
import EmptyState from "@/components/shared/EmptyState";
import { practitioners } from "@/data/mock-practitioners";
import { BeltLevel, BELT_LABELS, IntensityPreference, INTENSITY_LABELS, Region, WEIGHT_LABELS } from "@/types/common";
import { Search } from "lucide-react";

const beltFilters: BeltLevel[] = ["white", "blue", "purple", "brown", "black"];
const regionFilters: Region[] = ["강남", "서초", "송파", "마포", "홍대", "건대", "잠실", "종로"];
const intensityFilters: IntensityPreference[] = ["light", "medium", "hard"];

export default function MatchingPage() {
  const [selectedBelts, setSelectedBelts] = useState<Set<BeltLevel>>(new Set());
  const [selectedRegions, setSelectedRegions] = useState<Set<Region>>(new Set());
  const [selectedIntensity, setSelectedIntensity] = useState<Set<IntensityPreference>>(new Set());
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toggleBelt = (b: BeltLevel) => {
    setSelectedBelts((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  };

  const toggleRegion = (r: Region) => {
    setSelectedRegions((prev) => {
      const next = new Set(prev);
      next.has(r) ? next.delete(r) : next.add(r);
      return next;
    });
  };

  const toggleIntensity = (i: IntensityPreference) => {
    setSelectedIntensity((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const filtered = practitioners.filter((p) => {
    if (selectedBelts.size > 0 && !selectedBelts.has(p.beltLevel)) return false;
    if (selectedRegions.size > 0 && !selectedRegions.has(p.region)) return false;
    if (selectedIntensity.size > 0 && !selectedIntensity.has(p.intensityPreference)) return false;
    return true;
  });

  const handleMatchRequest = useCallback((name: string) => {
    setToastMsg(`${name}님에게 매칭 요청을 보냈습니다!`);
    setShowToast(true);
  }, []);

  return (
    <AppShell>
      <TopBar title="스파링 매칭" />
      <div className="px-4 pt-3 pb-4">
        {/* Belt Filter */}
        <div className="mb-2">
          <p className="text-[11px] text-kream-gray mb-1.5 font-medium">벨트</p>
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {beltFilters.map((b) => (
              <button
                key={b}
                onClick={() => toggleBelt(b)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedBelts.has(b)
                    ? "bg-kream-black text-white"
                    : "bg-kream-bg text-kream-black"
                }`}
              >
                {BELT_LABELS[b]}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div className="mb-2">
          <p className="text-[11px] text-kream-gray mb-1.5 font-medium">지역</p>
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {regionFilters.map((r) => (
              <button
                key={r}
                onClick={() => toggleRegion(r)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedRegions.has(r)
                    ? "bg-kream-black text-white"
                    : "bg-kream-bg text-kream-black"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity Filter */}
        <div className="mb-4">
          <p className="text-[11px] text-kream-gray mb-1.5 font-medium">강도</p>
          <div className="flex gap-1.5">
            {intensityFilters.map((i) => (
              <button
                key={i}
                onClick={() => toggleIntensity(i)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedIntensity.has(i)
                    ? "bg-kream-black text-white"
                    : "bg-kream-bg text-kream-black"
                }`}
              >
                {INTENSITY_LABELS[i]}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-kream-gray mb-3">{filtered.length}명의 수련자</p>

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={40} />}
            title="검색 결과가 없습니다"
            description="필터를 조정해보세요"
          />
        ) : (
          <div className="space-y-2.5">
            {filtered.map((p) => (
              <Card key={p.id} padding="sm">
                <div className="flex gap-3">
                  <Link href={`/matching/${p.id}`} className="shrink-0">
                    <Avatar name={p.name} size="lg" beltLevel={p.beltLevel} />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/matching/${p.id}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-kream-black">{p.name}</span>
                        <span className="text-[11px] text-kream-gray">{p.age}세</span>
                        {!p.isAvailable && (
                          <Badge label="오프라인" variant="outline" className="text-kream-lightgray" />
                        )}
                      </div>
                      <BeltIndicator level={p.beltLevel} stripes={p.stripes} />
                      <p className="text-[11px] text-kream-gray mt-1">
                        {p.gym} · {p.region}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <IntensityBadge intensity={p.intensityPreference} />
                        <span className="text-[11px] text-kream-gray">
                          {WEIGHT_LABELS[p.weightClass]} {p.weightKg}kg
                        </span>
                      </div>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {p.preferredSchedule.map((s) => (
                          <Badge key={s} label={s} variant="outline" />
                        ))}
                      </div>
                    </Link>
                  </div>
                  <div className="shrink-0 flex items-start pt-1">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleMatchRequest(p.name)}
                      disabled={!p.isAvailable}
                    >
                      매칭 요청
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Toast message={toastMsg} isVisible={showToast} onHide={() => setShowToast(false)} />
    </AppShell>
  );
}
