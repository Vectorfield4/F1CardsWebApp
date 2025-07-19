import { create } from 'zustand';
import { apolloClient } from '@/services/apolloClient';
import { GET_MAIN_SCREEN_DISPLAY_DATA, MainScreenDisplayData } from '@/services/queries';
import { usePlayerStore } from './playerStore';
import { useStatsStore } from './statsStore';
import { useShowcaseStore } from './showcaseStore';

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
})); 

export async function fetchMainScreenData() {
  const { setLoading, setError } = useMainScreenStore.getState();
  const { setLastError } = lastErrorStore.getState();
  const { setPlayer } = usePlayerStore.getState();
  const { setStats } = useStatsStore.getState();
  const { setShowcases } = useShowcaseStore.getState();
  
  
  setLoading(true);
  setError(null);
  
  try {
    const { data } = await apolloClient.query<{ getMainScreenDisplayData: MainScreenDisplayData }>({
      query: GET_MAIN_SCREEN_DISPLAY_DATA,
    });
    setPlayer(data.getMainScreenDisplayData.player);
    setStats(data.getMainScreenDisplayData.stats);
    setShowcases(data.getMainScreenDisplayData.showcase);
  } catch (e: any) {
    setLastError(e.message);
    setError(e.message);
  } finally {
    setLoading(false);
  }
} 
export const lastErrorStore = create<{
  lastError: string | null;
  setLastError: (error: string) => void;
}>((set) => ({
  lastError: null,
  setLastError: (error) => set({ lastError: error }),
})); 
