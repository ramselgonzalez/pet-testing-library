import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ProtectedRoute, Sidebar } from '../components';
import { LogIn } from '../pages';
import { AppProvider } from '../provider';
import { routes } from '../routes';
import { styles } from './styles';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppProvider>
        <CssBaseline />
        <Sidebar />
        <Box className={classes.root}>
          <Switch>
            <Route component={LogIn} exact path="/log-in" />
            {routes.map(route => (
              <ProtectedRoute {...route} />
            ))}
          </Switch>
        </Box>
      </AppProvider>
    );
  }
}

export default withStyles(styles)(App);
