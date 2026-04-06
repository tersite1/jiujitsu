"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import IntensityBadge from "@/components/shared/IntensityBadge";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Toast from "@/components/shared/Toast";
import { practitioners } from "@/data/mock-practitioners";
import { WEIGHT_LABELS } from "@/types/common";

export default function PractitionerDetailPage() {
  const params = useParams();
  const [showToast, setShowToast] = useState(false);

  const practitioner = practitioners.find((p) => p.id === params.id);

  if (!practitioner) {
    return (
      <AppShell>
        <TopBar title="수련자" showBack />
        <div className="p-8 text-center text-kream-gray">수련자를 찾을 수 없습니다</div>
      </AppShell>
    );
  }

  const p = practitioner;

  const infoItems = [
    { label: "체급", value: WEIGHT_LABELS[p.weightClass] },
    { label: "체중", value: `${p.weightKg}kg` },
    { label: "지역", value: p.region },
    { label: "소속", value: p.gym },
    { label: "수련 빈도", value: p.trainFrequency },
    { label: "경력", value: p.experience },
  ];

  return (
    <AppShell>
      <TopBar title={p.name} showBack />

      <div className="px-4 pt-6 pb-28 space-y-5">
        {/* Profile Hero */}
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar name={p.name} size="xl" beltLevel={p.beltLevel} />
          <div>
            <h2 className="text-lg font-bold text-kream-black">{p.name}</h2>
            <p className="text-xs text-kream-gray">{p.age}세</p>
          </div>
          <BeltIndicator level={p.beltLevel} stripes={p.stripes} />
        </div>

        {/* Info Grid */}
        <Card padding="none">
          {infoItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-4 py-3 ${
                i < infoItems.length - 1 ? "border-b border-kream-border" : ""
              }`}
            >
              <span className="text-sm text-kream-gray">{item.label}</span>
              <span className="text-sm font-medium text-kream-black">{item.value}</span>
            </div>
          ))}
        </Card>

        {/* Bio */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-2">자기소개</h3>
          <Card>
            <p className="text-sm text-kream-gray leading-relaxed">{p.bio}</p>
          </Card>
        </div>

        {/* Schedule */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-2">선호 스파링 시간</h3>
          <div className="flex gap-2 flex-wrap">
            {p.preferredSchedule.map((s) => (
              <Badge key={s} label={s} variant="outline" />
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-2">선호 강도</h3>
          <IntensityBadge intensity={p.intensityPreference} />
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-kream-border z-30">
        <Button
          size="lg"
          variant="primary"
          fullWidth
          onClick={() => setShowToast(true)}
          disabled={!p.isAvailable}
        >
          매칭 요청하기
        </Button>
      </div>

      <Toast
        message={`${p.name}님에게 매칭 요청을 보냈습니다!`}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </AppShell>
  );
}
