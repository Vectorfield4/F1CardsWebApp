import React from 'react';
import './CollectionHeader.css';

interface CollectionHeaderProps {
  collectionName: string;
  cardsOwned: number;
  cardsTotal: number;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  collectionName,
  cardsOwned,
  cardsTotal,
}) => {
  return (
    <div className="collection-header-container">
      <h2 className="collection-header-title">Коллекция "{collectionName}"</h2>
      <p className="collection-header-stats">
        Собрано <strong>{cardsOwned} из {cardsTotal} карт</strong> коллекции
      </p>
    </div>
  );
}; 