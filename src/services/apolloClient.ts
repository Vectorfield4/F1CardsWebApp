// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useLaunchParamsStore } from '@/store/launchParamsStore';

const graphqlUri = import.meta.env.VITE_BACKEND_API || 'http://localhost:8080/graphql';
const httpLink = createHttpLink({
  uri: graphqlUri,
  fetch: async (uri, options) => {
    const { headers } = useLaunchParamsStore.getState();
    
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