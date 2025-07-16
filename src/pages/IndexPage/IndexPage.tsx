import { Link } from '@/components/Link/Link';
import { useQuery, ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { GET_MAIN_SCREEN_DISPLAY_DATA, MainScreenDisplayData } from '@/services/queries';
import { authService } from '@/services/authService';
import { Spinner } from '@telegram-apps/telegram-ui';

const graphqlUri = import.meta.env.VITE_BACKEND_API || 'http://localhost:8080/graphql';

const httpLink = createHttpLink({
  uri: graphqlUri,
  fetch: (uri, options) => {
    const headers: Record<string, string> = options?.headers ? { ...options.headers as Record<string, string> } : {};
    const tma = authService.getInitData();
    if (tma) headers['Authorization'] = `tma ${tma}`;
    return fetch(uri, { ...options, headers });
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export function IndexPage() {
  const { data, loading, error } = useQuery<{ getMainScreenDisplayData: MainScreenDisplayData }>(GET_MAIN_SCREEN_DISPLAY_DATA);

  if (loading || error || !data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spinner size="l" />
      </div>
    );
  }

  const { player, stats, showcase } = data.getMainScreenDisplayData;

  return (
    <ApolloProvider client={client}>
      <div>
        <div className='links'>
          <Link to='/collection'>Моя коллекция</Link>
          <Link to='/shop'>Магазин</Link>
          <Link to='/marketplace'>Маркетплейс</Link>
        </div>
        <div style={{ margin: '24px 0' }}>
          <h2>Игрок: {player.username}</h2>
        </div>
        <div>
          <h3>Showcase</h3>
          <ul>
            {showcase.map((item) => (
              <li key={item.cardSet.id}>
                {item.cardSet.name} {item.isOwned ? '(Владеет)' : '(Нет)'}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Статистика игрока</h3>
          <ul>
            {stats.map((s) => (
              <li key={s.type}>{s.type}: {s.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </ApolloProvider>
  );
}