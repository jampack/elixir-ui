import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { getToken } from '@/lib/cookies/authCookies';

// HTTP connection to the API
const uploadLink = createUploadLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GQL_API_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export default new ApolloClient({
  link: authLink.concat(uploadLink),
  cache,
});
