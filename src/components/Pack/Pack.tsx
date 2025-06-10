export interface Pack {
    availableCount: number;
    id: string;
    name: string;
    image?: string;  // undefined для заглушки
    type: 'free' | 'premium' | 'empty';
    ownedCount?: number; // Только для premium-паков
  }
