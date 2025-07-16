import { useMemo, useState, useEffect } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot, Spinner } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';
import { BottomNav } from './BottomNav/BottomNav';
import { Header } from './Header/Header';
import { authService } from '@/services/authService';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.restoreSession();
      } catch (error) {
        console.error('Failed to restore session on startup', error);
      } finally {
        setIsAuthReady(true);
      }
    };
    checkAuth();
  }, []);

  if (!isAuthReady) {
    return (
      <AppRoot>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <Spinner size="l" />
        </div>
      </AppRoot>
    );
  }

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
