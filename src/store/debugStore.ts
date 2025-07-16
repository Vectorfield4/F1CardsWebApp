import { create } from 'zustand';

interface DebugState {
  headers: Record<string, string> | null;
  setHeaders: (headers: Record<string, string>) => void;
}

export const useDebugStore = create<DebugState>((set) => ({
  headers: null,
  setHeaders: (headers) => set({ headers }),
})); 