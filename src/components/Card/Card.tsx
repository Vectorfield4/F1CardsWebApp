import React from 'react';

export type GameCardRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type GameCardType = 'car' | 'driver';
export type GameCardProps = {
  name: string;
  image: string;
  type: GameCardType;
  rarity: GameCardRarity;
};

const CollectionCard: React.FC<GameCardProps> = ({ name, image, type, rarity }) => {
  const rarityStyles = {
    common: { border: '1px solid gray' },
    rare: { border: '1px solid blue' },
    epic: { border: '1px solid purple' },
    legendary: { border: '1px solid gold' },
  };

  return (
    <div style={{ ...rarityStyles[rarity], padding: '10px', borderRadius: '5px' }}>
      <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Rarity: {rarity}</p>
    </div>
  );
};

export default CollectionCard;

