import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/components/Root.tsx';
import { init } from '@/init.ts';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform } = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug') || import.meta.env.DEV;

  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(tgWebAppPlatform),
    mockForMacOS: tgWebAppPlatform === 'macos',
  })
    .then(() => {
      root.render(
        <StrictMode>
          <Root/>
        </StrictMode>,
      );
    });
} catch (e) {
  root.render(<b>Telegram not found</b>);
}
