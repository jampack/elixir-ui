import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
// import fragmentMatcher from '@/lib/apollo/Introspection/Fragments';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({
      message, locations, path, extensions,
    }) => {
      // eslint-disable-next-line default-case
      switch (extensions.category) {
        case 'validation':
          return message === 'The given data was invalid.';
        case 'authentication':
          return message === 'The user credentials were incorrect.';
        default:
          console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      }
      return false;
    });
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GQL_API_URI,
});

// Cache implementation
// const cache = new InMemoryCache({ fragmentMatcher });
const cache = new InMemoryCache({ });

const links = ApolloLink.from([
  errorLink,
  httpLink,
]);

// Create the apollo client
export default new ApolloClient({
  link: links,
  cache,
});
