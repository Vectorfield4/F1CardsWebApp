import { HashRouter } from 'react-router-dom';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { AvailableRoutes } from '@/navigation/AvailableRoutes';
import { BottomNav } from './Layout/BottomNav';
import { Header } from './Layout/Header';
import { isMiniAppDark, retrieveLaunchParams, useSignal } from '@telegram-apps/sdk-react';

export function App() {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform } = launchParams;
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot 
      appearance={isDark ? 'dark' : 'light'} 
      platform={['macos', 'ios'].includes(tgWebAppPlatform) ? 'ios' : 'base'}>
      <HashRouter>
        <Header />
        <AvailableRoutes />
        <BottomNav />
      </HashRouter>
    </AppRoot>
  );
}
