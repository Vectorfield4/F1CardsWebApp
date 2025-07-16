
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Screen } from '@/components/Screens/Screen';
import { useQuery } from '@apollo/client';
import { GET_CARD_DISPLAY_DATA, CardDisplayData } from '@/services/queries';
import { Spinner, Button, Text } from '@telegram-apps/telegram-ui';

export const PlayerCardPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const playerCardId = Number(id);
  const { data, loading, error } = useQuery<{ getCardDisplayData: CardDisplayData }>(GET_CARD_DISPLAY_DATA, {
    variables: { playerCardId },
    skip: !playerCardId,
  });

  if (loading) return <Screen><Spinner size="l" /></Screen>;
  if (error) return <Screen><Text>Ошибка: {error.message}</Text></Screen>;
  if (!data) return <Screen><Text>Нет данных</Text></Screen>;

  const card = data.getCardDisplayData;
  const isOwned = card.quantity > 0;
  const image = card.previewUrls[0] || '';

  return (
    <Screen back={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>
        {/* Фото/заглушка */}
        <div style={{ margin: '16px 0' }}>
          {isOwned ? (
            <img src={image} alt={card.name} style={{ width: 220, height: 300, borderRadius: 12, boxShadow: '0 0 24px gold' }} />
          ) : (
            <div style={{ width: 220, height: 300, borderRadius: 12, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 32 }}>
              ?
            </div>
          )}
        </div>
        {/* Имя и статус */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Text weight="2" style={{ fontSize: 22 }}>{card.name}</Text>
          <div style={{ color: isOwned ? '#FFD700' : '#888', marginTop: 4 }}>
            {isOwned ? `В наличии: ${card.quantity} шт.` : 'Не получена'}
          </div>
        </div>
        {/* Кнопки действий */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 260, marginBottom: 16 }}>
          {isOwned ? (
            <>
              <Button size="l" stretched>Выставить на продажу</Button>
              <Button size="l" stretched>Купить на торговой площадке</Button>
              <Button size="l" stretched style={{ background: '#44C767', color: 'white' }}>Улучшить карточку</Button>
              <Button size="l" stretched style={{ background: '#FF4444', color: 'white' }}>Разбить карточку</Button>
            </>
          ) : (
            <>
              <Button size="l" stretched>Купить на торговой площадке</Button>
              <Button size="l" stretched style={{ background: '#FFD700', color: '#222' }}>Премиум-магазин</Button>
            </>
          )}
        </div>
        {/* Где может выпасть */}
        <div style={{ background: '#232323', borderRadius: 10, padding: 16, width: 260, marginBottom: 16 }}>
          <Text weight="2" style={{ color: '#FFD700' }}>Карточка может выпасть в:</Text>
          <ul style={{ color: '#fff', fontSize: 14, margin: 0, paddingLeft: 18 }}>
            <li>Стандартном паке (с повышенной вероятностью)</li>
            <li>Премиальном паке (с малой вероятностью)</li>
          </ul>
        </div>
        {/* Факты/статы (если есть) */}
        {card.facts && card.facts.length > 0 && (
          <div style={{ background: '#232323', borderRadius: 10, padding: 16, width: 260, marginBottom: 16 }}>
            <Text weight="2" style={{ color: '#00D6FF' }}>Факты:</Text>
            <ul style={{ color: '#fff', fontSize: 14, margin: 0, paddingLeft: 18 }}>
              {card.facts.map((fact, idx) => <li key={idx}>{fact}</li>)}
            </ul>
          </div>
        )}
      </div>
    </Screen>
  );
};

