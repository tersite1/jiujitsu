"use client";

import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import Card from "@/components/shared/Card";
import IntensityBadge from "@/components/shared/IntensityBadge";
import Badge from "@/components/shared/Badge";
import { currentUser, userStats, userActivity, userBadges } from "@/data/mock-user";
import { BELT_LABELS, WEIGHT_LABELS } from "@/types/common";
import { Settings, ChevronRight, Flame, MapPin, Calendar, Dumbbell, Edit3 } from "lucide-react";

const infoRows = [
  { label: "벨트", value: `${BELT_LABELS[currentUser.beltLevel]} ${currentUser.stripes}그랄` },
  { label: "체급", value: `${WEIGHT_LABELS[currentUser.weightClass]} (${currentUser.weightKg}kg)` },
  { label: "지역", value: currentUser.region },
  { label: "수련 빈도", value: currentUser.trainFrequency },
  { label: "소속 도장", value: currentUser.gym },
  { label: "수련 기간", value: currentUser.experience },
];

const settingItems = [
  { label: "프로필 수정", danger: false },
  { label: "알림 설정", danger: false },
  { label: "개인정보 처리방침", danger: false },
  { label: "이용약관", danger: false },
  { label: "앱 버전", value: "v0.1.0", danger: false },
  { label: "로그아웃", danger: true },
];

const activityIcons: Record<string, typeof Dumbbell> = {
  training: Dumbbell,
  sparring: Flame,
  openmat: Calendar,
};

export default function ProfilePage() {
  const joinDate = new Date(userStats.joinDate);
  const joinStr = `${joinDate.getFullYear()}.${String(joinDate.getMonth() + 1).padStart(2, "0")}`;

  return (
    <AppShell>
      <TopBar
        title="마이"
        rightAction={
          <button className="p-1.5">
            <Settings size={20} className="text-kream-black" />
          </button>
        }
      />

      <div className="pb-4">
        {/* Profile Header — charcoal bg */}
        <div className="px-4 pt-8 pb-5">
          <div className="flex items-center gap-4">
            <Avatar name={currentUser.name} size="xl" beltLevel={currentUser.beltLevel} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#111]">{currentUser.name}</h2>
                <button className="p-1">
                  <Edit3 size={14} className="text-kream-gray" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-kream-border"
                  style={{ backgroundColor: currentUser.beltLevel === "white" ? "#E0E0E0" : undefined }}
                />
                <span className="text-sm text-kream-gray">
                  {BELT_LABELS[currentUser.beltLevel]} {currentUser.stripes > 0 && `${currentUser.stripes}그랄`}
                </span>
              </div>
              <p className="text-xs text-kream-gray mt-1">{currentUser.gym} · {currentUser.experience}</p>
              <p className="text-[11px] text-kream-lightgray mt-0.5">가입일 {joinStr}</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 border-y border-kream-border">
          {[
            { label: "스파링", value: userStats.totalSparring },
            { label: "오픈매트", value: userStats.openmatAttended },
            { label: "연속 수련", value: `${userStats.streak}일` },
            { label: "총 수련일", value: userStats.totalTrainingDays },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-4 border-r border-kream-border last:border-r-0">
              <p className="text-base font-bold text-[#111]">{stat.value}</p>
              <p className="text-[11px] text-kream-gray mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="px-4 pt-5 space-y-5">
          {/* Bio */}
          <Card>
            <h3 className="section-header mb-2">자기소개</h3>
            <p className="text-sm text-kream-gray leading-relaxed">{currentUser.bio}</p>
          </Card>

          {/* Badges */}
          <div>
            <h3 className="section-header mb-3">배지</h3>
            <div className="grid grid-cols-3 gap-2">
              {userBadges.map((badge) => (
                <Card
                  key={badge.id}
                  padding="sm"
                  className={`text-center ${!badge.earned ? "opacity-30" : ""}`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <p className="text-[10px] font-medium text-kream-black mt-1">{badge.label}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="section-header mb-3">최근 활동</h3>
            <Card padding="none">
              {userActivity.map((act, i) => {
                const Icon = activityIcons[act.type] || Dumbbell;
                const dateObj = new Date(act.date);
                const dateLabel = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i < userActivity.length - 1 ? "border-b border-kream-border" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-kream-charcoal flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-kream-black">{act.label}</p>
                      <p className="text-[11px] text-kream-gray">{act.gym}</p>
                    </div>
                    <span className="text-[11px] text-kream-lightgray shrink-0">{dateLabel}</span>
                  </div>
                );
              })}
            </Card>
          </div>

          {/* Info */}
          <div>
            <h3 className="section-header mb-3">내 정보</h3>
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
            <h3 className="section-header mb-3">선호 스파링 시간</h3>
            <div className="flex gap-2 flex-wrap">
              {currentUser.preferredSchedule.map((s) => (
                <Badge key={s} label={s} variant="outline" />
              ))}
            </div>
          </div>

          {/* Preferred Intensity */}
          <div>
            <h3 className="section-header mb-3">선호 강도</h3>
            <IntensityBadge intensity={currentUser.intensityPreference} />
          </div>

          {/* Settings */}
          <div>
            <h3 className="section-header mb-3">설정</h3>
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
      </div>
    </AppShell>
  );
}
