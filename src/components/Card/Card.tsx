import React from 'react';

export type GameCardRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type GameCardType = 'car' | 'driver';
export type PlayerCard = {
  name: string;
  image: string;
  type: GameCardType;
  rarity: GameCardRarity;
  quantity: number;
  onClick?: () => void;
};

const CollectionCard: React.FC<PlayerCard> = ({ name, image, type, rarity, quantity, onClick }) => {
  const rarityStyles = {
    common: { border: '1px solid gray' },
    rare: { border: '1px solid blue' },
    epic: { border: '1px solid purple' },
    legendary: { border: '1px solid gold' },
  };

  return (
    <div onClick={onClick} style={{
      cursor: onClick ? 'pointer' : 'default',
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px' 
    }}>
      <div style={{ ...rarityStyles[rarity], padding: '2px', borderRadius: '2px' }}>
        <img src={image} alt={name} style={{ width: '175px', height: '233px' }} />
      </div>
      <p style={{ margin: '0' }}>
        <span style={{ fontWeight: 'bold' }}>{type}</span>
        <br />
        <span style={{ marginTop: '10px' }}>{name}</span>
        <br />
        <span style={{ marginTop: '5px' }}>{quantity}шт.</span>
      </p>
    </div>
  );
};

export default CollectionCard;

