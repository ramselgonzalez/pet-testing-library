import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const isAuth = !!localStorage.getItem('token');
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/log-in" />
        }
      />
    );
  }
}
