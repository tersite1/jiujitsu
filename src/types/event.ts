export type EventCategory = 'seminar' | 'competition' | 'open-mat' | 'workshop';

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  seminar: '세미나', competition: '대회', 'open-mat': '오픈매트', workshop: '워크샵'
};

export interface BJJEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  address: string;
  imageUrl: string;
  instructor?: string;
  instructorTitle?: string;
  price: string;
  description: string;
  capacity?: number;
  registered?: number;
  tags: string[];
}
