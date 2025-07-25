import { App } from '@/components/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/services/apolloClient';

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
    <ApolloProvider client={apolloClient}>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <App/>
      </ErrorBoundary>
    </ApolloProvider>
  );
}
