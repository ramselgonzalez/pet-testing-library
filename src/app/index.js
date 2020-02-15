import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../provider/auth';
import { LogIn, SignUp } from '../pages';
import { Sidebar } from '../components';
import { routes } from '../routes';
import { Pet } from '../pages';
import { styles } from './styles';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AuthContext.Consumer>
        {context => (
          <>
            <CssBaseline />
            {context.isAuthenticated ? (
              <>
                <Sidebar />
                <Box className={classes.root}>
                  <Switch>
                    {routes.map(route => (
                      <Route {...route} />
                    ))}
                    <Route component={Pet} exact path="/pet/:petId" />
                    <Redirect to="/profile" />
                  </Switch>
                </Box>
              </>
            ) : (
              <Box className={classes.authContainer}>
                <Switch>
                  <Route
                    render={props => <LogIn {...props} logIn={context.logIn} />}
                    path="/log-in"
                  />
                  <Route
                    render={props => (
                      <SignUp {...props} signUp={context.signUp} />
                    )}
                    path="/sign-up"
                  />
                  <Redirect to="/log-in" />
                </Switch>
              </Box>
            )}
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withStyles(styles)(App);
