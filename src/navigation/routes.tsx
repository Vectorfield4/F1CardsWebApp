import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { CollectionPage } from '@/pages/Collection/CollectionPage';
import { ShopPage } from '@/pages/ShopPage/ShopPage';
import { MarketplacePage } from '@/pages/MarketplacePage/MarketplacePage';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/collection', Component: CollectionPage, title: 'Collection' },
  { path: '/shop', Component: ShopPage, title: 'Shop' },
  { path: '/marketplace', Component: MarketplacePage, title: 'Marketplace' },
  
];
