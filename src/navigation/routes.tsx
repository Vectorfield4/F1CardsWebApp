import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { CollectionPage } from '@/pages/Collection/CollectionPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { InitDataPage } from '@/pages/InitDataPage';
import OpenPackPage from '@/pages/Collection/OpenPackPage';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/login', Component: LoginPage, title: 'Login' },
  { path: '/collection', Component: CollectionPage, title: 'Collection' },
  { path: '/collection/open-pack/:packId', Component: OpenPackPage },
  { path: '/shop', Component: InitDataPage, title: 'Shop' },
  { path: '/marketplace', Component: InitDataPage, title: 'Marketplace' },
  
];
