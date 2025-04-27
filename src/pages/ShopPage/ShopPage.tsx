import { Card, Cell, Section } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

export const ShopPage: FC = () => {
  return (
    <Section>
      <Cell>
        <Card>
          <h2>Гонщики</h2>
          <p>Карты с гонщиками</p>
        </Card>
      </Cell>
      <Cell>
        <Card>
          <h2>Паки</h2>
          <p>Паки с картами</p>
        </Card>
      </Cell>
    </Section>
  );
};
