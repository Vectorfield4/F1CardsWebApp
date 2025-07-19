import { create } from 'zustand';
import { apolloClient } from '@/services/apolloClient';
import { GET_MAIN_SCREEN_DISPLAY_DATA, MainScreenDisplayData } from '@/services/queries';
import { usePlayerStore } from './playerStore';
import { useStatsStore } from './statsStore';
import { useShowcaseStore } from './showcaseStore';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';

export const useMainScreenStore = create<{
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}>((set) => ({
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchMainScreenData: async () => {
    await fetchMainScreenData();
  },
})); 

export async function fetchMainScreenData() {
  const { setPlayer } = usePlayerStore.getState();
  const { setStats } = useStatsStore.getState();
  const { setShowcases } = useShowcaseStore.getState();
  const { setLoading, setError } = useMainScreenStore.getState();
  const initDataRaw = useSignal(_initDataRaw);
  setLoading(true);
  setError(null);
  try {
    const { data } = await apolloClient.query<{ getMainScreenDisplayData: MainScreenDisplayData }>({
      query: GET_MAIN_SCREEN_DISPLAY_DATA,
      context: { headers: {'Authorization': `tma ${initDataRaw}`} }
    });
    setPlayer(data.getMainScreenDisplayData.player);
    setStats(data.getMainScreenDisplayData.stats);
    setShowcases(data.getMainScreenDisplayData.showcase);
  } catch (e: any) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
} 