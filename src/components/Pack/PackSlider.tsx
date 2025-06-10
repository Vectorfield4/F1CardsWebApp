import { Pack } from './Pack';
import { useState } from 'react';
import InfoCard from '../Card/info-card';


export interface PackSliderProps {
  packs: Pack[];
  onOpenPack: (packId: string) => void;
  onBuyPack: (packId: string) => void;
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
        <img src='../assets/icons/LArrow.svg'
          alt="Previous pack"
          aria-label="Previous pack"
          style={{ 
            ...arrowStyles,
            left: '12px',
            marginLeft: '12px',
          }}
          onClick={goPrev}
        />

        <img 
          src={currentPack.image} 
          alt={currentPack.name} 
          width={'231px'}
          height={'277px'}
          style={{ objectFit: 'cover' }}
          onClick={currentPack.type !== 'empty' ? () => onOpenPack(currentPack.id) : undefined}
        />

        <img src='../assets/icons/RArrow.svg'
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
        <h2 style={{ marginBottom: '8px' }}>{currentPack.name}</h2>
        <span>В наличии: {currentPack.availableCount ?? 1}шт. </span>
        <span style={{ color: '#F2C869' }} onClick={currentPack.type !== 'empty' ? () => onBuyPack(currentPack.id) : undefined}>Купить больше →</span>
      </div>

    </div>
    <InfoCard />
  </>
)};
