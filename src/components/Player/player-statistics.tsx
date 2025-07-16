import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Package, 
  SquareStack, 
  Hammer, 
  ShoppingCart, 
  Library, 
  Star, 
  TrendingUp, 
  Coins, 
  BarChart2
} from 'lucide-react';
import { authService } from '@/services/authService';
import { gameStateService } from '@/services/gameStateService';

interface PlayerStatistic {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

export const InfoLine = ({ 
  label, 
  value, 
  icon 
}: { 
  label: string, 
  value: number|string, 
  icon: React.ReactNode 
}) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    paddingTop: '16px', 
    marginBottom: '0 0', 
    borderTop: '1px solid #444' 
  }}>
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px' 
    }}>
      {icon}
      {label}
    </div>
    <div style={{ textAlign: 'right', fontWeight: 'bold' }}>{value}</div>
  </div>
);

export default function PlayerStatistics() {
  const [statistics, setStatistics] = useState<PlayerStatistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlayerStatistics();
    
    // Подписываемся на изменения в gameStateService
    const unsubscribe = gameStateService.subscribe(() => {
      loadPlayerStatistics();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loadPlayerStatistics = async () => {
    try {
      const playerDetails = authService.getPlayerDetails();
      const collection = gameStateService.getCollection();
      
      if (!playerDetails) {
        // Если нет данных игрока, используем демо-данные
        setStatistics(getDefaultStatistics());
        return;
      }

      // Вычисляем статистику на основе реальных данных
      const uniqueCards = gameStateService.getUniqueCards();
      const totalCardsInGame = 518; // Это можно получить из API /api/Cards
      
      const realStatistics: PlayerStatistic[] = [
        { 
          label: 'Дней в игре:', 
          value: playerDetails.daysInGame, 
          icon: <Calendar size={18} /> 
        },
        { 
          label: 'Наборов карт:', 
          value: playerDetails.cardSetsCount, 
          icon: <Package size={18} /> 
        },
        { 
          label: 'Карт в коллекции:', 
          value: playerDetails.cardsCount, 
          icon: <SquareStack size={18} /> 
        },
        { 
          label: 'Уникальных карт:', 
          value: `${uniqueCards.length}/${totalCardsInGame}`, 
          icon: <Star size={18} /> 
        },
        { 
          label: 'Рейтинг:', 
          value: playerDetails.rating, 
          icon: <TrendingUp size={18} /> 
        },
        { 
          label: 'Золото:', 
          value: playerDetails.gold.toLocaleString(), 
          icon: <Coins size={18} /> 
        },
        { 
          label: 'Пыль:', 
          value: playerDetails.dust.toLocaleString(), 
          icon: <Hammer size={18} /> 
        }
      ];

      // Добавляем статистику по уровням карт, если есть коллекция
      if (collection.length > 0) {
        const level2Cards = gameStateService.getCardsByLevel(2).length;
        const level3Cards = gameStateService.getCardsByLevel(3).length;
        const level4Cards = gameStateService.getCardsByLevel(4).length;
        const upgradedCards = level2Cards + level3Cards + level4Cards;
        
        realStatistics.push({
          label: 'Карт улучшено:',
          value: `${upgradedCards}/${collection.length}`,
          icon: <TrendingUp size={18} />
        });
      }

      // Добавляем дату регистрации
      const registrationDate = new Date(playerDetails.registrationDate);
      realStatistics.push({
        label: 'Дата регистрации:',
        value: registrationDate.toLocaleDateString('ru-RU'),
        icon: <Calendar size={18} />
      });

      setStatistics(realStatistics);
    } catch (error) {
      console.error('Error loading player statistics:', error);
      setStatistics(getDefaultStatistics());
    } finally {
      setIsLoading(false);
    }
  };

  // Демо-статистика как fallback
  const getDefaultStatistics = (): PlayerStatistic[] => [
    { label: 'Дней в игре:', value: 27, icon: <Calendar size={18} /> },
    { label: 'Открыто паков:', value: 108, icon: <Package size={18} /> },
    { label: 'Карт получено:', value: 227, icon: <SquareStack size={18} /> },
    { label: 'Карт разбито:', value: 41, icon: <Hammer size={18} /> },
    { label: 'Карт продано:', value: 12, icon: <ShoppingCart size={18} /> },
    { label: 'Карт в коллекции:', value: 167, icon: <Library size={18} /> },
    { label: 'Уникальных карт:', value: '136/518', icon: <Star size={18} /> },
    { label: 'Карт улучшено:', value: '28/518', icon: <TrendingUp size={18} /> },
    { label: 'Монет потрачено:', value: 0, icon: <Coins size={18} /> },
  ];

  if (isLoading) {
    return (
      <div style={{ 
        margin: '24px', 
        padding: '24px', 
        borderRadius: '15px', 
        backgroundColor: '#2B2D35',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          marginTop: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <BarChart2 size={20} />
          Статистика игрока
        </h3>
        <div style={{ padding: '20px' }}>
          Загрузка статистики...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      margin: '24px', 
      padding: '24px', 
      borderRadius: '15px', 
      backgroundColor: '#2B2D35',
      color: 'white'
    }}>
      <h3 style={{ 
        marginTop: '0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <BarChart2 size={20} />
        Статистика игрока
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {statistics.map((stat, index) => (
          <InfoLine 
            key={`${stat.label}-${index}`}
            label={stat.label} 
            value={stat.value} 
            icon={stat.icon} 
          />
        ))}
      </div>
    </div>
  );
}
