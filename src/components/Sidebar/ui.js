import React, { Component } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { styles } from './styles';

class Sidebar extends Component {
  render() {
    const { classes, onLogOut } = this.props;
    return (
      <Drawer
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
      >
        <Box className={classes.title} component={Link} to="/log-in">
          <Typography variant="overline">Pet Testing Library</Typography>
        </Box>
        <List className={classes.navList}>
          {routes.map(route => (
            <ListItem button component={Link} to={route.path} key={route.key}>
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              <ListItemText className={classes.navItem} primary={route.title} />
            </ListItem>
          ))}
        </List>
        <Box className={classes.signOut}>
          <ListItem button onClick={onLogOut}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Box>
      </Drawer>
    );
  }
}

export const SidebarUI = withStyles(styles)(Sidebar);
