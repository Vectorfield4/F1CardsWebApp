import { BarChart2 } from 'lucide-react';
import { useStatsStore } from '@/store/statsStore';
import { InfoLine } from '@/components/InfoLine';

export function PlayerStatistics() {
  const { stats } = useStatsStore();
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
        {stats.map((stat, index) => (
          <InfoLine 
            key={`${stat.type}-${index}`}
            label={stat.type}
            value={stat.value}
            icon={null}
          />
        ))}
      </div>
    </div>
  );
} 