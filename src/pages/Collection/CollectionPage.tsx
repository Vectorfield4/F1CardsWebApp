import { type FC } from 'react';
import { List } from '@telegram-apps/telegram-ui';
import CollectionCard, { GameCardProps } from '@/components/Card/Card';
import { Page } from '@/components/Page';

export const CollectionPage: FC = () => {
  const cards:GameCardProps[] = [
    {
      type: 'car',
      name: 'Monaco Street Circuit',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'rare',
    },
    {
      type: 'car',
      name: 'Silverstone Circuit',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'common',
    },
    {
      type: 'car',
      name: 'Circuit de Barcelona-Catalunya',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'epic',
    },
    {
      type: 'car',
      name: 'Red Bull Ring',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'legendary',
    },
    {
      type: 'car',
      name: 'Hungaroring',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'rare',
    },
    {
      type: 'driver',
      name: 'Max Verstappen',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'legendary',
    },
    {
      type: 'driver',
      name: 'Charles Leclerc',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'epic',
    },
    {
      type: 'driver',
      name: 'Lewis Hamilton',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'legendary',
    },
    {
      type: 'driver',
      name: 'George Russell',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'rare',
    },
    {
      type: 'driver',
      name: 'Carlos Sainz Jr.',
      image: 'https://cdn-icons-png.flaticon.com/512/197/197484.png',
      rarity: 'common',
    },
  ];

  return (
    <Page back={true}>
      <List>
        {cards.map((card) => (
          <CollectionCard 
              key={card.name} 
              name={card.name} 
              image={card.image}
              type={card.type} 
              rarity={card.rarity} />
        ))}
      </List>
    </Page>
  );
}

