import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/components/Page';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { FilterChips, FilterOption } from '@/components/FilterChips/FilterChips';
import { CollectionHeader } from '@/components/CollectionHeader/CollectionHeader';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_DISPLAY_DATA, CollectionCard } from '@/services/queries';

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

  // Преобразуем данные для CardGrid
  const gridCards = cards.map(card => ({
    id: Number(card.id),
    cardId: Number(card.cardId),
    name: card.name,
    imageUrl: card.previewUrls[0] || '',
    cardTypeId: Number(card.cardTypeId),
    rarity: 'common' as const, // TODO: преобразовать rarityId в строку (common/rare/epic/legendary)
    quantity: card.quantity,
    level: card.level,
    playerId: '',
    obtainedAt: '',
  }));

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
              cards={gridCards} 
              onCardClick={(cardId) => navigate(`/collection/player-card/${cardId}`)} 
            />
        )}
      </div>
    </Page>
  );
}

