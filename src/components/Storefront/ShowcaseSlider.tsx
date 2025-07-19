import { useState, useEffect } from 'react';
import { useShowcaseStore } from '@/store/showcaseStore';
import { ArrowButton } from '@/components/ArrowButton';
import { ShowcaseImage } from './ShowcaseImage';
import { Rings } from './Rings';
import { Partials } from './Partials';
import { StorefrontClosed } from './StorefrontClosed';
import { PackInfo } from '../Pack/PackInfo';

export interface ShowcaseSliderProps {
  onOpenPack: (packId: string) => void;
  onBuyPack: (packId: string) => void;
}

const styles = {
  showcaseSlider: {
    position: 'relative' as const,
    overflow: 'hidden',
    isolation: 'isolate' as const,
    minHeight: '400px',
    color: 'white',
  },
  showcaseSliderContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    width: '100%',
    overflow: 'hidden',
    zIndex: 5,
    paddingBottom: '16px',
  },
};

export const ShowcaseSlider = ({ onOpenPack, onBuyPack }: ShowcaseSliderProps) => {
  const { showcases } = useShowcaseStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Сбрасываем индекс при изменении данных
  useEffect(() => {
    setCurrentIndex(0);
  }, [showcases.length]);

  if (!showcases.length)
    return <StorefrontClosed />;

  const goNext = () => {
    setCurrentIndex((prev) => (prev === showcases.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? showcases.length - 1 : prev - 1));
  };

  const currentShowcase = showcases[currentIndex];
  if (!currentShowcase)
    return <StorefrontClosed />;

  return (
    <div id='showcaseSlider' style={styles.showcaseSlider}>
      <Partials />
      <Rings />

      <div style={styles.showcaseSliderContent}>
        <ArrowButton direction="left" onClick={goPrev} />
        <ShowcaseImage
          showcase={currentShowcase}
          onOpenPack={onOpenPack}
          onBuyPack={onBuyPack}
        />
        <ArrowButton direction="right" onClick={goNext} />
      </div>

      <PackInfo pack={currentShowcase.cardSet} />
    </div>
  );
};
