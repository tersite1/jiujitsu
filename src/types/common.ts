export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';
export type WeightClass = 'rooster' | 'light-feather' | 'feather' | 'light' | 'middle' | 'medium-heavy' | 'heavy' | 'super-heavy' | 'ultra-heavy';
export type IntensityPreference = 'light' | 'medium' | 'hard';
export type Region = '강남' | '서초' | '송파' | '마포' | '종로' | '홍대' | '신촌' | '건대' | '잠실';

export const BELT_LABELS: Record<BeltLevel, string> = {
  white: '화이트', blue: '블루', purple: '퍼플', brown: '브라운', black: '블랙'
};

export const WEIGHT_LABELS: Record<WeightClass, string> = {
  'rooster': '루스터', 'light-feather': '라이트페더', 'feather': '페더',
  'light': '라이트', 'middle': '미들', 'medium-heavy': '미디엄헤비',
  'heavy': '헤비', 'super-heavy': '슈퍼헤비', 'ultra-heavy': '울트라헤비'
};

export const INTENSITY_LABELS: Record<IntensityPreference, string> = {
  light: '가볍게', medium: '보통', hard: '세게'
};

export const BELT_COLORS: Record<BeltLevel, string> = {
  white: '#E0E0E0', blue: '#1E88E5', purple: '#8E24AA', brown: '#795548', black: '#222222'
};

export const INTENSITY_COLORS: Record<IntensityPreference, string> = {
  light: '#4CAF50', medium: '#FF9800', hard: '#EF6253'
};
