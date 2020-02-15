import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class SignUp extends Component {
  render() {
    const {
      classes,
      email,
      firstName,
      lastName,
      onInputChange,
      password,
      onSignUp
    } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSignUp}>
            <TextField
              inputProps={{ 'aria-label': 'firstName' }}
              autoFocus
              fullWidth
              label="First Name"
              margin="normal"
              name="firstName"
              onChange={onInputChange}
              required
              value={firstName}
              variant="outlined"
            />
            <TextField
              inputProps={{ 'aria-label': 'lastName' }}
              fullWidth
              label="Last Name"
              margin="normal"
              name="lastName"
              onChange={onInputChange}
              required
              value={lastName}
              variant="outlined"
            />
            <TextField
              inputProps={{ 'aria-label': 'email' }}
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onChange={onInputChange}
              required
              value={email}
              variant="outlined"
            />
            <TextField
              inputProps={{ 'aria-label': 'password' }}
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={onInputChange}
              required
              type="password"
              value={password}
              variant="outlined"
            />
            <Button
              className={classes.submit}
              data-testid="sign-up-button"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
          </form>
          <Link component={RouterLink} to="/log-in" className={classes.link}>
            Already have an acccount? Log in here.
          </Link>
        </Paper>
      </Container>
    );
  }
}

export const SignUpUI = withStyles(styles)(SignUp);
