import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PACK_DISPLAY_DATA, PackDisplayData } from '@/services/queries';
import { Spinner, Button, Text } from '@telegram-apps/telegram-ui';
import { Screen } from '@/components/Screens/Screen';

const PACK_OPTIONS = [
  { count: 1, priceMultiplier: 1 },
  { count: 2, priceMultiplier: 2 },
  { count: 4, priceMultiplier: 4 },
];

const userGold = 1000; // TODO: получить из профиля игрока

const PackPage = () => {
  const { packId } = useParams<{ packId: string }>();
  const [selected, setSelected] = useState(0);

  const { data, loading, error } = useQuery<{ getPackDisplayData: PackDisplayData }>(GET_PACK_DISPLAY_DATA, {
    variables: { packId: Number(packId) },
    skip: !packId,
  });

  if (loading) return <Screen><Spinner size="l" /></Screen>;
  if (error || !data) return <Screen><Text>Ошибка загрузки набора</Text></Screen>;

  const pack = data.getPackDisplayData;
  const price = pack.goldPrice * PACK_OPTIONS[selected].priceMultiplier;
  const notEnoughGold = userGold < price;

  return (
    <Screen back={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>
        <img src={pack.imageUrl || ''} alt={pack.name} style={{ width: 220, height: 220, borderRadius: 16, marginBottom: 16 }} />
        <Text weight="2" style={{ fontSize: 22, marginBottom: 8 }}>{pack.name}</Text>
        <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
          {PACK_OPTIONS.map((opt, idx) => (
            <Button
              key={opt.count}
              size="l"
              stretched
              style={{ background: selected === idx ? '#FFD700' : '#232323', color: selected === idx ? '#222' : '#fff' }}
              onClick={() => setSelected(idx)}
            >
              {opt.count} × {pack.goldPrice * opt.priceMultiplier} монет
            </Button>
          ))}
        </div>
        <Button
          size="l"
          stretched
          style={{ background: notEnoughGold ? '#888' : '#FFD700', color: notEnoughGold ? '#fff' : '#222', marginBottom: 16 }}
          disabled={notEnoughGold}
        >
          {notEnoughGold ? 'Недостаточно монет — Купить монеты' : `Купить за ${price} монет`}
        </Button>
        <div style={{ background: '#232323', borderRadius: 10, padding: 16, width: 300, marginTop: 16 }}>
          <Text weight="2" style={{ color: '#FFD700' }}>Информация о наборе:</Text>
          <div style={{ color: '#fff', fontSize: 14, marginTop: 8 }}>{pack.description || 'Описание набора...'}</div>
        </div>
      </div>
    </Screen>
  );
};

export default PackPage; 