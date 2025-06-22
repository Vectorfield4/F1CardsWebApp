import { initDataState as _initDataState, useSignal } from '@telegram-apps/sdk-react';
import { Text, Image } from '@telegram-apps/telegram-ui';

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

  const userPhotoUrl = initDataState?.user?.photo_url || '';
  const userName = initDataState?.user?.first_name || 'Username';
  const userId = initDataState?.user?.id || 'unknown';

  const stats = [
    { value: '2 584', color:'#F2C869', icon: '../assets/icons/gold.svg' },
    { value: '21 324', color:'white', icon: '../assets/icons/dust.svg' }
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
        <Image src={userPhotoUrl}></Image>
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
