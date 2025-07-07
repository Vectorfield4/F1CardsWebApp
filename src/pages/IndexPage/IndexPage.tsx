import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackSlider } from '@/components/Pack/PackSlider';
import { Page } from '@/components/Page.tsx';
import { authService } from '@/services/authService';
import { gameStateService } from '@/services/gameStateService';
import PlayerStatistics from '@/components/Player/player-statistics';
import { Spinner, Text, Button } from '@telegram-apps/telegram-ui';

export const IndexPage: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardSets, setCardSets] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    setIsLoading(true);
    
    // Проверяем авторизацию
    if (!authService.isAuthenticated()) {
      // Если не авторизован, перенаправляем на страницу логина
      navigate('/login');
      return;
    }

    setIsAuthenticated(true);

    try {
      // Загружаем наборы карт параллельно с игровыми данными
      const [cardSetsResult] = await Promise.all([
        gameStateService.loadCardSets(),
        gameStateService.loadCollection(),
        gameStateService.loadAvailableShowcase()
      ]);

      if (cardSetsResult.success && cardSetsResult.data) {
        // Преобразуем CardSet в формат Pack для совместимости с существующим интерфейсом
        const packsData = cardSetsResult.data.map(cardSet => ({
          id: cardSet.id.toString(),
          type: cardSet.goldPrice === 0 ? 'free' as const : 'premium' as const,
          name: cardSet.name,
          availableCount: 1, // Будет обновлено на основе данных пользователя
          image: cardSet.imageUrl || '../assets/demo/pack1.png', // Fallback изображение
          ownedCount: 0 // Будет обновлено на основе данных пользователя
        }));
        
        setCardSets(packsData);
      } else {
        // Используем демо-данные в случае ошибки
        setCardSets(getDefaultPacks());
        if (cardSetsResult.error) {
          setError(`Ошибка загрузки паков: ${cardSetsResult.error}`);
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Ошибка загрузки данных игры');
      // Используем демо-данные в случае ошибки
      setCardSets(getDefaultPacks());
    } finally {
      setIsLoading(false);
    }
  };

  // Демо-паки как fallback
  const getDefaultPacks = () => [
    {
      id: '1',
      type: 'free' as const,
      name: 'Стартовый набор',
      availableCount: 1,
      image: '../assets/demo/pack1.png'
    },
    {
      id: '2',
      type: 'premium' as const,
      name: 'Гран-при коллекция',
      availableCount: 2,
      image: '../assets/demo/pack2.png',
      ownedCount: 2
    },
    {
      id: '3',
      type: 'premium' as const,
      name: 'Легендарные болиды',
      availableCount: 0,
      image: '../assets/demo/pack3.png',
      ownedCount: 1
    }
  ];

  const handleOpenPack = async (packId: string) => {
    console.log('Opening pack:', packId);
    
    try {
      const result = await gameStateService.openPack(parseInt(packId));
      
      if (result.success && result.data) {
        // Показываем результат открытия пака
        const cardNames = result.data.cards.map(card => card.name).join(', ');
        alert(`Поздравляем! Вы получили карты: ${cardNames}`);
        
        // Обновляем данные
        await checkAuthAndLoadData();
      } else {
        alert(`Ошибка открытия пака: ${result.error}`);
      }
    } catch (error) {
      console.error('Pack opening error:', error);
      alert('Произошла ошибка при открытии пака');
    }
  };

  const handleBuyPack = (packId: string) => {
    console.log('Buying pack:', packId);
    // Здесь будет логика покупки пака
    alert('Функция покупки паков будет добавлена в следующих обновлениях');
  };

  const handleRetry = () => {
    setError(null);
    checkAuthAndLoadData();
  };



  // Если не авторизован, ничего не показываем (будет редирект на логин)
  if (!isAuthenticated) {
    return null;
  }

  // Показываем лоадер во время загрузки
  if (isLoading) {
    return (
      <Page back={false}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <Spinner size="l" />
          <Text>Загружаем игровые данные...</Text>
        </div>
      </Page>
    );
  }

  return (
    <Page back={false}>
      {/* Фоновые эффекты */}
      <div id="bg-blur-100" style={{ 
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle, #D37492 0%, #F64073 51%, #DB3538 100%)',
        filter: 'blur(50px)',
        mixBlendMode: 'soft-light',
        zIndex: -1
      }}></div>

      <div id="bg-blur-250" style={{ 
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle, #D37492 0%, #F64073 51%, #DB3538 100%)',
        filter: 'blur(125px)',
        opacity: 0.75,
        zIndex: -2
      }}></div>

      {/* Сообщение об ошибке */}
      {error && (
        <div style={{
          margin: '16px',
          padding: '12px',
          background: '#FF4444',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', flex: 1 }}>{error}</Text>
          <Button size="s" mode="outline" onClick={handleRetry}>
            Повторить
          </Button>
        </div>
      )}

      {/* Слайдер паков */}
      <PackSlider 
        packs={cardSets}
        onOpenPack={handleOpenPack}
        onBuyPack={handleBuyPack}
      />

      {/* Статистика игрока */}
      <PlayerStatistics />
    </Page>
  );
};