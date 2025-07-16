import { Spinner, Text } from '@telegram-apps/telegram-ui';

export function SpinnerBlock({ text = 'Загружаем игровые данные...' }: { text?: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Spinner size="l" />
      <Text>{text}</Text>
    </div>
  );
} 