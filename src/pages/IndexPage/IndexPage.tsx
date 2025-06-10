import type { FC } from 'react';
import { PackSlider } from '@/components/Pack/PackSlider';
import { Page } from '@/components/Page.tsx';
import { Pack } from '@/components/Pack/Pack';
import PlayerStatistics from '@/components/Player/player-statistics';

export const IndexPage: FC = () => {
  // Демо-паки с временными изображениями
  const demoPacks: Pack[] = [
    {
      id: 'free1',
      type: 'free',
      name: 'Стартовый наборр',
      availableCount: 1,
      image: '../assets/demo/pack1.png' 
    },
    {
      id: 'prem1',
      type: 'premium',
      name: 'Гран-при коллекция',
      availableCount: 2,
      image: '../assets/demo/pack2.png', 
      ownedCount: 2
    },
    {
      id: 'prem2',
      type: 'premium',
      name: 'Легендарные болиды',
      availableCount: 0,
      image: '../assets/demo/pack3.png',
      ownedCount: 1
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
        packs={demoPacks}
        onOpenPack={handleOpenPack}
        onBuyPack={handleBuyPack}
      />

      
      <PlayerStatistics />
        
    </Page>
  );
};