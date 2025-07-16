import { create } from 'zustand';

interface LaunchParamsState {
  platform: 'ios' | 'base';
  appearance: 'light' | 'dark';
}

export const useLaunchParamsStore = create<LaunchParamsState>(() => ({
  platform: 'base',
  appearance: 'light',
})); 