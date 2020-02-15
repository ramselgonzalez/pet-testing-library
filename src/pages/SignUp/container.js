import React, { Component } from 'react';
import { SignUpUI } from './ui';

class SignUp extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUp = async e => {
    const { history, signUp } = this.props;
    const { email, firstName, lastName, password } = this.state;
    e.preventDefault();

    try {
      await signUp(firstName, lastName, email, password);
      history.push('/log-in');
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { email, firstName, lastName, password } = this.state;
    return (
      <SignUpUI
        email={email}
        firstName={firstName}
        lastName={lastName}
        onInputChange={this.handleInputChange}
        onSignUp={this.handleSignUp}
        password={password}
      />
    );
  }
}

export const SignUpContainer = SignUp;
