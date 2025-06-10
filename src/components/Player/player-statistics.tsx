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

const playerStatisticsData = [
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
)

export default function PlayerStatistics() {
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
        <BarChart2 size={20} /> {/* Добавим иконку и к заголовку */}
        Статистика игрока
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {playerStatisticsData.map((stat) => (
          <InfoLine 
            key={stat.label} 
            label={stat.label} 
            value={stat.value} 
            icon={stat.icon} 
          />
        ))}
      </div>
    </div>
  )
}
