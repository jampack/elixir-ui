import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

import {
  getToken,
  getRefreshToken,
  unsetToken,
  tokenExist,
  setAuthCookie,
  tokenSessionOnly,
  unsetAuthCookie,
} from '@/lib/cookies/authCookies';
// import fragmentMatcher from '@/lib/apollo/Introspection/Fragments';


const URI = process.env.VUE_APP_GQL_API_URI;

const refreshTokenMutation = JSON.stringify({
  query: `mutation{
  refreshToken(data: {refresh_token: "${getRefreshToken()}"}){
    access_token
    refresh_token
    expires_in
  }
}`,
});


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: URI,
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({
      message, locations, path, extensions,
    }) => {
      // eslint-disable-next-line default-case
      switch (extensions.category) {
        case 'validation':
          return message === 'The given data was invalid.';
        case 'internal':
          if (message === 'Internal server error') {
            unsetToken();
            return true;
          }
          return false;
        default:
          console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      }
      return false;
    });
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});


const refreshTokenLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => tokenExist(),
  fetchAccessToken: async () => {
    const resp = await fetch(URI, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: refreshTokenMutation,
    });
    return resp.json();
  },
  handleResponse: (operation) => (response) => {
    if (response.data && response.data.refreshToken) {
      const { data: { refreshToken } } = response.data.refreshToken;
      setAuthCookie(refreshToken.access_token, refreshToken.refresh_token,
        refreshToken.expires_in, tokenSessionOnly());
      operation.setContext({
        headers: {
          authorization: `Bearer ${refreshToken.access_token}`,
        },
      });
      return { access_token: refreshToken.access_token };
    }
    return false;
  },
  handleError: (err) => {
    const urlLastSegment = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    // to avoid redirect loop
    if (urlLastSegment.toString() !== 'login') {
      window.location.replace('/login');
    } else {
      unsetAuthCookie();
      window.location.replace('/login');
    }

    console.warn('Your refresh token is invalid login again');
    console.error(err);
  },
});

// Cache implementation
// const cache = new InMemoryCache({ fragmentMatcher });
const cache = new InMemoryCache({ });

const links = ApolloLink.from([
  authLink,
  errorLink,
  refreshTokenLink,
  httpLink,
]);

// Create the apollo client
export default new ApolloClient({
  link: links,
  cache,
});
