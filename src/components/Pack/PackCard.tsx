import React from 'react';

interface CardSet {
  id: string;
  name: string;
}

interface PackCardProps {
  cardSet: CardSet;
  isOwned: boolean;
  onOpenPack?: (packId: string) => void;
  onBuyPack?: () => void;
}

export const PackCard: React.FC<PackCardProps> = ({ cardSet, isOwned, onOpenPack, onBuyPack }) => {
  const handleClick = () => {
    if (isOwned && onOpenPack) onOpenPack(cardSet.id);
    if (!isOwned && onBuyPack) onBuyPack();
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
          onClick={onBuyPack}
        >
          Перейти в магазин →
        </span>
      )}
    </div>
  );
};