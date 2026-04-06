"use client";

import AppShell from "@/components/layout/AppShell";
import Avatar from "@/components/shared/Avatar";
import BeltIndicator from "@/components/shared/BeltIndicator";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import IntensityBadge from "@/components/shared/IntensityBadge";
import RatingStars from "@/components/shared/RatingStars";
import { currentUser } from "@/data/mock-user";
import { practitioners } from "@/data/mock-practitioners";
import { gyms } from "@/data/mock-gyms";
import { events } from "@/data/mock-events";
import { APP_NAME } from "@/lib/constants";
import { formatDate, getProgressPercent } from "@/lib/utils";
import { EVENT_CATEGORY_LABELS } from "@/types/event";
import { Bell, ChevronRight, TrendingUp, Heart, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <AppShell>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-kream-border">
        <div className="flex items-center justify-between h-12 px-4">
          <span className="text-lg font-bold text-kream-black">{APP_NAME}</span>
          <button className="p-1.5 rounded-full hover:bg-kream-bg transition-colors">
            <Bell size={20} className="text-kream-black" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-5 pb-4 space-y-6">
        {/* Greeting */}
        <div className="flex items-center gap-3">
          <Avatar name={currentUser.name} size="lg" beltLevel={currentUser.beltLevel} />
          <div>
            <p className="text-base font-semibold text-kream-black">
              안녕하세요, {currentUser.name}님
            </p>
            <BeltIndicator level={currentUser.beltLevel} stripes={currentUser.stripes} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: TrendingUp, label: "이번 주 스파링", value: "0회" },
            { icon: Heart, label: "관심 도장", value: "3곳" },
            { icon: CalendarDays, label: "다가오는 이벤트", value: "2건" },
          ].map((stat) => (
            <Card key={stat.label} padding="sm" className="text-center">
              <stat.icon size={18} className="text-kream-gray mx-auto mb-1.5" />
              <p className="text-lg font-bold text-kream-black">{stat.value}</p>
              <p className="text-[10px] text-kream-gray mt-0.5">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Recommended Sparring Partners */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-kream-black">추천 스파링 파트너</h2>
            <Link href="/matching" className="flex items-center text-xs text-kream-gray">
              더보기 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {practitioners.filter(p => p.isAvailable).slice(0, 5).map((p) => (
              <Link key={p.id} href={`/matching/${p.id}`} className="shrink-0">
                <Card padding="sm" className="w-[140px]">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Avatar name={p.name} size="lg" beltLevel={p.beltLevel} />
                    <div>
                      <p className="text-sm font-semibold text-kream-black">{p.name}</p>
                      <p className="text-[11px] text-kream-gray">{p.region} · {p.gym}</p>
                    </div>
                    <BeltIndicator level={p.beltLevel} stripes={p.stripes} />
                    <IntensityBadge intensity={p.intensityPreference} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Gyms */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-kream-black">인기 도장</h2>
            <Link href="/gyms" className="flex items-center text-xs text-kream-gray">
              더보기 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {gyms.slice(0, 4).map((gym) => (
              <Link key={gym.id} href={`/gyms/${gym.id}`} className="shrink-0">
                <Card padding="none" className="w-[200px] overflow-hidden">
                  <div className="h-24 bg-kream-bg">
                    <img src={gym.imageUrl} alt={gym.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-kream-black truncate">{gym.name}</p>
                    <p className="text-[11px] text-kream-gray mt-0.5">{gym.city}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <RatingStars rating={gym.rating} size={11} />
                      <span className="text-[10px] text-kream-gray">({gym.reviewCount})</span>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {gym.tags.slice(0, 2).map((t) => (
                        <Badge key={t} label={t} variant="outline" />
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-kream-black">다가오는 이벤트</h2>
            <Link href="/events" className="flex items-center text-xs text-kream-gray">
              더보기 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {events.slice(0, 3).map((ev) => {
              const dateObj = new Date(ev.date);
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const progress = getProgressPercent(ev.registered, ev.capacity);
              return (
                <Link key={ev.id} href={`/events/${ev.id}`}>
                  <Card padding="sm" className="flex gap-3 items-start">
                    <div className="shrink-0 w-12 h-14 bg-kream-bg rounded-lg flex flex-col items-center justify-center">
                      <span className="text-[10px] text-kream-gray">{month}월</span>
                      <span className="text-lg font-bold text-kream-black leading-tight">{day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Badge label={EVENT_CATEGORY_LABELS[ev.category]} />
                      </div>
                      <p className="text-sm font-semibold text-kream-black truncate">{ev.title}</p>
                      <p className="text-[11px] text-kream-gray mt-0.5">{ev.location} · {ev.price}</p>
                      {ev.capacity && (
                        <div className="mt-2">
                          <div className="h-1 bg-kream-bg rounded-full overflow-hidden">
                            <div
                              className="h-full bg-kream-red rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-kream-gray mt-0.5">
                            {ev.registered}/{ev.capacity}명 등록
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
