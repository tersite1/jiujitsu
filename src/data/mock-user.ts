import { Practitioner } from '@/types/practitioner';

export const currentUser: Practitioner = {
  id: 'user-self',
  name: '김지훈',
  age: 27,
  beltLevel: 'white',
  stripes: 3,
  weightClass: 'light',
  weightKg: 76,
  region: '강남',
  gym: '그래플링 아카데미 강남',
  experience: '1년 8개월',
  trainFrequency: '주 4회',
  intensityPreference: 'medium',
  preferredSchedule: ['평일 저녁', '주말 오전'],
  bio: '다양한 스타일의 수련자와 스파링하며 실력을 키우고 싶습니다. 특히 가드 플레이에 관심이 많습니다. 클로즈드 가드에서 스윕과 서브미션 연결을 집중 연습 중입니다.',
  avatarUrl: '/avatars/user.svg',
  isAvailable: true,
};

export const userStats = {
  totalSparring: 24,
  thisWeekSparring: 3,
  openmatAttended: 8,
  openmatThisMonth: 2,
  favoriteGyms: 3,
  reviewsWritten: 5,
  joinDate: '2024-08-15',
  streak: 12,
  totalTrainingDays: 156,
};

export const userActivity = [
  { date: '2026-04-12', type: 'training', label: '정규 수업', gym: '그래플링 아카데미 강남' },
  { date: '2026-04-11', type: 'training', label: '정규 수업', gym: '그래플링 아카데미 강남' },
  { date: '2026-04-10', type: 'sparring', label: '스파링 세션', gym: '그래플링 아카데미 강남' },
  { date: '2026-04-06', type: 'openmat', label: '오픈매트 참여', gym: '홍대 주짓수' },
  { date: '2026-04-05', type: 'training', label: '정규 수업', gym: '그래플링 아카데미 강남' },
];

export const userBadges = [
  { id: 'b1', label: '첫 오픈매트', icon: '🥋', earned: true },
  { id: 'b2', label: '5회 스파링', icon: '🔥', earned: true },
  { id: 'b3', label: '첫 리뷰', icon: '✍️', earned: true },
  { id: 'b4', label: '3개 도장 방문', icon: '🗺️', earned: true },
  { id: 'b5', label: '연속 7일', icon: '⚡', earned: false },
  { id: 'b6', label: '50회 스파링', icon: '🏆', earned: false },
];
