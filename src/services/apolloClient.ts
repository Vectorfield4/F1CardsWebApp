// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { authService } from './authService';

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

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 