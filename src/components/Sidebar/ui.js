import React, { Component } from 'react';
import { Box, Drawer, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class Sidebar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Drawer
                anchor="left"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
                variant="permanent"
            >
                <Box className={classes.title}>
                    <Typography variant="overline">
                        Dog Testing Library
                    </Typography>
                </Box>
            </Drawer>
        );
    }
}

export const SidebarUI = withStyles(styles)(Sidebar);
