// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { useCallback, useEffect } from 'react';
import { Screen } from '@/components/Screens/Screen'; 
import { Text, Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

import { useMainScreenStore } from '@/store/mainScreenStore';
import { fetchMainScreenData } from '@/store/fetchMainScreenData';
import { PlayerStatistics } from '@/components/Player/PlayerStatistics';
import { BgBlur100, BgBlur250 } from '@/components/BgBlur';
import { SpinnerBlock } from '@/components/SpinnerBlock';
import { ShowcaseSlider } from '@/components/Storefront/ShowcaseSlider';

export const IndexScreen = () => {
  const { loading, error } = useMainScreenStore();

  useEffect(() => {
    fetchMainScreenData();
  }, []);

  if (loading) {
    return (
      <Screen back={false}>
        <SpinnerBlock />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen back={false}>
        <div style={{
          margin: '16px',
          padding: '12px',
          background: '#FF4444',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', flex: 1 }}>{error}</Text>
          <Button size="s" mode="outline" onClick={() => fetchMainScreenData()}>
            Повторить
          </Button>
        </div>
      </Screen>
    );
  }

  const handleOpenPack = useCallback((packId: string) => {
    alert('Открытие пака будет реализовано позже. packId: ' + packId);
  }, []);
  const navigate = useNavigate();
  const handleBuyPack = useCallback((packId: string) => {
    navigate(`/packs/${packId}`);
  }, [navigate]);

  return (
    <Screen back={false}>
      <BgBlur100 color1="#D37492" color2="#F64073" color3="#DB3538" blur={50} />
      <BgBlur250 color1="#D37492" color2="#F64073" color3="#DB3538" blur={125} />
      <ShowcaseSlider 
        onOpenPack={handleOpenPack}
        onBuyPack={handleBuyPack}
      />
      <PlayerStatistics />
    </Screen>
  );
};