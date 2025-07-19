import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Мокаем Telegram SDK
vi.mock('@telegram-apps/sdk-react', () => ({
  initDataRaw: vi.fn(() => 'mocked-init-data'),
  useSignal: vi.fn((value) => value),
  initDataState: vi.fn(() => ({
    user: { id: 123, first_name: 'Test User' },
    chat: { id: 456, type: 'private' },
  })),
}));

// Мокаем Apollo Client
vi.mock('@/services/apolloClient', () => ({
  apolloClient: {
    query: vi.fn(),
  },
}));

// Мокаем fetch
global.fetch = vi.fn() as any;

// Мокаем console для чистых тестов
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
} as any; 