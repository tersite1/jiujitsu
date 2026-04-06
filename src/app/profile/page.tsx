"use client";

import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import Card from "@/components/shared/Card";
import IntensityBadge from "@/components/shared/IntensityBadge";
import Badge from "@/components/shared/Badge";
import { currentUser } from "@/data/mock-user";
import { BELT_LABELS, WEIGHT_LABELS } from "@/types/common";
import { Settings, ChevronRight, Swords, MapPin, Calendar } from "lucide-react";

const infoRows = [
  { label: "벨트", value: `${BELT_LABELS[currentUser.beltLevel]} ${currentUser.stripes}그랄` },
  { label: "체급", value: `${WEIGHT_LABELS[currentUser.weightClass]} (${currentUser.weightKg}kg)` },
  { label: "지역", value: currentUser.region },
  { label: "수련 빈도", value: currentUser.trainFrequency },
  { label: "소속 도장", value: currentUser.gym },
];

const settingItems = [
  { label: "알림 설정", danger: false },
  { label: "개인정보 처리방침", danger: false },
  { label: "이용약관", danger: false },
  { label: "앱 버전", value: "v0.1.0", danger: false },
  { label: "로그아웃", danger: true },
];

export default function ProfilePage() {
  return (
    <AppShell>
      <TopBar
        title="MY"
        rightAction={
          <button className="p-1.5">
            <Settings size={20} className="text-kream-black" />
          </button>
        }
      />

      <div className="px-4 pt-6 pb-4 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar name={currentUser.name} size="xl" beltLevel={currentUser.beltLevel} />
          <div>
            <h2 className="text-lg font-bold text-kream-black">{currentUser.name}</h2>
            <BeltIndicator level={currentUser.beltLevel} stripes={currentUser.stripes} />
            <p className="text-xs text-kream-gray mt-1">{currentUser.gym} · {currentUser.experience}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: Swords, label: "스파링", value: "24회" },
            { icon: MapPin, label: "방문 도장", value: "5곳" },
            { icon: Calendar, label: "참가 이벤트", value: "3건" },
          ].map((stat) => (
            <Card key={stat.label} padding="sm" className="text-center">
              <stat.icon size={18} className="text-kream-gray mx-auto mb-1" />
              <p className="text-base font-bold text-kream-black">{stat.value}</p>
              <p className="text-[10px] text-kream-gray mt-0.5">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Bio */}
        <Card>
          <p className="text-xs font-semibold text-kream-black mb-2">자기소개</p>
          <p className="text-sm text-kream-gray leading-relaxed">{currentUser.bio}</p>
        </Card>

        {/* Info */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-3">내 정보</h3>
          <Card padding="none">
            {infoRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < infoRows.length - 1 ? "border-b border-kream-border" : ""
                }`}
              >
                <span className="text-sm text-kream-gray">{row.label}</span>
                <span className="text-sm font-medium text-kream-black">{row.value}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Preferred Schedule */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-3">선호 스파링 시간</h3>
          <div className="flex gap-2 flex-wrap">
            {currentUser.preferredSchedule.map((s) => (
              <Badge key={s} label={s} variant="outline" />
            ))}
          </div>
        </div>

        {/* Preferred Intensity */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-3">선호 강도</h3>
          <IntensityBadge intensity={currentUser.intensityPreference} />
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-sm font-bold text-kream-black mb-3">설정</h3>
          <Card padding="none">
            {settingItems.map((item, i) => (
              <button
                key={item.label}
                className={`flex items-center justify-between w-full px-4 py-3.5 text-left ${
                  i < settingItems.length - 1 ? "border-b border-kream-border" : ""
                }`}
              >
                <span className={`text-sm ${item.danger ? "text-kream-red" : "text-kream-black"}`}>
                  {item.label}
                </span>
                {item.value ? (
                  <span className="text-sm text-kream-gray">{item.value}</span>
                ) : (
                  <ChevronRight size={16} className="text-kream-lightgray" />
                )}
              </button>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
