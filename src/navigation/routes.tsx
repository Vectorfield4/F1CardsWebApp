import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { CollectionPage } from '@/pages/Collection/CollectionPage';
import { InitDataPage } from '@/pages/InitDataPage';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/collection', Component: CollectionPage, title: 'Collection' },
  { path: '/shop', Component: InitDataPage, title: 'Shop' },
  { path: '/marketplace', Component: InitDataPage, title: 'Marketplace' },
  
];
