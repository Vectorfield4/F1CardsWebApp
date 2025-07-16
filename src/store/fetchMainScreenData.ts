import { apolloClient } from '@/services/apolloClient';
import { GET_MAIN_SCREEN_DISPLAY_DATA, MainScreenDisplayData } from '@/services/queries';
import { usePlayerStore } from './playerStore';
import { useStatsStore } from './statsStore';
import { useShowcaseStore } from './showcaseStore';
import { useMainScreenStore } from './mainScreenStore';

export async function fetchMainScreenData() {
  const { setPlayer } = usePlayerStore.getState();
  const { setStats } = useStatsStore.getState();
  const { setShowcases } = useShowcaseStore.getState();
  const { setLoading, setError } = useMainScreenStore.getState();
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
    setError(e.message);
  } finally {
    setLoading(false);
  }
} 