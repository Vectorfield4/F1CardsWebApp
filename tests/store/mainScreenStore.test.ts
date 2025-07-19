import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMainScreenStore, fetchMainScreenData } from '../../src/store/mainScreenStore';
import { apolloClient } from '../../src/services/apolloClient';

// Мокаем Apollo Client
vi.mocked(apolloClient.query).mockResolvedValue({
  data: {
    getMainScreenDisplayData: {
      player: { id: '1', username: 'testuser' },
      stats: [{ type: 'wins', value: '10' }],
      showcase: [{ cardSet: { id: '1', name: 'Test Pack' }, isOwned: true }],
    },
  },
} as any);

describe('mainScreenStore', () => {
  beforeEach(() => {
    // Очищаем состояние перед каждым тестом
    useMainScreenStore.setState({ loading: false, error: null });
  });

  it('should update loading state reactively', () => {
    const { result } = renderHook(() => useMainScreenStore());
    
    expect(result.current.loading).toBe(false);
    
    act(() => {
      result.current.setLoading(true);
    });
    
    expect(result.current.loading).toBe(true);
  });

  it('should update error state', () => {
    const { result } = renderHook(() => useMainScreenStore());
    
    expect(result.current.error).toBe(null);
    
    act(() => {
      result.current.setError('Test error');
    });
    
    expect(result.current.error).toBe('Test error');
  });

  it('should fetch main screen data successfully', async () => {
    const { result } = renderHook(() => useMainScreenStore());
    
    expect(result.current.loading).toBe(false);
    
    await act(async () => {
      await fetchMainScreenData();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(apolloClient.query).toHaveBeenCalledWith({
      query: expect.any(Object),
    });
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(apolloClient.query).mockRejectedValueOnce(new Error(errorMessage));
    
    const { result } = renderHook(() => useMainScreenStore());
    
    await act(async () => {
      await fetchMainScreenData();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });
}); 