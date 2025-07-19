import { lastErrorStore } from '@/store/mainScreenStore';
import { Button, Text } from '@telegram-apps/telegram-ui';

interface ErrorMessageProps {
  onRetry: () => void;
}

const styles = {
  container: {
    margin: '16px',
    padding: '12px',
    background: '#FF4444',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    alignItems: 'stretch',
  },
  text: {
    color: 'white',
    flex: 1,
  }
};

export function ErrorMessage({ onRetry }: ErrorMessageProps) {
  const { lastError } = lastErrorStore.getState();
  return (
    <div style={styles.container}>
      <Text style={styles.text}>{lastError}</Text>

      <Button size="s" mode="outline" onClick={onRetry}>
        Повторить 
      </Button>
    </div>
  );
} 