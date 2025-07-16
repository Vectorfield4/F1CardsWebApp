import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexScreen';
import { CollectionPage } from '@/pages/Collection/CollectionPage';
import { InitDataPage } from '@/pages/InitDataPage';
import OpenPackPage from '@/pages/Collection/OpenPackPage';
import { PlayerCardPage } from '@/pages/Collection/PlayerCardPage';
import { UpgradeCardPage } from '@/pages/Collection/UpgradePage';
// Заглушки для новых страниц
import PremiumShopPage from '../pages/ShopPage/PremiumShopPage';
import PackPage from '../pages/Packs/PackPage';
import PackPurchaseResultScreen from '../pages/ShopPage/PackPurchaseResultScreen';
import PackPurchaseScreen from '../pages/ShopPage/PackPurchaseScreen';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/collection', Component: CollectionPage, title: 'Collection' },
  { path: '/collection/open-pack/:packId', Component: OpenPackPage },
  { path: '/collection/card/:cardId', Component: PlayerCardPage, title: 'Card Details' },
  { path: '/collection/card/:cardId/upgrade', Component: UpgradeCardPage, title: 'Upgrade Card' },
  // { path: '/collection/card/:cardId/disassemble', Component: RecyclePage, title: 'Disassemble Card' },
  { path: '/pack/:packId', Component: PackPage, title: 'Pack' },
  { path: '/premium-shop', Component: PremiumShopPage, title: 'Premium Shop' },
  { path: '/packs/:packId/purchase-result', Component: PackPurchaseResultScreen, title: 'Pack Purchase Result' },
  { path: '/packs/:packId', Component: PackPurchaseScreen, title: 'Pack Purchase' },
  { path: '/shop', Component: InitDataPage, title: 'Shop' },
  { path: '/marketplace', Component: InitDataPage, title: 'Marketplace' },
];
