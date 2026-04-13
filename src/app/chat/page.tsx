"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import { chatRooms } from "@/data/mock-chats";
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

const statusConfig = {
  confirmed: { label: "확정", color: "#31B46E", icon: CheckCircle },
  pending: { label: "대기중", color: "#FF9800", icon: Clock },
  cancelled: { label: "취소됨", color: "#EF6253", icon: AlertCircle },
};

export default function ChatPage() {
  const roomsWithReservation = chatRooms.filter((r) => r.hasReservation);
  const roomsWithoutReservation = chatRooms.filter((r) => !r.hasReservation);

  return (
    <AppShell>
      <TopBar title="채팅" />

      <div className="px-4 pt-4 pb-4 space-y-5">
        {/* Active Reservations */}
        {roomsWithReservation.length > 0 && (
          <section>
            <h2 className="section-header mb-3">예약 현황</h2>
            <div className="space-y-2">
              {roomsWithReservation.map((room) => {
                const status = statusConfig[room.reservationStatus!];
                const StatusIcon = status.icon;
                const dateObj = room.reservationDate ? new Date(room.reservationDate) : null;
                const dateLabel = dateObj
                  ? `${dateObj.getMonth() + 1}/${dateObj.getDate()}(${["일","월","화","수","목","금","토"][dateObj.getDay()]})`
                  : "";
                return (
                  <Link key={room.id} href={`/chat/${room.id}`}>
                    <Card padding="sm" className="mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-kream-bg overflow-hidden shrink-0">
                          <img src={room.gymImageUrl} alt={room.gymName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-[#111] truncate">{room.gymName}</p>
                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              <StatusIcon size={12} style={{ color: status.color }} />
                              <span className="text-[11px] font-semibold" style={{ color: status.color }}>
                                {status.label}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar size={11} className="text-[#333] shrink-0" />
                            <span className="text-[11px] text-kream-gray">
                              {dateLabel} {room.reservationTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Chat List */}
        <section>
          <h2 className="section-header mb-3">메시지</h2>
          <div className="space-y-0">
            {chatRooms.map((room) => (
              <Link key={room.id} href={`/chat/${room.id}`}>
                <div className="flex items-center gap-3 py-3.5 border-b border-kream-border">
                  {/* Gym avatar */}
                  <div className="w-12 h-12 rounded-full bg-kream-bg overflow-hidden shrink-0">
                    <img src={room.gymImageUrl} alt={room.gymName} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[#111] truncate">{room.gymName}</p>
                      <span className="text-[11px] text-kream-lightgray shrink-0 ml-2">
                        {room.lastMessageTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[12px] text-kream-gray truncate">{room.lastMessage}</p>
                      {room.unreadCount > 0 && (
                        <span className="shrink-0 ml-2 w-[18px] h-[18px] bg-[#EF6253] rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">{room.unreadCount}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
