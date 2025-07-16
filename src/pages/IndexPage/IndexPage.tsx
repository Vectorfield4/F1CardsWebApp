// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import type { FC } from 'react';
import { useCallback } from 'react';
import { PackSlider } from '@/components/Pack/PackSlider';
import { Page } from '@/components/Page.tsx';
import { Spinner, Text, Button } from '@telegram-apps/telegram-ui';
import { useQuery } from '@apollo/client';
import {
  GET_MAIN_SCREEN_DISPLAY_DATA,
  MainScreenDisplayData
} from '@/services/queries';
import PlayerStatistics from '@/components/Player/player-statistics';

export const IndexPage: FC = () => {
  const { data, loading, error, refetch } = useQuery<{ getMainScreenDisplayData: MainScreenDisplayData }>(GET_MAIN_SCREEN_DISPLAY_DATA);

  // Лоадер
  if (loading) {
    return (
      <Page back={false}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <Spinner size="l" />
          <Text>Загружаем игровые данные...</Text>
        </div>
      </Page>
    );
  }

  // Ошибка
  if (error) {
    return (
      <Page back={false}>
        <div style={{
          margin: '16px',
          padding: '12px',
          background: '#FF4444',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', flex: 1 }}>{error.message}</Text>
          <Button size="s" mode="outline" onClick={() => refetch()}>
            Повторить
          </Button>
        </div>
      </Page>
    );
  }

  const { stats, showcase } = data!.getMainScreenDisplayData;

  // Заглушки для открытия/покупки пака
  const handleOpenPack = useCallback((packId: string) => {
    alert('Открытие пака будет реализовано позже. packId: ' + packId);
  }, []);
  const handleBuyPack = useCallback(() => {
    alert('Покупка пака будет реализована позже.');
  }, []);

  return (
    <Page back={false}>
      {/* Фоновые эффекты */}
      <div id="bg-blur-100" style={{ 
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle, #D37492 0%, #F64073 51%, #DB3538 100%)',
        filter: 'blur(50px)',
        mixBlendMode: 'soft-light',
        zIndex: -1
      }}></div>
      <div id="bg-blur-250" style={{ 
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle, #D37492 0%, #F64073 51%, #DB3538 100%)',
        filter: 'blur(125px)',
        opacity: 0.75,
        zIndex: -2
      }}></div>

      <PackSlider 
        packs={showcase}
        onOpenPack={handleOpenPack}
        onBuyPack={handleBuyPack}
      />

      <PlayerStatistics stats={stats} />
    </Page>
  );
};