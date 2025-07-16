import React from 'react';
import CollectionCard from '@/components/Card/Card';
import { CollectionCard as CollectionCardType } from '@/services/queries';

import './CardGrid.css';

interface CardGridProps {
  cards: CollectionCardType[];
  onCardClick: (cardId: number) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CollectionCard
            key={card.id}
            name={card.name}
            image={card.previewUrls[0] || ''}
            type={'car'} // TODO: Get this from cardTypeId
            rarity={'common'} // TODO: преобразовать rarityId в строку (common/rare/epic/legendary)
            quantity={card.quantity}
            onClick={() => onCardClick(Number(card.id))}
        />
      ))}
    </div>
  );
}; 