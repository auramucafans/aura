import { Profile } from './types';

const baseDescription = 'Una mujer apasionada por los pequeños detalles, amante del buen vino y las conversaciones profundas. Dispuesta a brindarte un momento único de relajación y conexión, con absoluta elegancia y reserva. Un encuentro diseñado para que olvides el estrés y disfrutes del placer en su máxima expresión.';

const femaleImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&q=80&w=800'
];

export const PROFILES: Profile[] = [
  // EXCELLENCE (10)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Mía ${i + 1}`,
    age: 20 + i,
    height: '1.70m',
    measurements: '90-60-90',
    eyeColor: 'Marrones',
    zone: 'Puerto Madero',
    schedule: '10:00 a 22:00 hs',
    description: baseDescription,
    phone: '+54 9 11 1234-0000',
    acceptsWhatsapp: true,
    images: [femaleImages[i % femaleImages.length], femaleImages[(i + 1) % femaleImages.length]],
    videos: i % 2 === 0 ? ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'] : [],
    category: 'EXCELLENCE' as const,
    isActive: true
  })),
  // PLUS (10)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 11,
    name: `Valeria ${i + 1}`,
    age: 22 + i,
    height: '1.65m',
    measurements: '92-62-92',
    eyeColor: 'Miel',
    zone: 'Palermo',
    schedule: '12:00 a 00:00 hs',
    description: baseDescription,
    phone: '+54 9 11 1234-1111',
    acceptsWhatsapp: true,
    images: [femaleImages[(i + 2) % femaleImages.length]],
    category: 'PLUS' as const,
    isActive: true
  })),
  // CLASSIC (10)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 21,
    name: `Sofía ${i + 1}`,
    age: 24 + i,
    height: '1.60m',
    measurements: '88-60-90',
    eyeColor: 'Verdes',
    zone: 'Recoleta',
    schedule: '14:00 a 02:00 hs',
    description: baseDescription,
    phone: '+54 9 11 1234-2222',
    acceptsWhatsapp: true,
    images: [femaleImages[(i + 4) % femaleImages.length]],
    category: 'CLASSIC' as const,
    isActive: true
  }))
];
