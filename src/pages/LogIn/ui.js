import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
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
              autoFocus
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
        </Paper>
      </Container>
    );
  }
}

export const LogInUI = withStyles(styles)(LogIn);
