import { HashRouter } from 'react-router-dom';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { AvailableRoutes } from '@/navigation/AvailableRoutes';
import { BottomNav } from './Layout/BottomNav';
import { Header } from './Layout/Header';
import { useLaunchParamsStore } from '@/store/launchParamsStore';

export function App() {
  const { appearance, platform } = useLaunchParamsStore();
  return (
    <AppRoot appearance={appearance} platform={platform}>
      <HashRouter>
        <Header />
        <AvailableRoutes />
        <BottomNav />
      </HashRouter>
    </AppRoot>
  );
}
