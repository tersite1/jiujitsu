"use client";

import AppShell from "@/components/layout/AppShell";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import { currentUser } from "@/data/mock-user";
import { openmats } from "@/data/mock-openmats";
import { events } from "@/data/mock-events";
import { getProgressPercent } from "@/lib/utils";
import { EVENT_CATEGORY_LABELS } from "@/types/event";
import { Bell, MessageCircle, ChevronRight, TrendingUp, CalendarDays, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const upcomingOpenmats = openmats.slice(0, 4);
  const bannerEvents = events.filter(e => e.category !== "open-mat").slice(0, 3);

  return (
    <AppShell>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_var(--color-line)]">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-7 w-auto" />
            <span className="text-[22px] font-black italic text-[#00533E] tracking-tight leading-none">Oss</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/chat" className="p-1.5 rounded-full hover:bg-kream-bg transition-colors relative">
              <MessageCircle size={20} className="text-[var(--color-ink-soft)]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-accent)] rounded-full" />
            </Link>
            <button className="p-1.5 rounded-full hover:bg-kream-bg transition-colors">
              <Bell size={20} className="text-[var(--color-ink-soft)]" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-5 pb-4 space-y-6">
        {/* Greeting */}
        <div className="flex items-center gap-3 pb-4 border-b border-kream-border">
          <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="lg" beltLevel={currentUser.beltLevel} />
          <div>
            <p className="text-base font-semibold text-[var(--color-ink)] tracking-tight">
              안녕하세요, {currentUser.name}님
            </p>
            <BeltIndicator level={currentUser.beltLevel} stripes={currentUser.stripes} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: TrendingUp, label: "이번 주 스파링", value: "3회" },
            { icon: CalendarDays, label: "오픈매트 참여", value: "2회" },
            { icon: Users, label: "다가오는 오픈매트", value: `${upcomingOpenmats.length}건` },
          ].map((stat) => (
            <Card key={stat.label} padding="sm" className="text-center">
              <stat.icon size={16} className="text-[#00533E] mx-auto mb-1" />
              <p className="text-lg font-black text-[#161512] leading-tight">{stat.value}</p>
              <p className="text-[10px] text-[#8B8578] mt-0.5">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Upcoming Open Mats */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-header">추천 오픈매트</h2>
            <Link href="/openmat" className="flex items-center gap-0.5 text-xs font-semibold text-kream-gray">
              전체보기 <ChevronRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {upcomingOpenmats.map((om) => {
              const dateObj = new Date(om.date);
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
              const progress = getProgressPercent(om.registered, om.capacity);
              return (
                <Link key={om.id} href={`/openmat/${om.id}`}>
                  <Card padding="none" className="overflow-hidden mb-2.5">
                    <div className="flex">
                      {/* Gym Image */}
                      <div className="shrink-0 w-28 min-h-[100px] bg-kream-bg">
                        <img src={om.gymImageUrl} alt={om.gymName} className="w-full h-full object-cover" />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0 p-3">
                        <p className="text-sm font-bold text-[var(--color-ink)] truncate tracking-tight">{om.gymName}</p>
                        <p className="text-[11px] text-kream-gray mt-0.5">
                          {month}/{day}({dayOfWeek}) · {om.time}
                        </p>
                        <p className="text-[11px] text-kream-gray">{om.location}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-[var(--color-ink)]">{om.price}</span>
                          <span className="text-[11px] text-kream-gray">
                            {om.registered}/{om.capacity}명
                          </span>
                        </div>
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
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Event Banners */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-header">이벤트</h2>
            <Link href="/events" className="flex items-center gap-0.5 text-xs font-semibold text-kream-gray">
              전체보기 <ChevronRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {bannerEvents.map((ev) => {
              const catColor: Record<string, string> = {
                seminar: "#EF6253",
                competition: "#1E88E5",
                workshop: "#FF9800",
              };
              const dateObj = new Date(ev.date);
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              return (
                <Link key={ev.id} href={`/events/${ev.id}`} className="shrink-0">
                  <div className="w-[280px] h-[140px] rounded-xl overflow-hidden relative">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge label={EVENT_CATEGORY_LABELS[ev.category]} color={catColor[ev.category]} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-sm font-bold leading-snug truncate">{ev.title}</p>
                      <p className="text-white/80 text-[11px] mt-0.5">
                        {month}/{day} · {ev.location}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
