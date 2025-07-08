import React from 'react';
import CollectionCard from '@/components/Card/Card';
import { DetailedPlayerCard } from '@/services/gameStateService';
import './CardGrid.css';

interface CardGridProps {
  cards: DetailedPlayerCard[];
  onCardClick: (cardId: number) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CollectionCard
            key={card.id}
            name={card.name}
            image={card.imageUrl}
            type={'car'} // TODO: Get this from cardTypeId
            rarity={card.rarity}
            quantity={card.quantity}
            onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}; 