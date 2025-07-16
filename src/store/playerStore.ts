import { create } from 'zustand';
import { MainScreenPlayer } from '@/services/queries';

export const usePlayerStore = create<{
  player: MainScreenPlayer | null;
  setPlayer: (player: MainScreenPlayer) => void;
}>((set) => ({
  player: null,
  setPlayer: (player) => set({ player }),
})); 