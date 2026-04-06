export const APP_NAME = '매치핏';

export const REGIONS = ['강남', '서초', '송파', '마포', '종로', '홍대', '신촌', '건대', '잠실'] as const;

export const NAV_ITEMS = [
  { label: '홈', href: '/', icon: 'Home' },
  { label: '매칭', href: '/matching', icon: 'Users' },
  { label: '도장', href: '/gyms', icon: 'MapPin' },
  { label: '이벤트', href: '/events', icon: 'Calendar' },
  { label: '프로필', href: '/profile', icon: 'User' },
] as const;
