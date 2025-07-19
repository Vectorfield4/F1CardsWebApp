// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { initDataRaw } from '@telegram-apps/sdk-react';

const graphqlUri = import.meta.env.VITE_BACKEND_API || 'http://localhost:8080/graphql';
const httpLink = createHttpLink({
  uri: graphqlUri,
  fetch: async (uri, options) => {
    const headers: Record<string, string> = {};
    
    // Добавляем авторизацию если доступна
    try {
      const initData = initDataRaw();
      if (initData) {
        headers['Authorization'] = `tma ${initData}`;
      }
    } catch (err) {
      // Игнорируем ошибки получения initData
    }
    
    try {
      return await fetch(uri, { ...options, headers });
    } catch (err) {
      console.error('Request headers:', headers);
      throw err;
    }
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 