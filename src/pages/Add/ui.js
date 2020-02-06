import React, { Component } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { species as speciesValues } from '../../constants/species';
import { styles } from './styles';

class Add extends Component {
  render() {
    const {
      addedPet,
      age,
      classes,
      isSnackOpen,
      isSubmitting,
      name,
      onCloseSnack,
      onInputChange,
      onSubmit,
      species
    } = this.props;
    return (
      <>
        <header>
          <Typography component="h1" variant="h5">
            Add A Pet.
          </Typography>
          <Typography variant="overline">Add a pet to your profile!</Typography>
        </header>
        <Paper className={classes.paper} component="main">
          <form noValidate onSubmit={onSubmit}>
            <TextField
              autoFocus
              disabled={isSubmitting}
              fullWidth
              id="pet-name"
              label="Name"
              margin="normal"
              name="name"
              onChange={onInputChange}
              required
              value={name}
              variant="outlined"
            />
            <FormControl fullWidth margin="normal" required variant="outlined">
              <InputLabel id="pet-species-label">Species</InputLabel>
              <Select
                disabled={isSubmitting}
                id="pet-species"
                labelId="pet-species-label"
                name="species"
                onChange={onInputChange}
                value={species}
              >
                <MenuItem value="">None</MenuItem>
                {speciesValues.map(s => (
                  <MenuItem key={s.key} value={s.value}>
                    {s.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              disabled={isSubmitting}
              fullWidth
              id="pet-age"
              label="Age"
              margin="normal"
              name="age"
              onChange={onInputChange}
              required
              type="number"
              value={age}
              variant="outlined"
            />
            <Button
              className={classes.submit}
              fullWidth
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Paper>
        <Snackbar
          action={
            <Button color="inherit" onClick={onCloseSnack}>
              Close
            </Button>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={6000}
          message={`You have successfully added ${addedPet}.`}
          onClose={onCloseSnack}
          open={isSnackOpen}
        />
      </>
    );
  }
}

export const AddUI = withStyles(styles)(Add);
