import { create } from 'zustand';
import { initDataRaw, initDataState } from '@telegram-apps/sdk-react';

interface InitData {
  user: any;
  auth_date: string | null;
  hash: string | null;
  signature?: string | null;
  [key: string]: any;
}

interface LaunchParamsState {
  platform: 'ios' | 'base';
  appearance: 'light' | 'dark';
  initDataRaw: string | null;
  initDataState: InitData | null;
  headers: Record<string, string>;
  initFromTelegram: () => void;
}

export const useLaunchParamsStore = create<LaunchParamsState>((set) => {
  const raw = initDataRaw();
  const stateRaw = initDataState();
  var headers = import.meta.env.VITE_TELEGRAM_INIT_DATA_RAW 
    ? { 'Authorization': `tma ${import.meta.env.VITE_TELEGRAM_INIT_DATA_RAW}` } 
    : { 'Authorization': `tma ${raw}` };

  return {
    platform: 'base',
    appearance: 'light',
    initDataRaw: null,
    initDataState: null,
    headers,
    initFromTelegram: () => {
    
      let state: InitData | null = null;

      if ((!stateRaw || !stateRaw.user) && raw) {
        try {
          const params = new URLSearchParams(raw);
          const userStr = params.get('user');
          const auth_date = params.get('auth_date');
          const hash = params.get('hash');
          const signature = params.get('signature');
          if (userStr) {
            state = {
              user: JSON.parse(decodeURIComponent(userStr)),
              auth_date: auth_date || null,
              hash: hash || null,
              signature: signature || null,
            };
          }
        } catch {}
      } else if (stateRaw && stateRaw.user) {
        // Приводим auth_date к строке, если это Date
        let auth_date: string | null = null;
        if (stateRaw.auth_date instanceof Date) {
          auth_date = stateRaw.auth_date.toISOString();
        } else if (typeof stateRaw.auth_date === 'string') {
          auth_date = stateRaw.auth_date;
        }
        state = {
          ...stateRaw,
          auth_date,
          user: stateRaw.user ?? undefined, // user всегда присутствует
        };
      }

      set({
        initDataRaw: raw,
        initDataState: state,
        headers,
      });
    },
  };
}); 