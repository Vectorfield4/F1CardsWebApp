import { create } from 'zustand';
import { MainScreenStat } from '@/services/queries';

export const useStatsStore = create<{
  stats: MainScreenStat[];
  setStats: (stats: MainScreenStat[]) => void;
}>((set) => ({
  stats: [],
  setStats: (stats) => set({ stats }),
})); 