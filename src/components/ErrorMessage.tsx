import { initDataRaw } from '@telegram-apps/sdk-react';
import { Button, Text } from '@telegram-apps/telegram-ui';

interface ErrorMessageProps {
  error: string;
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
  },
  pre: {
    color: '#fff',
    background: '#222',
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    margin: 0,
  },
};

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {

  return (
    <div style={styles.container}>
      <Text style={styles.text}>{error}</Text>
      {initDataRaw && (
        <pre style={styles.pre}>
          {JSON.stringify(initDataRaw, null, 2)}
        </pre>
      )}
      <Button size="s" mode="outline" onClick={onRetry}>
        Повторить 
      </Button>
    </div>
  );
} 