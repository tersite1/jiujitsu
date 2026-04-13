export interface ChatRoom {
  id: string;
  gymId: string;
  gymName: string;
  gymImageUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  hasReservation: boolean;
  reservationDate?: string;
  reservationTime?: string;
  reservationStatus?: 'pending' | 'confirmed' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: 'user' | 'gym';
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'reservation' | 'system';
  reservationInfo?: {
    date: string;
    time: string;
    type: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  };
}

export const chatRooms: ChatRoom[] = [
  {
    id: 'cr1', gymId: 'g1', gymName: '그래플링 아카데미 강남',
    gymImageUrl: '/gyms/gym1.svg',
    lastMessage: '일요일 오픈매트 참가 확정되었습니다!',
    lastMessageTime: '오후 2:30',
    unreadCount: 1,
    hasReservation: true,
    reservationDate: '2026-04-13',
    reservationTime: '13:00-16:00',
    reservationStatus: 'confirmed',
  },
  {
    id: 'cr2', gymId: 'g5', gymName: '홍대 주짓수',
    gymImageUrl: '/gyms/gym5.svg',
    lastMessage: '드랍인 비용은 25,000원입니다.',
    lastMessageTime: '오전 11:20',
    unreadCount: 0,
    hasReservation: false,
  },
  {
    id: 'cr3', gymId: 'g2', gymName: '코리안탑팀 송파',
    gymImageUrl: '/gyms/gym2.svg',
    lastMessage: '토요일 No-Gi 오픈매트 신청 완료되었습니다.',
    lastMessageTime: '어제',
    unreadCount: 0,
    hasReservation: true,
    reservationDate: '2026-04-19',
    reservationTime: '15:00-18:00',
    reservationStatus: 'confirmed',
  },
  {
    id: 'cr4', gymId: 'g3', gymName: 'Carpe Diem Tokyo',
    gymImageUrl: '/gyms/gym3.svg',
    lastMessage: 'Drop-in is welcome! See you on Sunday.',
    lastMessageTime: '4/10',
    unreadCount: 0,
    hasReservation: true,
    reservationDate: '2026-04-20',
    reservationTime: '14:00-17:00',
    reservationStatus: 'pending',
  },
  {
    id: 'cr5', gymId: 'g6', gymName: 'ATOS Bangkok',
    gymImageUrl: '/gyms/gym6.svg',
    lastMessage: '숙소 연계 프로그램 안내 드립니다.',
    lastMessageTime: '4/8',
    unreadCount: 0,
    hasReservation: false,
  },
];

export const chatMessages: ChatMessage[] = [
  // Room cr1 - 그래플링 아카데미 강남
  {
    id: 'm1', roomId: 'cr1', sender: 'user', senderName: '김지훈',
    content: '안녕하세요, 이번 일요일 오픈매트 참가하고 싶습니다.',
    timestamp: '2026-04-13 13:00', type: 'text',
  },
  {
    id: 'm2', roomId: 'cr1', sender: 'gym', senderName: '그래플링 아카데미 강남',
    content: '안녕하세요! 환영합니다. 오픈매트는 13:00-16:00에 진행됩니다.',
    timestamp: '2026-04-13 13:15', type: 'text',
  },
  {
    id: 'm3', roomId: 'cr1', sender: 'gym', senderName: '그래플링 아카데미 강남',
    content: '', timestamp: '2026-04-13 13:16', type: 'reservation',
    reservationInfo: {
      date: '2026-04-13', time: '13:00-16:00',
      type: '오픈매트', status: 'confirmed',
    },
  },
  {
    id: 'm4', roomId: 'cr1', sender: 'gym', senderName: '그래플링 아카데미 강남',
    content: '일요일 오픈매트 참가 확정되었습니다!',
    timestamp: '2026-04-13 14:30', type: 'text',
  },
  {
    id: 'm5', roomId: 'cr1', sender: 'user', senderName: '김지훈',
    content: '감사합니다! 도복 대여도 가능한가요?',
    timestamp: '2026-04-13 14:32', type: 'text',
  },

  // Room cr2 - 홍대 주짓수
  {
    id: 'm6', roomId: 'cr2', sender: 'user', senderName: '김지훈',
    content: '드랍인 비용이 어떻게 되나요?',
    timestamp: '2026-04-13 10:00', type: 'text',
  },
  {
    id: 'm7', roomId: 'cr2', sender: 'gym', senderName: '홍대 주짓수',
    content: '드랍인 비용은 25,000원입니다. 도복 대여는 무료로 가능합니다.',
    timestamp: '2026-04-13 11:20', type: 'text',
  },

  // Room cr3 - 코리안탑팀 송파
  {
    id: 'm8', roomId: 'cr3', sender: 'user', senderName: '김지훈',
    content: '토요일 No-Gi 오픈매트 신청합니다.',
    timestamp: '2026-04-12 18:00', type: 'text',
  },
  {
    id: 'm9', roomId: 'cr3', sender: 'gym', senderName: '코리안탑팀 송파',
    content: '토요일 No-Gi 오픈매트 신청 완료되었습니다. 래쉬가드와 쇼츠 지참 부탁드립니다.',
    timestamp: '2026-04-12 18:30', type: 'text',
  },
  {
    id: 'm10', roomId: 'cr3', sender: 'gym', senderName: '코리안탑팀 송파',
    content: '', timestamp: '2026-04-12 18:31', type: 'reservation',
    reservationInfo: {
      date: '2026-04-19', time: '15:00-18:00',
      type: 'No-Gi 오픈매트', status: 'confirmed',
    },
  },
];
