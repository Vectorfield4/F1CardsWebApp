import type { MainScreenShowcaseItem } from '@/services/queries';
import { useState } from 'react';
import InfoCard from '../Card/info-card';

export interface PackSliderProps {
  packs: MainScreenShowcaseItem[];
  onOpenPack: (packId: string) => void;
  onBuyPack: () => void;
}

export const Rings = () => <div id="rings" style={{ 
  position:'absolute', 
  backgroundImage: 'url(../assets/bg/rings.svg)',
  height: '100%',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: -1
}}></div>;

export const Partials = () => <div id="partials" style={{ 
  position:'absolute', 
  height: '100%', 
  width: '100%', 
  backgroundImage: 'url(../assets/bg/partials.svg)',
  zIndex: -1,
  backgroundRepeat: 'round',
  backgroundPosition: 'center'
}}></div>;

export const PackSlider = ({ packs, onOpenPack, onBuyPack }: PackSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev === packs.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? packs.length - 1 : prev - 1));
  };

  const currentPack = packs[currentIndex];
  const canOpenPack = currentPack.isOwned;

  const arrowStyles: React.CSSProperties = {
    position: 'absolute' as const,
    width: '34px',
    height: '34px',
    cursor: 'pointer',
  };

  return (
    <>
      <div id='packSlider' style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        minHeight: '400px',
        color: 'white'
      }}>
        <Partials />
        <Rings />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px',
          width: '100%', 
          overflow: 'hidden',
          zIndex: 5, 
          paddingBottom: '16px' 
        }}>
          <img src="https://s3.twcstorage.ru/1daee0b6-4b362c06-45a2-4fa0-b1aa-f30cd02cde29/icons/LArrow.svg"
            alt="Previous pack"
            aria-label="Previous pack"
            style={{ 
              ...arrowStyles,
              left: '12px',
              marginLeft: '12px',
            }}
            onClick={goPrev}
          />

          {/* Нет imageUrl в MainScreenShowcaseItem, поэтому используем заглушку */}
          <img 
            src={"../assets/demo/pack1.png"} 
            alt={currentPack.cardSet.name} 
            width={'231px'}
            height={'277px'}
            style={{ 
              objectFit: 'cover',
              cursor: canOpenPack ? 'pointer' : 'default',
            }}
            onClick={canOpenPack ? () => onOpenPack(currentPack.cardSet.id) : undefined}
          />

          <img src="https://s3.twcstorage.ru/1daee0b6-4b362c06-45a2-4fa0-b1aa-f30cd02cde29/icons/RArrow.svg"
            aria-label="Next pack"
            alt="Next pack"
            onClick={goNext} 
            style={{ 
              ...arrowStyles,
              right: '12px',
              width: '28px',
              height: '28px',
              marginRight: '12px',
            }} 
          />
        </div>

        <div style={{ textAlign: 'center', position: 'absolute', bottom: '10px', width: '100%' }}>
          <h2 style={{ marginBottom: '8px' }}>{currentPack.cardSet.name}</h2>
          {currentPack.isOwned ? (
            <span style={{ color: '#7CFC00' }}>Владеет</span>
          ) : (
            <span 
              style={{ color: '#F2C869', cursor: 'pointer' }}
              onClick={onBuyPack}
            >
              Перейти в магазин →
            </span>
          )}
        </div>
      </div>
      <InfoCard />
    </>
  );
};
