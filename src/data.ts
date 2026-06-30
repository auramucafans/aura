import { Profile } from './types';
import profileImage from './assets/images/profile_placeholder_1782079367811.jpg';

const baseDescription = 'Una mujer apasionada por los pequeños detalles, amante del buen vino y las conversaciones profundas. Dispuesta a brindarte un momento único de relajación y conexión, con absoluta elegancia y reserva. Un encuentro diseñado para que olvides el estrés y disfrutes del placer en su máxima expresión.';

export const PROFILES: Profile[] = [
  // EXCELLENCE (10)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Excellence Model ${i + 1}`,
    age: 20 + i,
    height: '1.70m',
    measurements: '90-60-90',
    eyeColor: 'Marrones',
    zone: 'Puerto Madero',
    schedule: '10:00 a 22:00 hs',
    description: baseDescription,
    phone: '+54 9 11 1234-0000',
    acceptsWhatsapp: true,
    images: [profileImage, profileImage],
    category: 'EXCELLENCE' as const,
    isActive: true
  })),
  // PLUS (10)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 11,
    name: `Plus Model ${i + 1}`,
    age: 22 + i,
    height: '1.65m',
    measurements: '92-62-92',
    eyeColor: 'Miel',
    zone: 'Palermo',
    schedule: '12:00 a 00:00 hs',
    description: baseDescription,
    phone: '+54 9 11 1234-1111',
    acceptsWhatsapp: true,
    images: [profileImage],
    category: 'PLUS' as const,
    isActive: true
  })),
  // CLASSIC (10)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 21,
    name: `Classic Model ${i + 1}`,
    age: 24 + i,
    height: '1.60m',
    measurements: '88-60-90',
    eyeColor: 'Verdes',
    zone: 'Recoleta',
    schedule: '14:00 a 02:00 hs',
    description: baseDescription,
    phone: '+54 9 11 1234-2222',
    acceptsWhatsapp: true,
    images: [profileImage],
    category: 'CLASSIC' as const,
    isActive: true
  }))
];
