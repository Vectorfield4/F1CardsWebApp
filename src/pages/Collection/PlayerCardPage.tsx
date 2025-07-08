
import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/components/Page';

export const PlayerCardPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page>
      <h1>Player Card Page</h1>
      <p>Card ID: {id}</p>
    </Page>
  );
};

