import { BeltLevel, WeightClass, IntensityPreference, Region } from './common';

export interface Practitioner {
  id: string;
  name: string;
  age: number;
  beltLevel: BeltLevel;
  stripes: number;
  weightClass: WeightClass;
  weightKg: number;
  region: Region;
  gym: string;
  experience: string;
  trainFrequency: string;
  intensityPreference: IntensityPreference;
  preferredSchedule: string[];
  bio: string;
  avatarUrl: string;
  isAvailable: boolean;
}
