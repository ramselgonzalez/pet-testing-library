import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class LogIn extends Component {
  render() {
    const { classes, email, onInputChange, onLogIn, password } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate onSubmit={onLogIn}>
            <TextField
              inputProps={{ 'aria-label': 'email' }}
              autoFocus
              fullWidth
              label="Email Address"
              id="email"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              className={classes.submit}
              fullWidth
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </form>
          <Link component={RouterLink} to="/sign-up" className={classes.link}>
            Don't have an account? Sign Up
          </Link>
        </Paper>
      </Container>
    );
  }
}

export const LogInUI = withStyles(styles)(LogIn);
