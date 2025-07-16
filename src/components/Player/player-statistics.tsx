import { BarChart2 } from 'lucide-react';

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

export default function PlayerStatistics({ stats }: { stats: { type: string; value: string }[] }) {
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
