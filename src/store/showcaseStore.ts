import { create } from 'zustand';
import { MainScreenShowcaseItem } from '@/services/queries';

export const useShowcaseStore = create<{
  showcases: MainScreenShowcaseItem[];
  setShowcases: (showcases: MainScreenShowcaseItem[]) => void;
}>((set) => ({
  showcases: [],
  setShowcases: (showcases) => set({ showcases }),
})); 