import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/components/Page';
import { gameStateService, DetailedPlayerCard } from '@/services/gameStateService';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { FilterChips, FilterOption } from '@/components/FilterChips/FilterChips';
import { CollectionHeader } from '@/components/CollectionHeader/CollectionHeader';

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
  const [cards, setCards] = useState<DetailedPlayerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('2025');
  const [selectedCardType, setSelectedCardType] = useState<string>('all');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const detailedCards = await gameStateService.getDetailedPlayerCards();
        setCards(detailedCards);
      } catch (err: any) {
        console.error(err);
        setError(err.title || 'Не удалось загрузить коллекцию.');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!loading && !error && (
            <CardGrid 
              cards={cards} 
              onCardClick={(cardId) => navigate(`/collection/player-card/${cardId}`)} 
            />
        )}

      </div>

    </Page>
  );
}

