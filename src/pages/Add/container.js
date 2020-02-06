import React, { Component } from 'react';
import { withAddPet } from '../../data/hoc';
import { AddUI } from './ui';

const DEFAULT_FORM = {
  age: '',
  name: '',
  species: ''
};

class Add extends Component {
  state = {
    ...DEFAULT_FORM,
    addedPet: '',
    isSnackOpen: false,
    isSubmitting: false
  };

  handleCloseSnack = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackOpen: false, addedPet: '' });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    const { addPet } = this.props;
    const { age, name, species } = this.state;
    e.preventDefault();
    const ageAsNumber = parseInt(age, 10);
    try {
      this.setState({ isSubmitting: true });
      await addPet(ageAsNumber, name, species);
      this.setState({
        ...DEFAULT_FORM,
        addedPet: name,
        isSnackOpen: true,
        isSubmitting: false
      });
    } catch (err) {
      throw err;
    }
  };

  render() {
    const {
      addedPet,
      age,
      isSnackOpen,
      isSubmitting,
      name,
      species
    } = this.state;
    return (
      <AddUI
        addedPet={addedPet}
        age={age}
        isSnackOpen={isSnackOpen}
        isSubmitting={isSubmitting}
        name={name}
        onCloseSnack={this.handleCloseSnack}
        onInputChange={this.handleInputChange}
        onSubmit={this.handleSubmit}
        species={species}
      />
    );
  }
}

export const AddContainer = withAddPet(Add);
