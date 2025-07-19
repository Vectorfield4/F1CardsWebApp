import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePlayerStore } from '../../src/store/playerStore';
import { useStatsStore } from '../../src/store/statsStore';
import { useShowcaseStore } from '../../src/store/showcaseStore';

describe('Player Store', () => {
  beforeEach(() => {
    usePlayerStore.setState({ player: null });
  });

  it('should update player state', () => {
    const { result } = renderHook(() => usePlayerStore());
    
    expect(result.current.player).toBe(null);
    
    const testPlayer = { id: '1', username: 'testuser' };
    act(() => {
      result.current.setPlayer(testPlayer);
    });
    
    expect(result.current.player).toEqual(testPlayer);
  });
});

describe('Stats Store', () => {
  beforeEach(() => {
    useStatsStore.setState({ stats: [] });
  });

  it('should update stats state', () => {
    const { result } = renderHook(() => useStatsStore());
    
    expect(result.current.stats).toEqual([]);
    
    const testStats = [{ type: 'wins', value: '10' }];
    act(() => {
      result.current.setStats(testStats);
    });
    
    expect(result.current.stats).toEqual(testStats);
  });
});

describe('Showcase Store', () => {
  beforeEach(() => {
    useShowcaseStore.setState({ showcases: [] });
  });

  it('should update showcases state', () => {
    const { result } = renderHook(() => useShowcaseStore());
    
    expect(result.current.showcases).toEqual([]);
    
    const testShowcases = [{ cardSet: { id: '1', name: 'Test Pack' }, isOwned: true }];
    act(() => {
      result.current.setShowcases(testShowcases);
    });
    
    expect(result.current.showcases).toEqual(testShowcases);
  });
}); 