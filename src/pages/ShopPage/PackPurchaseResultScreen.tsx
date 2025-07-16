import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PACK_PURCHASE_RESULT, PackPurchaseResult } from '@/services/queries';
import { Spinner, Button, Text } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

const PackPurchaseResultScreen: React.FC = () => {
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<{ getPackPurchaseResultDisplayData: PackPurchaseResult }>(GET_PACK_PURCHASE_RESULT, {
    variables: { packId: Number(packId) },
    skip: !packId,
  });

  if (loading) return <Page><Spinner size="l" /></Page>;
  if (error || !data) return <Page><Text>Ошибка загрузки результата</Text></Page>;

  const result = data.getPackPurchaseResultDisplayData;

  return (
    <Page back={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
        <img src={''} alt="pack" style={{ width: 180, height: 180, borderRadius: 12, marginBottom: 16, background: '#232323' }} />
        <Text weight="2" style={{ fontSize: 20, marginBottom: 8 }}>
          {result.success ? 'Набор приобретён' : 'Ошибка покупки'}
        </Text>
        {result.errorMessage && <Text style={{ color: 'red', marginBottom: 8 }}>{result.errorMessage}</Text>}
        <Button size="l" stretched style={{ marginBottom: 12 }} onClick={() => navigate(`/collection/open-pack/${packId}`)}>
          Перейти к открытию набора
        </Button>
        <Button size="l" stretched mode="outline" onClick={() => navigate('/premium-shop')}>
          Вернуться в премиум-магазин
        </Button>
      </div>
    </Page>
  );
};

export default PackPurchaseResultScreen; 