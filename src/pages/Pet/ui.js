import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { toys } from '../../constants/toys';
import { styles } from './styles';

class Pet extends Component {
  state = {
    labelWidth: 0
  };

  onFocus = () => {
    this.setState({ labelWidth: 36 });
  };

  render() {
    const {
      classes,
      description,
      error,
      isAddModalOpen,
      isSnackOpen,
      loading,
      onCloseSnack,
      onInputChange,
      onToggleAddModal,
      onSubmitToy,
      pet,
      toy
    } = this.props;
    const { labelWidth } = this.state;

    if (loading) {
      return <Typography variant="h5">Loading...</Typography>;
    }
    if (error) {
      return <Typography variant="h5">Something went wrong.</Typography>;
    }

    return (
      <>
        <header>
          <Typography variant="h5">{pet.name}</Typography>
          <Typography variant="overline">{`Age: ${pet.age}`}</Typography>
        </header>
        <main>
          {pet.toys.length > 0 && (
            <List className={classes.list}>
              {pet.toys.map((t, idx, { length }) => (
                <React.Fragment key={t.id}>
                  <ListItem key={t.id}>
                    <ListItemText primary={t.name} secondary={t.description} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Close />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {idx !== length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          )}
          <Button onClick={onToggleAddModal} variant="contained">
            Add a toy
          </Button>
          <Dialog
            aria-labelledby="add-toy-title"
            PaperProps={{ component: 'form' }}
            onClose={onToggleAddModal}
            onSubmit={onSubmitToy}
            open={isAddModalOpen}
          >
            <DialogTitle id="add-toy-title">Add A Toy</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add one of your pet's favorite toys to their profile.
              </DialogContentText>
              <FormControl
                data-testid="pet-toy-select"
                fullWidth
                margin="normal"
                required
                variant="outlined"
              >
                <InputLabel id="pet-toy-label">Toy</InputLabel>
                <Select
                  inputProps={{
                    'aria-label': 'pet-toy'
                  }}
                  id="pet-toy"
                  labelId="pet-toy-label"
                  labelWidth={labelWidth}
                  name="toy"
                  onChange={onInputChange}
                  onFocus={this.onFocus}
                  required
                  value={toy}
                >
                  <MenuItem value="">None</MenuItem>
                  {toys.map(t => (
                    <MenuItem key={t.key} value={t.value}>
                      {t.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                inputProps={{ 'aria-label': 'description' }}
                label="Description"
                margin="normal"
                variant="outlined"
                name="description"
                onChange={onInputChange}
                value={description}
              />
              <DialogActions>
                <Button onClick={onToggleAddModal}>Cancel</Button>
                <Button data-testid="add-toy-button" type="submit">
                  Add
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Snackbar
            action={
              <Button color="inherit" onClick={onCloseSnack}>
                Close
              </Button>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={6000}
            message="You have successfully added a toy."
            onClose={onCloseSnack}
            open={isSnackOpen}
          />
        </main>
      </>
    );
  }
}

export const PetUI = withStyles(styles)(Pet);
