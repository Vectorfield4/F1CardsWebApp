import { Text, Image } from '@telegram-apps/telegram-ui';

import { useSignal } from '@telegram-apps/sdk-react';
import { initDataState as _initDataState } from '@telegram-apps/sdk-react';
import { usePlayerStore } from '@/store/playerStore';

const StatItem = ({ value, color, icon }: { value: string, color: string, icon: string }) => (
    <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '-5px',
          cursor: 'pointer',
        }}>
      <span style={{
          color,
          background: 'linear-gradient(to right, #2B2D35 76%, transparent)',
          borderRadius: '12px',
          padding: '5px 10px',
          marginRight: '-5px'
        }}>{value}</span>
      <img src={icon} style={{ width: 28, height: 28 }} />
    </div>
  );

export const Header = () => {
  const initDataState = useSignal(_initDataState);
  const { player } = usePlayerStore();


  // Данные пользователя из Telegram
  const userPhotoUrl = initDataState?.user?.photo_url || '';
  const userName = player?.username || 'Username';
  const userId = player?.id || 'unknown';
  const isSpecialUser = userId.toString() === '672728444';

  // Форматируем валюты с разделителями тысяч
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('ru-RU');
  };

  const stats = [
    { 
      value: formatCurrency(0), // TODO: player.gold
      color:'#F2C869', 
      icon: 'https://s3.twcstorage.ru/1daee0b6-4b362c06-45a2-4fa0-b1aa-f30cd02cde29/icons/gold.svg' 
    },
    { 
      value: formatCurrency(0), // TODO: player.dust
      color:'white', 
      icon: 'https://s3.twcstorage.ru/1daee0b6-4b362c06-45a2-4fa0-b1aa-f30cd02cde29/icons/dust.svg' 
    }
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      color: 'white'
    }}>
      {/* Левая часть */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Image 
          src={userPhotoUrl}
          style={isSpecialUser ? { 
            borderRadius: '50%',
            border: '3px solid red',
            boxShadow: '0 0 15px red'
          } : {}}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ margin: 0 }}>{userName}</Text>
          <Text>ID: {userId}</Text>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {stats.map((stat, index) => (
          <StatItem key={index} value={stat.value} color={stat.color} icon={stat.icon} />
        ))}
      </div>
    </div>
  );
};
