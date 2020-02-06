import React, { Component } from 'react';
import { withLogIn } from '../../data/hoc';
import { LogInUI } from './ui';

class LogIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogIn = async e => {
    const { history, logIn } = this.props;
    const { email, password } = this.state;
    e.preventDefault();

    try {
      const user = await logIn(email, password);
      if (!user) {
        throw new Error('Something went wrong.');
      }
      localStorage.setItem('token', user.token);
      history.push('/profile');
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <LogInUI
        email={email}
        onInputChange={this.handleInputChange}
        onLogIn={this.handleLogIn}
        password={password}
      />
    );
  }
}

export const LogInContainer = withLogIn(LogIn);
