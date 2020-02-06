import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  let authorization = '';

  if (token) {
    authorization = `Bearer ${token}`;
  }

  return {
    headers: {
      ...headers,
      authorization
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
