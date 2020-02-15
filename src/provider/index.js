import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hoc';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './auth';
import theme from '../constants/theme';
import client from './apollo';

const history = createBrowserHistory();

export const AppProvider = ({ children }) => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
};
