import React, { Component } from 'react';
import { withPet, withAddToy } from '../../data/hoc';
import { formatPet } from '../../selectors';
import { PetUI } from './ui';

const DEFAULT_FORM = {
  description: '',
  toy: ''
};
class Pet extends Component {
  state = {
    isAddModalOpen: false,
    isSnackOpen: false,
    isSubmitting: false,
    ...DEFAULT_FORM
  };

  handleCloseSnack = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackOpen: false, addedToy: '' });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitToy = async e => {
    const { description, toy } = this.state;
    const { addToy, pet } = this.props;
    e.preventDefault();

    try {
      this.setState({ isSubmitting: true });
      await addToy(pet.id, description, toy);
      this.setState({
        isAddModalOpen: false,
        isSubmitting: false,
        isSnackOpen: true,
        ...DEFAULT_FORM
      });
    } catch (err) {
      throw err;
    }
  };

  handleToggleAddModal = () => {
    const { isAddModalOpen } = this.state;
    this.setState({ isAddModalOpen: !isAddModalOpen });
  };

  render() {
    const { error, loading, pet } = this.props;
    const { description, isAddModalOpen, isSnackOpen, toy } = this.state;
    return (
      <PetUI
        description={description}
        error={error}
        isAddModalOpen={isAddModalOpen}
        isSnackOpen={isSnackOpen}
        loading={loading}
        onCloseSnack={this.handleCloseSnack}
        onInputChange={this.handleInputChange}
        onSubmitToy={this.handleSubmitToy}
        onToggleAddModal={this.handleToggleAddModal}
        pet={formatPet(pet)}
        toy={toy}
      />
    );
  }
}

export const PetContainer = withPet(withAddToy(Pet));
