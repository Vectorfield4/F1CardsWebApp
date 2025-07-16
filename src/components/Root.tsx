import { App } from '@/components/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const graphqlUri = import.meta.env.VITE_BACKEND_API || 'http://localhost:8080/graphql';

const client = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <App/>
      </ErrorBoundary>
    </ApolloProvider>
  );
}
