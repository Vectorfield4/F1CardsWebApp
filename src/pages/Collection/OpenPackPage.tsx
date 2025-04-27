import { Section, Cell, Image, List, Card } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import React from 'react';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';


export const UnpackingPage: FC = () => {
  return (
    <Page back={false}>

        <Section
          header="Распаковка"
          footer="Отсюда можно перейти в любой экран"
        >
          <Card type="plain">
                <React.Fragment key=".0">
                    <CardChip readOnly>
                        Hot place
                    </CardChip>
                    <img
                        alt="Dog"
                        src="https://i.imgur.com/892vhef.jpeg"
                        style={{
                            display: 'block',
                            height: 308,
                            objectFit: 'cover',
                            width: 254
                        }}
                    />
                    <CardCell readOnly subtitle="United states"> New York </CardCell>
                </React.Fragment>
            </Card>

        </Section>

    </Page>
  );
};
