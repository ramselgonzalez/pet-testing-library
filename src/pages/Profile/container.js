import React, { Component } from 'react';
import { withDeletePet, withUser } from '../../data/hoc';
import { ProfileUI } from './ui';

const DEFAULT_PET = {
    id: '1',
    age: 0,
    name: 'this pet',
    species: 'DOG'
};

class Profile extends Component {
    state = {
        isDeleteModalOpen: false,
        isSnackOpen: false,
        deletedPet: false,
        selectedPet: {
            ...DEFAULT_PET
        }
    };

    handleCloseSnack = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ isSnackOpen: false, deletedPet: '' });
    };

    handleToggleModal = () => {
        const { isDeleteModalOpen } = this.state;
        this.setState({ isDeleteModalOpen: !isDeleteModalOpen });
    };

    handleOpenDeleteModal = selectedPet => () => {
        this.setState({ isDeleteModalOpen: true, selectedPet });
    };

    handleConfirmDelete = async () => {
        const { deletePet } = this.props;
        const { selectedPet } = this.state;
        if (!selectedPet.id) {
            throw new Error('No pet with a corresponding id is selected.');
        }
        try {
            await deletePet(selectedPet.id);
            this.setState({
                isDeleteModalOpen: false,
                selectedPet: DEFAULT_PET,
                isSnackOpen: true,
                deletedPet: selectedPet.name
            });
        } catch (err) {
            throw err;
        }
    };

    render() {
        const { data } = this.props;
        const {
            deletedPet,
            isDeleteModalOpen,
            isSnackOpen,
            selectedPet
        } = this.state;
        const { loading, user } = data;
        return (
            <ProfileUI
                deletedPet={deletedPet}
                isDeleteModalOpen={isDeleteModalOpen}
                isSnackOpen={isSnackOpen}
                loading={loading}
                onCloseSnack={this.handleCloseSnack}
                onConfirmDelete={this.handleConfirmDelete}
                onOpenDeleteModal={this.handleOpenDeleteModal}
                onToggleModal={this.handleToggleModal}
                selectedPet={selectedPet}
                user={user}
            />
        );
    }
}

export const ProfileContainer = withUser(withDeletePet(Profile));
