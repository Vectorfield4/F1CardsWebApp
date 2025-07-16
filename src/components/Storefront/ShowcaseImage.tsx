import React from 'react';
import type { MainScreenShowcaseItem } from '@/services/queries';

interface ShowcaseImageProps {
  showcase: MainScreenShowcaseItem;
  onOpenPack?: (packId: string) => void;
  onBuyPack?: (packId: string) => void;
}

export const ShowcaseImage: React.FC<ShowcaseImageProps> = ({ showcase, onOpenPack, onBuyPack }) => {
  const { cardSet, isOwned } = showcase;
  const handleClick = () => {
    if (isOwned && onOpenPack) onOpenPack(cardSet.id);
    if (!isOwned && onBuyPack) onBuyPack(cardSet.id);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={"../assets/demo/pack1.png"}
        alt={cardSet.name}
        width={231}
        height={277}
        style={{
          objectFit: 'cover',
          cursor: isOwned ? 'pointer' : 'default',
        }}
        onClick={handleClick}
      />
      <h2 style={{ marginBottom: '8px' }}>{cardSet.name}</h2>
      {isOwned ? (
        <span style={{ color: '#7CFC00' }}>Владеет</span>
      ) : (
        <span
          style={{ color: '#F2C869', cursor: 'pointer' }}
          onClick={() => onBuyPack && onBuyPack(cardSet.id)}
        >
          Перейти в магазин →
        </span>
      )}
    </div>
  );
}; 