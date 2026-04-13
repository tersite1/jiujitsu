export const APP_NAME = '매치핏';

export const REGIONS = ['강남', '서초', '송파', '마포', '종로', '홍대', '신촌', '건대', '잠실'] as const;

export const NAV_ITEMS = [
  { label: '홈', href: '/', icon: 'Home' },
  { label: '오픈매트', href: '/openmat', icon: 'Calendar' },
  { label: '채팅', href: '/chat', icon: 'MessageCircle' },
  { label: '마이', href: '/profile', icon: 'User' },
] as const;
