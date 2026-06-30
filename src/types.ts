export interface Profile {
  id: number;
  name: string;
  age: number;
  height: string;
  measurements: string;
  eyeColor: string;
  zone: string;
  schedule: string;
  description: string;
  phone: string;
  acceptsWhatsapp: boolean;
  images: string[];
  videos?: string[];
  isActive?: boolean;
  category?: 'EXCELLENCE' | 'PLUS' | 'CLASSIC';
  isNew?: boolean;
  orderPosition?: number;
}
