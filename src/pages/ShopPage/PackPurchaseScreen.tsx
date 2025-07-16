import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PACK_DISPLAY_DATA, PackDisplayData } from '@/services/queries';
import { Spinner, Button, Text } from '@telegram-apps/telegram-ui';
import { Screen } from '@/components/Screens/Screen';

const PackPurchaseScreen: React.FC = () => {
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<{ getPackDisplayData: PackDisplayData }>(GET_PACK_DISPLAY_DATA, {
    variables: { packId: Number(packId) },
    skip: !packId,
  });

  if (loading) return <Screen><Spinner size="l" /></Screen>;
  if (error || !data) return <Screen><Text>Ошибка загрузки набора</Text></Screen>;

  const pack = data.getPackDisplayData;

  const handleConfirm = () => {
    navigate(`/packs/${packId}/purchase-result`);
  };

  return (
    <Screen back={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
        <img src={pack.imageUrl || ''} alt={pack.name} style={{ width: 180, height: 180, borderRadius: 12, marginBottom: 16, background: '#232323' }} />
        <Text weight="2" style={{ fontSize: 20, marginBottom: 8 }}>{pack.name}</Text>
        <Text style={{ marginBottom: 16 }}>{pack.description || 'Описание набора...'}</Text>
        <Button size="l" stretched style={{ marginBottom: 12 }} onClick={handleConfirm}>
          Купить за {pack.goldPrice} монет
        </Button>
        <Button size="l" stretched mode="outline" onClick={() => navigate(-1)}>
          Отмена
        </Button>
      </div>
    </Screen>
  );
};

export default PackPurchaseScreen; 