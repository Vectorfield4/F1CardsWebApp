import type { FC } from 'react';
import { PackSlider } from '@/components/Pack/PackSlider';
import { Page } from '@/components/Page.tsx';
import { Pack } from '@/components/Pack/Pack';

export const IndexPage: FC = () => {
  // Демо-паки с временными изображениями
  const demoPacks: Pack[] = [
    {
      id: 'free1',
      type: 'free',
      name: 'Стартовый набор',
      image: 'https://placehold.jp/30/ff1801/ffffff/300x150.png?text=START+PACK' // Красный (Ferrari)
    },
    {
      id: 'prem1',
      type: 'premium',
      name: 'Гран-при коллекция',
      image: 'https://placehold.jp/30/0600ef/ffffff/300x150.png?text=PREMIUM+PACK', // Синий (Mercedes)
      ownedCount: 2
    },
    {
      id: 'prem2',
      type: 'premium',
      name: 'Легендарные болиды',
      image: 'https://placehold.jp/30/ff8700/000000/300x150.png?text=LEGENDARY+PACK',
      ownedCount: 1
    },
    {
      id: 'empty1',
      type: 'empty',
      name: 'Эксклюзивный сезон',
      image: 'https://placehold.jp/30/cccccc/999999/300x150.png?text=EMPTY+SLOT' // Серый (заглушка)
    }
  ];

  const handleOpenPack = (packId: string) => {
    console.log('Opening pack:', packId);
    // Здесь будет навигация на экран открытия
  };

  const handleBuyPack = (packId: string) => {
    console.log('Buying pack:', packId);
    // Здесь будет открытие модалки покупки
  };

  return (
    <Page back={false}>
      <PackSlider 
        packs={demoPacks}
        onOpenPack={handleOpenPack}
        onBuyPack={handleBuyPack}
      />
    </Page>
  );
};