import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ProtectedRoute, Sidebar } from '../components';
import { LogIn, Pet } from '../pages';
import { routes } from '../routes';
import { styles } from './styles';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <Sidebar />
        <Box className={classes.root}>
          <Switch>
            <Route component={LogIn} exact path="/log-in" />
            {routes.map(route => (
              <ProtectedRoute {...route} />
            ))}
            <Route component={Pet} exact path="/pet/:petId"/>
          </Switch>
        </Box>
      </>
    );
  }
}

export default withStyles(styles)(App);
