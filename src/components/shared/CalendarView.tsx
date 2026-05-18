"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BJJEvent } from "@/types/event";

interface CalendarViewProps {
  events: BJJEvent[];
  categoryColors: Record<string, string>;
  onSelectDate: (isoDate: string | null) => void;
  selectedDate: string | null;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function CalendarView({
  events,
  categoryColors,
  onSelectDate,
  selectedDate,
}: CalendarViewProps) {
  const todayIso = isoDate(new Date());
  const initialCursor = useMemo(() => {
    const base = selectedDate ? new Date(selectedDate) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [selectedDate]);

  const [cursor, setCursor] = useState<Date>(initialCursor);

  const year = cursor.getFullYear();
  const month = cursor.getMonth(); // 0-indexed

  const grid = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const startWeekday = firstOfMonth.getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Pad to 6 rows × 7 cols for stable layout
    const cells: Array<{ date: Date | null; iso: string | null }> = [];
    for (let i = 0; i < startWeekday; i++) cells.push({ date: null, iso: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      cells.push({ date, iso: isoDate(date) });
    }
    while (cells.length < 42) cells.push({ date: null, iso: null });
    return cells;
  }, [year, month]);

  // index events by iso date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, BJJEvent[]>();
    for (const e of events) {
      const arr = map.get(e.date) ?? [];
      arr.push(e);
      map.set(e.date, arr);
    }
    return map;
  }, [events]);

  const monthLabel = `${year}년 ${month + 1}월`;

  return (
    <div className="px-2 pt-3">
      {/* Month header */}
      <div className="flex items-center justify-between px-2 mb-3">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          aria-label="이전 달"
          className="w-9 h-9 inline-flex items-center justify-center rounded-full active:scale-95 hover:bg-[var(--color-surface-sunken)] transition"
        >
          <ChevronLeft size={20} className="text-kream-black" />
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-kream-black tnum tracking-tight">{monthLabel}</h2>
          <button
            type="button"
            onClick={() => {
              const t = new Date();
              setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
              onSelectDate(isoDate(t));
            }}
            className="text-[11px] font-semibold text-[var(--color-accent)] px-2 py-1 rounded-md hover:bg-[var(--color-coral-soft)] transition"
          >
            오늘
          </button>
        </div>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label="다음 달"
          className="w-9 h-9 inline-flex items-center justify-center rounded-full active:scale-95 hover:bg-[var(--color-surface-sunken)] transition"
        >
          <ChevronRight size={20} className="text-kream-black" />
        </button>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 px-1 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div
            key={w}
            className={`text-[11px] font-semibold text-center py-1 ${
              i === 0 ? "text-[var(--color-accent)]" :
              i === 6 ? "text-[var(--color-brand)]" :
              "text-kream-gray"
            }`}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1 px-1">
        {grid.map((cell, idx) => {
          if (!cell.date || !cell.iso) {
            return <div key={idx} className="aspect-square" aria-hidden />;
          }
          const dayEvents = eventsByDate.get(cell.iso) ?? [];
          const isToday = cell.iso === todayIso;
          const isSelected = cell.iso === selectedDate;
          const dayOfWeek = cell.date.getDay();

          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => onSelectDate(isSelected ? null : cell.iso)}
              aria-pressed={isSelected}
              aria-label={`${cell.date.getMonth() + 1}월 ${cell.date.getDate()}일, 이벤트 ${dayEvents.length}건`}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg transition relative ${
                isSelected
                  ? "bg-[var(--color-accent)] text-white"
                  : "hover:bg-[var(--color-surface-sunken)] text-kream-black"
              }`}
            >
              <span
                className={`text-sm tnum leading-none ${
                  isSelected
                    ? "font-bold"
                    : dayOfWeek === 0
                    ? "text-[var(--color-accent)] font-semibold"
                    : dayOfWeek === 6
                    ? "text-[var(--color-brand)] font-semibold"
                    : "font-medium"
                }`}
              >
                {cell.date.getDate()}
              </span>
              {isToday && !isSelected && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" aria-hidden />
              )}
              {dayEvents.length > 0 && (
                <span className="flex gap-0.5 mt-1" aria-hidden>
                  {dayEvents.slice(0, 3).map((ev, i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{
                        background: isSelected
                          ? "rgba(255,255,255,0.9)"
                          : categoryColors[ev.category] ?? "var(--color-brand)",
                      }}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
