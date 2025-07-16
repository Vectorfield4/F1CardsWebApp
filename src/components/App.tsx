import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';
import { BottomNav } from './Layout/BottomNav';
import { Header } from './Layout/Header';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <Header />
        <Routes>
          <Route>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.Component />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <BottomNav />
      </HashRouter>
    </AppRoot>
  );
}
