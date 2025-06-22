import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Cell, Section } from '@telegram-apps/telegram-ui';
import { PlayerCard } from '@/components/Card/Card';

export const UpgradeCardPage: React.FC = () => {
  const { id } = useParams();

  const card: PlayerCard = {
    type: 'car',
    name: 'Upgrade card',
    image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
    rarity: 'common',
    quantity: 1
  };

  return (
    <Section>
      <Cell>
        <h1>Upgrade card {id}</h1>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={card.image} alt={card.name} style={{ width: '100px', height: '100px' }} />
            <h3>{card.name}</h3>
            <p>Rarity: {card.rarity}</p>
          </div>
        </Card>
      </Cell>
      <Cell>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button>Back</button>
            <button>Next</button>
          </div>
        </Card>
      </Cell>
    </Section>
  );
};
