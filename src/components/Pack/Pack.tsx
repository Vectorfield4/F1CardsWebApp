export interface Pack {
    id: string;
    name: string;
    image?: string;  // undefined для заглушки
    type: 'free' | 'premium' | 'empty';
    ownedCount?: number; // Только для premium-паков
  }
