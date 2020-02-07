import React, { Component } from 'react';
import { withPet } from '../../data/hoc';
import { PetUI } from './ui';

class Pet extends Component {
    render() {
        const { error, loading, pet } = this.props;
        return <PetUI error={error} loading={loading} pet={pet} />
    }
}

export const PetContainer = withPet(Pet);