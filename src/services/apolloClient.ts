// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { initDataRaw } from '@telegram-apps/sdk-react';
import { lastErrorStore } from '@/store/mainScreenStore';

const graphqlUri = (import.meta.env.VITE_BACKEND_API || 'http://localhost:8080') + '/graphql/';
const httpLink = createHttpLink({
  uri: graphqlUri,
  fetch: async (uri, options) => {
    const { setLastError } = lastErrorStore.getState();
    const headers: Record<string, string> = {};
    
    // Жесткая проверка initData - если его нет, падаем
    const initData = initDataRaw();
    if (!initData || initData === '') {
      throw new Error('Пользователь не авторизован');
    }
    
    headers['Authorization'] = `tma ${initData}`;
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    
    var response = null;

    try {
      response = await fetch(uri, { ...options, headers }).then(res => res.json());
      return response;
    } catch (err) {
      setLastError(`GraphQL URI: ${graphqlUri}\nError: ${err}\nResponse: ${response}`);
      throw err;
    }
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 