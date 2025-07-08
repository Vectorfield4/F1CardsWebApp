import { ShowcaseViewDto } from './ShowcaseViewDto';
import { Card, Button } from '@telegram-apps/telegram-ui';

interface PackCardProps {
  pack: ShowcaseViewDto;
  onOpen: (packId: string) => void;
  onBuy: () => void;
}

export const PackCard = ({ pack, onOpen, onBuy }: PackCardProps) => {
  const canOpen = pack.count > 0;

  return (
    <Card style={{ padding: '1rem', textAlign: 'center' }}>
      <img
        src={pack.imageUrl || 'https://via.placeholder.com/150'}
        alt={pack.name}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          cursor: canOpen ? 'pointer' : 'default',
          opacity: canOpen ? 1 : 0.5,
        }}
        onClick={() => canOpen && onOpen(pack.cardSetId.toString())}
      />
      <h3 style={{ marginTop: '1rem' }}>{pack.name}</h3>
      <p>В наличии: {pack.count}</p>
      <Button
        size="m"
        stretched
        onClick={onBuy}
        style={{ marginTop: '1rem' }}
      >
        Купить
      </Button>
    </Card>
  );
};