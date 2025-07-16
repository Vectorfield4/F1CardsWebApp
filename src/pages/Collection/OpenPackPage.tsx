import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Screen } from '@/components/Screens/Screen';
import CollectionCard, { GameCardRarity, GameCardType } from '@/components/Card/Card';
// Удалён импорт gameStateService, PackOpeningResult, Card
import { Spinner, Text, Button } from '@telegram-apps/telegram-ui';

const OpenPackPage: FC = () => {
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result] = useState<any | null>(null); // Замените PackOpeningResult на any, так как gameStateService удалён

  useEffect(() => {
    if (packId) {
      handleOpenPack();
    } else {
      setError('ID набора не найден');
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packId]);

  const handleOpenPack = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Удаляю все строки с gameStateService
      // const packOpeningResult = await gameStateService.openPack(parseInt(packId!));
      // setResult(packOpeningResult);
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при открытии набора');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCollection = () => {
    navigate('/collection');
  };

  if (isLoading) {
    return (
      <Screen>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
          <Spinner size="l" />
          <Text>Открываем набор...</Text>
        </div>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <Text weight="1">{error}</Text>
          <Button size="l" stretched style={{ marginTop: '1rem' }} onClick={handleOpenPack}>Попробовать снова</Button>
          <Button size="l" stretched mode="gray" style={{ marginTop: '0.5rem' }} onClick={handleBackToCollection}>Вернуться в коллекцию</Button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div style={{ padding: '1rem' }}>
        <Text weight="1" style={{ textAlign: 'center', marginBottom: '1rem' }}>Поздравляем! Вот ваши новые карты:</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {result?.cards.map((card: any) => { // Замените Card на any, так как gameStateService удалён
            // Временное сопоставление ID с типами и редкостями.
            // В будущем это должно приходить с бэкенда или быть в отдельном справочнике.
            const rarityMap: { [key: number]: GameCardRarity } = { 1: 'common', 2: 'rare', 3: 'epic', 4: 'legendary' };
            const typeMap: { [key: number]: GameCardType } = { 1: 'driver', 2: 'car' };

            return (
              <CollectionCard
                key={card.id}
                name={card.name}
                image={card.imageUrl || ''}
                type={typeMap[card.cardTypeId] || 'car'}
                rarity={rarityMap[card.rarityId] || 'common'}
                quantity={1}
              />
            );
          })}
        </div>
        <Button size="l" stretched style={{ marginTop: '1rem' }} onClick={handleBackToCollection}>
          Отлично!
        </Button>
      </div>
    </Screen>
  );
};

export default OpenPackPage;
