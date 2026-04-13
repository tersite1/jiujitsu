export interface OpenMat {
  id: string;
  gymId: string;
  gymName: string;
  gymImageUrl: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: string;
  capacity: number;
  registered: number;
  tags: string[];
  description: string;
  isRecurring?: boolean;
  recurringNote?: string;
}
