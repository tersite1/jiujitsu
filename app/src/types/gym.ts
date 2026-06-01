export interface GymInstructor {
  name: string;
  title: string;
  specialty: string;
}

export interface GymSchedule {
  day: string;
  classes: string[];
}

export interface Gym {
  id: string;
  name: string;
  nameEn?: string;
  country: string;
  city: string;
  address: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  dropInAvailable: boolean;
  dropInPrice?: string;
  languageSupport: string[];
  atmosphere: string[];
  hours: string;
  phone?: string;
  instagram?: string;
  tags: string[];
  description?: string;
  facilities?: string[];
  instructors?: GymInstructor[];
  schedule?: GymSchedule[];
  memberCount?: number;
}

export interface GymReview {
  id: string;
  gymId: string;
  authorName: string;
  authorBelt: string;
  rating: number;
  date: string;
  content: string;
}
