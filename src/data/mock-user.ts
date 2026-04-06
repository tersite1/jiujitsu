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
  bio: '다양한 스타일의 수련자와 스파링하며 실력을 키우고 싶습니다. 특히 가드 플레이에 관심이 많습니다.',
  avatarUrl: '/avatars/user.svg',
  isAvailable: true,
};
