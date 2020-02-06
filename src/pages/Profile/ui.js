import React, { Component } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class Profile extends Component {
  render() {
    const {
      classes,
      deletedPet,
      isDeleteModalOpen,
      isSnackOpen,
      onCloseSnack,
      onConfirmDelete,
      onOpenDeleteModal,
      onToggleModal,
      selectedPet,
      user
    } = this.props;
    return (
      <>
        <header>
          <Typography variant="h5">{`Welcome, ${user.firstName}.`}</Typography>
          <Typography variant="overline">Your pets.</Typography>
        </header>
        <main>
          <Grid container direction="column" spacing={2}>
            {user.pets.map(pet => (
              <Grid item key={pet.id} xs={12} sm={8} md={6} lg={4} xl={3}>
                <Card>
                  <CardHeader
                    action={
                      <IconButton
                        color="secondary"
                        onClick={onOpenDeleteModal(pet)}
                        size="small"
                      >
                        <Close />
                      </IconButton>
                    }
                    avatar={<Avatar>{pet.name.substring(0, 1)}</Avatar>}
                    subheader={`Age: ${pet.age}`}
                    title={`${pet.name}, the ${pet.species.toLowerCase()}`}
                  />
                  <CardActions className={classes.actions}>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog onClose={onToggleModal} open={isDeleteModalOpen}>
            <DialogTitle>Delete pet?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {`Are you sure you want to delete ${selectedPet.name}?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={onToggleModal}>
                Cancel
              </Button>
              <Button onClick={onConfirmDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            action={
              <Button color="inherit" onClick={onCloseSnack}>
                Close
              </Button>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={6000}
            message={`You have successfully deleted ${deletedPet}.`}
            onClose={onCloseSnack}
            open={isSnackOpen}
          />
        </main>
      </>
    );
  }
}

export const ProfileUI = withStyles(styles)(Profile);
