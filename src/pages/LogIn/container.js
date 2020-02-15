import React, { Component } from 'react';
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
      await logIn(email, password);
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

export const LogInContainer = LogIn;
