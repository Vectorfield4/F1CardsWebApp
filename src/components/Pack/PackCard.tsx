import { Card, Text, Button, List } from '@telegram-apps/telegram-ui';
import { Pack } from './Pack';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

interface PackCardProps {
  pack: Pack;
  onOpen?: () => void; // Не для empty-паков
  onBuy?: () => void;  // Только для empty/premium
}

export const PackCard = ({ pack, onOpen, onBuy }: PackCardProps) => (
  <List>  
    <Card>
      {/* Изображение или заглушка */}
      {pack.image ? (
        <img 
          src={pack.image} 
          alt={pack.name}
          onClick={pack.type !== 'empty' ? onOpen : undefined}
          style={{ cursor: pack.type !== 'empty' ? 'pointer' : 'default' }}
        />
      ) : (
        <div style={{ background: '#eee', height: '120px' }} />
      )}

      <CardCell readOnly>
        <Text weight="2">{pack.name}</Text>
      </CardCell>
      
      {pack.type === 'free' && (
        <Button size="s" stretched onClick={onOpen}>
          Получить
        </Button>
      )}

      {pack.type === 'premium' && pack.ownedCount && (
        <Button size="s" stretched onClick={onBuy}>
          Купить ещё (осталось: {pack.ownedCount})
        </Button>
      )}

      {pack.type === 'empty' && (
        <Button size="s" stretched onClick={onBuy}>
          Купить
        </Button>
      )}
    </Card>
    
  </List>
);