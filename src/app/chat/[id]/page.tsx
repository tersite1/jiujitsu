"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import TopBar from "@/components/layout/TopBar";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Toast from "@/components/shared/Toast";
import { chatRooms, chatMessages } from "@/data/mock-chats";
import { Send, Calendar, CheckCircle, Clock, AlertCircle, MapPin, Info } from "lucide-react";

const statusConfig = {
  confirmed: { label: "확정", color: "#31B46E", icon: CheckCircle, bg: "#31B46E18" },
  pending: { label: "대기중", color: "#FF9800", icon: Clock, bg: "#FF980018" },
  cancelled: { label: "취소됨", color: "#EF6253", icon: AlertCircle, bg: "#EF625318" },
};

export default function ChatDetailPage() {
  const params = useParams();
  const [inputValue, setInputValue] = useState("");
  const [showToast, setShowToast] = useState(false);

  const room = chatRooms.find((r) => r.id === params.id);
  const messages = chatMessages.filter((m) => m.roomId === params.id);

  if (!room) {
    return (
      <AppShell>
        <TopBar title="채팅" showBack />
        <div className="p-8 text-center text-kream-gray">채팅방을 찾을 수 없습니다</div>
      </AppShell>
    );
  }

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
    setShowToast(true);
  };

  return (
    <AppShell>
      <TopBar
        title={room.gymName}
        showBack
        rightAction={
          <button className="p-1.5">
            <Info size={20} className="text-[#222]" />
          </button>
        }
      />

      <div className="pb-[140px]">
        {/* Reservation Banner */}
        {room.hasReservation && room.reservationStatus && (
          <div className="px-4 pt-3">
            <Card padding="sm" className="bg-kream-bg border-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-kream-bg">
                  <Calendar size={18} className="text-[#222]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#111]">예약 정보</span>
                    {(() => {
                      const status = statusConfig[room.reservationStatus!];
                      const StatusIcon = status.icon;
                      return (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: status.bg, color: status.color }}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      );
                    })()}
                  </div>
                  {room.reservationDate && (
                    <p className="text-[11px] text-kream-gray mt-0.5">
                      {(() => {
                        const d = new Date(room.reservationDate);
                        return `${d.getMonth() + 1}/${d.getDate()}(${["일","월","화","수","목","금","토"][d.getDay()]}) ${room.reservationTime}`;
                      })()}
                    </p>
                  )}
                </div>
                <MapPin size={14} className="text-kream-gray shrink-0" />
              </div>
            </Card>
          </div>
        )}

        {/* Messages */}
        <div className="px-4 pt-4 space-y-3">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            // Reservation card
            if (msg.type === "reservation" && msg.reservationInfo) {
              const rStatus = statusConfig[msg.reservationInfo.status];
              const RIcon = rStatus.icon;
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <Card padding="sm" className="w-full max-w-[280px] bg-kream-bg border-none">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Calendar size={14} className="text-[#222]" />
                        <span className="text-xs font-bold text-[#111]">예약</span>
                      </div>
                      <p className="text-sm font-bold text-[#111]">{msg.reservationInfo.type}</p>
                      <p className="text-[11px] text-kream-gray mt-1">
                        {(() => {
                          const d = new Date(msg.reservationInfo!.date);
                          return `${d.getMonth() + 1}/${d.getDate()}(${["일","월","화","수","목","금","토"][d.getDay()]})`;
                        })()} {msg.reservationInfo.time}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <RIcon size={12} style={{ color: rStatus.color }} />
                        <span className="text-[11px] font-semibold" style={{ color: rStatus.color }}>
                          {rStatus.label}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            }

            // System message
            if (msg.type === "system") {
              return (
                <div key={msg.id} className="flex justify-center">
                  <span className="text-[11px] text-kream-lightgray bg-kream-bg px-3 py-1 rounded-full">
                    {msg.content}
                  </span>
                </div>
              );
            }

            // Text bubble
            const time = msg.timestamp.split(" ")[1];
            return (
              <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-kream-bg overflow-hidden shrink-0 mt-1">
                    <img src={room.gymImageUrl} alt={room.gymName} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`max-w-[70%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
                  {!isUser && (
                    <span className="text-[10px] text-kream-gray mb-0.5 ml-1">{msg.senderName}</span>
                  )}
                  <div
                    className={`px-3 py-2.5 text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#222] text-white rounded-2xl rounded-tr-md"
                        : "bg-kream-bg text-[#111] rounded-2xl rounded-tl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className={`text-[10px] text-kream-lightgray mt-0.5 ${isUser ? "mr-1" : "ml-1"}`}>
                    {time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#E0E0E0] z-30 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요..."
            className="flex-1 h-10 px-4 bg-kream-bg rounded-full text-sm text-kream-black placeholder:text-kream-lightgray outline-none focus:ring-1 focus:ring-[#222]"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <Send size={16} className="text-white ml-0.5" />
          </button>
        </div>
      </div>

      <Toast
        message="메시지가 전송되었습니다"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </AppShell>
  );
}
