export type Experience = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  city?: string;
  createdAt?: string;
  updatedAt?: string;
  slots?: Slot[];
};

export type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  totalCapacity: number;
  bookedCapacity: number;
  experienceId?: string;
};
