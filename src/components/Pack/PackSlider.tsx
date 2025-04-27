import { Pack } from './Pack';
import { useState } from 'react';
import { IconButton } from '@telegram-apps/telegram-ui';
import { PackCard } from './PackCard';


export interface PackSliderProps {
  packs: Pack[];
  onOpenPack: (packId: string) => void;
  onBuyPack: (packId: string) => void;
}

export const PackSlider = ({ packs, onOpenPack, onBuyPack }: PackSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev === packs.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? packs.length - 1 : prev - 1));
  };

  const currentPack = packs[currentIndex];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IconButton 
        aria-label="Previous pack" 
        onClick={goPrev}
      >
        ←
      </IconButton>

      <PackCard
        pack={currentPack}
        onOpen={currentPack.type !== 'empty' ? () => onOpenPack(currentPack.id) : undefined}
        onBuy={() => onBuyPack(currentPack.id)}
      />

      <IconButton 
        aria-label="Next pack" 
        onClick={goNext}
      >
        →
      </IconButton>
    </div>
  );
};