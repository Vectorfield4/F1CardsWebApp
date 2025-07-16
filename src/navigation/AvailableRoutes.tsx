import { Route, Routes } from 'react-router-dom';
import { IndexScreen } from '@/pages/IndexScreen';
import { CollectionScreen } from '@/pages/CollectionScreen'; 
import { RouteTemplate } from './RouteTemplate';

export const routes: RouteTemplate[] = [
  { path: '/', Component: IndexScreen },
  { path: '/collection', Component: CollectionScreen, title: 'Collection' },
  //{ path: '/collection/open-pack/:packId', Component: OpenPackPage },
  //{ path: '/collection/card/:cardId', Component: PlayerCardPage, title: 'Card Details' },
  //{ path: '/collection/card/:cardId/upgrade', Component: UpgradeCardPage, title: 'Upgrade Card' },
  // { path: '/collection/card/:cardId/disassemble', Component: RecyclePage, title: 'Disassemble Card' },
  //{ path: '/pack/:packId', Component: PackPage, title: 'Pack' },
  //{ path: '/premium-shop', Component: PremiumShopPage, title: 'Premium Shop' },
  //{ path: '/packs/:packId/purchase-result', Component: PackPurchaseResultScreen, title: 'Pack Purchase Result' },
  //{ path: '/packs/:packId', Component: PackPurchaseScreen, title: 'Pack Purchase' },
  //{ path: '/shop', Component: InitDataPage, title: 'Shop' },
  //{ path: '/marketplace', Component: InitDataPage, title: 'Marketplace' },
];

export const AvailableRoutes = () => <Routes>
  {routes.map((route) => (
    <Route 
      key={route.path} 
      path={route.path} 
      element={<route.Component />} 
    />
  ))}
</Routes>


