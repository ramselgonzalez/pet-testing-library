import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GetUser, DeletePet } from '../../data/queries';
import { Profile } from '.';

const mockPet = { id: '1', age: 1, name: 'Ike', species: 'DOG' };
const mockUser = { id: '1', firstName: 'Ramsel', lastName: 'Gonzalez', email: 'ramsel@gmail.com', pets: [mockPet]}
const mocks = [
    {
        request: { query: GetUser },
        result: { data: { user: mockUser } }
    },
    {
        request: { 
            query: DeletePet,
            variables: { id: '1' }
        },
        result: { data: { deletePet: mockPet } }
    }
];

test('it renders the page successfully', async () => {
    const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        </MockedProvider>
    );
    // test the initial loading state as apollo fetches the user data
    const loadingElement = getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
    // waits for the async GetUser call to finish and finds the heading.
    const headingElement = await waitForElement(() =>
        getByText(/welcome, ramsel./i)
    );
    expect(headingElement).toBeInTheDocument();
});

test('it renders a list of pets that can be deleted', async () => {
    const { getByTestId, getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        </MockedProvider>
    );
    
    // wait for the async GetUser call to resolve and find a pet card.
    const petCardElement = await waitForElement(() => getByText(/ike/i));
    expect(petCardElement).toBeInTheDocument();
    
    // find the delete pet button on the card.
    const deletePetButton = getByTestId('delete-button-ike');
    expect(deletePetButton).toBeInTheDocument();

    fireEvent.click(deletePetButton);
    // assert that the modal appears by finding the confirm delete button.
    const confirmDeleteButton = getByTestId('confirm-delete-button');
    expect(confirmDeleteButton).toBeInTheDocument();

    fireEvent.click(confirmDeleteButton);
    
    // assert that the deletion was successful and the notification appears in the DOM.
    const deleteConfirmation = await waitForElement(() => getByText(/you have successfully deleted ike./i));
    expect(deleteConfirmation).toBeInTheDocument() 
    
    // assert that the pet card was removed from the list after deletion.
    expect(petCardElement).not.toBeInTheDocument()
});
