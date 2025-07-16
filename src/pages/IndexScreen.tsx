// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { useCallback, useEffect } from 'react';
import { Screen } from '@/components/Screens/Screen'; 
import { useNavigate } from 'react-router-dom';

import { fetchMainScreenData, useMainScreenStore } from '@/store/mainScreenStore';
import { PlayerStatistics } from '@/components/Player/PlayerStatistics';
import { BgBlur100, BgBlur250 } from '@/components/BgBlur';
import { SpinnerBlock } from '@/components/SpinnerBlock';
import { ShowcaseSlider } from '@/components/Storefront/ShowcaseSlider';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useLaunchParamsStore } from '@/store/launchParamsStore';

export const IndexScreen = () => {
  const navigate = useNavigate();
  const { loading, error } = useMainScreenStore();
  const { initFromTelegram } = useLaunchParamsStore();

  const handleOpenPack = useCallback((packId: string) => {
    alert('Открытие пака будет реализовано позже. packId: ' + packId);
  }, []);
  
  const handleBuyPack = useCallback((packId: string) => {
    navigate(`/packs/${packId}`);
  }, [navigate]);

  useEffect(() => {
    initFromTelegram();
    fetchMainScreenData();
  }, []);

  if (loading) {
    return <SpinnerBlock />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => {
      initFromTelegram();
      fetchMainScreenData();
    }} />;
  }

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