import React, { Component } from 'react';
import { withLogIn, withSignUp } from '../graphql/hoc';
export const AuthContext = React.createContext();

class AuthProviderContainer extends Component {
  state = {
    isAuthenticated: !!localStorage.getItem('token')
  };

  handleLogIn = async (email, password) => {
    const { logIn } = this.props;
    try {
      const user = await logIn(email, password);
      if (!user) {
        throw new Error('Your email or password was incorrect');
      }
      localStorage.setItem('token', user.token);
      this.setState({ isAuthenticated: true });
    } catch (err) {
      throw err;
    }
  };

  handleLogOut = () => {
    localStorage.removeItem('token');
    this.setState({ isAuthenticated: false });
  };

  handleSignUp = async (firstName, lastName, email, password) => {
    const { signUp } = this.props;
    try {
      const user = await signUp(firstName, lastName, email, password);
      if (!user) {
        throw new Error('A user could not be retrieved from sign up.');
      }
      return user;
    } catch (err) {
      throw err;
    }
  };

  render() {
    const { children } = this.props;
    const { isAuthenticated } = this.state;
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          logIn: this.handleLogIn,
          logOut: this.handleLogOut,
          signUp: this.handleSignUp
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const AuthProvider = withLogIn(withSignUp(AuthProviderContainer));
