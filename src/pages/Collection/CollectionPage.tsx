import { type FC } from 'react';
import { Chip } from '@telegram-apps/telegram-ui';
import CollectionCard, { PlayerCard } from '@/components/Card/Card';
import { Page } from '@/components/Page';

export const CollectionPage: FC = () => {
  const cards: PlayerCard[] = [
    {
      type: 'car',
      name: 'Monaco Street Circuit',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'rare',
      quantity: 1
    },
    {
      type: 'car',
      name: 'Silverstone Circuit',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'common',
      quantity: 2
    },
    {
      type: 'car',
      name: 'Circuit de Barcelona-Catalunya',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'epic',
      quantity: 3
    },
    {
      type: 'car',
      name: 'Red Bull Ring',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'legendary',
      quantity: 1
    },
    {
      type: 'car',
      name: 'Hungaroring',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'rare',
      quantity: 1
    },
    {
      type: 'driver',
      name: 'Max Verstappen',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'legendary',
      quantity: 2
    },
    {
      type: 'driver',
      name: 'Charles Leclerc',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'epic',
      quantity: 1
    },
    {
      type: 'driver',
      name: 'Lewis Hamilton',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'legendary',
      quantity: 1
    },
    {
      type: 'driver',
      name: 'George Russell',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'rare',
      quantity: 1
    },
    {
      type: 'driver',
      name: 'Carlos Sainz Jr.',
      image: 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=TEST%20CARD',
      rarity: 'common',
      quantity: 2
    },
  ];

  return (
    <Page back={true}>
      {/* Season chips */}
      <div style={{
        display: 'flex',
        gap: 5,
        padding: '0 17px'
      }}>
        <Chip mode="elevated" style={{ backgroundColor: 'white' }} >
          <span style={{ color: '#2B2D35' }}>Сезон-2025</span>
        </Chip>
        <Chip mode="mono" >
          Специальные
        </Chip>
        <Chip mode="mono" >
          Исторические
        </Chip>
      </div>

      {/* Collection container */}
      <div style={{
        padding: '17px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        {/* Collection title with stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ margin: 0 }}>Коллекция "сезон-2025"</h2>
          <p style={{ margin: 0 }}>Собрано <strong>20 из 96 карт</strong> коллекции</p>
        </div>

        {/* Card type selector */}
        <div style={{
          display: 'flex',
          gap: 5,
        }}>
          <Chip mode="elevated" style={{ backgroundColor: 'white' }} >
            <span style={{ color: '#2B2D35' }}>Все</span>
          </Chip>
          <Chip mode="mono" >
            Победители
          </Chip>
          <Chip mode="mono" >
            Гонщики
          </Chip>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '0px',
        }}>
          {cards.map((card) => (
            <CollectionCard 
              key={card.name} 
              name={card.name} 
              image={card.image}
              type={card.type} 
              rarity={card.rarity}
              quantity={card.quantity}
            />
          ))}
        </div>

      </div>

    </Page>
  );
}

