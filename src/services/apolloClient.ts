// ВАЖНО: Все типы и структуры данных для GraphQL-запросов и мутаций должны основываться на src/services/queries.ts
// Это основной источник правды для типов данных Apollo Client в проекте.
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useLaunchParamsStore } from '@/store/launchParamsStore';
import { useDebugStore } from '@/store/debugStore';

const graphqlUri = import.meta.env.VITE_BACKEND_API || 'http://localhost:8080/graphql';
const debugStore = useDebugStore();
const httpLink = createHttpLink({
  uri: graphqlUri,
  fetch: async (uri, options) => {
    let headers: Record<string, string> = options?.headers ? { ...options.headers as Record<string, string> } : {};
    const { headers: storeHeaders } = useLaunchParamsStore.getState();
    if (storeHeaders) headers = { ...headers, ...storeHeaders };
    try {
      return await fetch(uri, { ...options, headers });
    } catch (err) {
      // Сохраняем headers в debugStore (client-side only)
      if (debugStore?.setHeaders) {
        debugStore.setHeaders(headers);
      }
      console.error('Request headers:', headers);
      throw err;
    }
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 