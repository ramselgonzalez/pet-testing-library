import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class Pet extends Component {
    render() {
        const { error, loading, pet } = this.props;
        if (loading) {
            return <Typography variant="h5">Loading...</Typography>
        }
        if (error) {
            return <Typography variant="h5">Something went wrong.</Typography>
        }

        return (
            <>
                <Typography variant="h5">{pet.name}'s Profile Page</Typography>
            </>
        )
    }
}

export const PetUI = withStyles(styles)(Pet);