import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/components/Page';

import { FilterChips, FilterOption } from '@/components/FilterChips/FilterChips';
import { CollectionHeader } from '@/pages/Collection/CollectionHeader/CollectionHeader';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_DISPLAY_DATA, CollectionCard } from '@/services/queries';
import { CardGrid } from './CardGrid/CardGrid';

const seasonOptions: FilterOption[] = [
  { id: '2025', label: 'Сезон-2025' },
  { id: 'special', label: 'Специальные' },
  { id: 'historic', label: 'Исторические' },
];

const cardTypeOptions: FilterOption[] = [
  { id: 'all', label: 'Все' },
  { id: 'winners', label: 'Победители' },
  { id: 'racers', label: 'Гонщики' },
];

export const CollectionPage: FC = () => {
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState<string>('2025');
  const [selectedCardType, setSelectedCardType] = useState<string>('all');

  const { data, loading, error } = useQuery<{ getCollectionDisplayData: CollectionCard[] }>(GET_COLLECTION_DISPLAY_DATA);
  const cards = data?.getCollectionDisplayData || [];

  return (
    <Page back={true}>
      {/* Season chips */}
      <FilterChips
        options={seasonOptions}
        selectedId={selectedSeason}
        onSelect={setSelectedSeason}
      />

      {/* Collection container */}
      <div style={{
        padding: '17px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        {/* Collection title with stats */}
        <CollectionHeader
          collectionName="сезон-2025"
          cardsOwned={cards.length}
          cardsTotal={96} // TODO: This should probably come from a service
        />

        {/* Card type selector */}
        <FilterChips
          options={cardTypeOptions}
          selectedId={selectedCardType}
          onSelect={setSelectedCardType}
        />

        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        {!loading && !error && (
            <CardGrid 
              cards={cards} 
              onCardClick={(cardId: number) => navigate(`/collection/player-card/${cardId}`)} 
            />
        )}
      </div>
    </Page>
  );
}

