import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page } from '@/components/Page';
import { useQuery, useMutation } from '@apollo/client';
import { GET_UPGRADE_COST, UPGRADE_CARD, GET_CARD_DISPLAY_DATA, CardDisplayData } from '@/services/queries';
import { Spinner, Button, Text } from '@telegram-apps/telegram-ui';

export const UpgradeCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playerCardId = Number(id);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const { data: cardData, loading: cardLoading } = useQuery<{ getCardDisplayData: CardDisplayData }>(GET_CARD_DISPLAY_DATA, {
    variables: { playerCardId },
    skip: !playerCardId,
  });
  const { data: costData, loading: costLoading } = useQuery<{ getUpgradeDisplayData: number }>(GET_UPGRADE_COST, {
    variables: { playerCardId },
    skip: !playerCardId,
  });
  const [upgrade, { loading: upgradeLoading }] = useMutation(UPGRADE_CARD, {
    variables: { playerCardId },
    onCompleted: () => setDone(true)
  });

  if (cardLoading || costLoading) return <Page><Spinner size="l" /></Page>;
  if (!cardData || !costData) return <Page><Text>Нет данных</Text></Page>;
  const card = cardData.getCardDisplayData;
  const cost = costData.getUpgradeDisplayData;
  const maxLevel = 4;
  const isMaxLevel = card.level >= maxLevel;

  if (done) {
    return (
      <Page back={true}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
          <img src={card.previewUrls[0] || ''} alt={card.name} style={{ width: 180, height: 240, borderRadius: 12, boxShadow: '0 0 24px gold' }} />
          <Text weight="2" style={{ fontSize: 20, margin: '16px 0' }}>Карта улучшена до уровня {card.level + 1}</Text>
          <Button size="l" stretched onClick={() => navigate(-1)}>Перейти к карте</Button>
        </div>
      </Page>
    );
  }

  return (
    <Page back={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <img src={card.previewUrls[0] || ''} alt={card.name} style={{ width: 120, height: 160, borderRadius: 8 }} />
          <img src={card.previewUrls[0] || ''} alt={card.name} style={{ width: 120, height: 160, borderRadius: 8, filter: 'brightness(1.2) drop-shadow(0 0 8px gold)' }} />
        </div>
        <Text weight="2" style={{ fontSize: 18, marginBottom: 8 }}>Стоимость улучшения: <span style={{ color: '#FFD700' }}>🪙 {cost}</span></Text>
        <Button
          size="l"
          stretched
          style={{
            background: isMaxLevel ? '#888' : '#44C767',
            color: isMaxLevel ? '#fff' : 'white',
            marginTop: 12,
            cursor: isMaxLevel ? 'not-allowed' : 'pointer'
          }}
          onClick={() => !isMaxLevel && upgrade()}
          disabled={upgradeLoading || isMaxLevel}
        >
          {isMaxLevel
            ? 'Максимальный уровень'
            : upgradeLoading
              ? <Spinner size="s" />
              : `Улучшить до уровня ${card.level + 1}`}
        </Button>
      </div>
    </Page>
  );
};
