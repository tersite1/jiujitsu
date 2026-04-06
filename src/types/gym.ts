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
