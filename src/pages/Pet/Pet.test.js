import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import { render, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GetPet } from '../../data/queries';
import { Pet } from '.'

const mockPet = {
    id: '1',
    age: 1,
    name: 'Ike',
    species: 'DOG'
};

const mocks = [{
    request: { query: GetPet, variables: { id: '1' } },
    result: { data: { pet: mockPet } }
}]

// Since the withUser HOC that wraps <Pet /> needs access to
// router props (match.params, specifically), we can't just
// render the component by itself. We can render it through a 
// <Route /> and set the Router's url to the desired location
// with appropriate url params. This will give it access to the
// router props.
test('it renders a pet page successfully', async () => {
    const route = '/pet/1'
    const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[route]}>
                <Route path="/pet/:petId" component={Pet} />
            </MemoryRouter>
        </MockedProvider>
    );

    const loadingElement = getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
    
    const headingElement = await waitForElement(() => getByText(/ike/i));
    expect(headingElement).toBeInTheDocument();
})


const errorMocks = [{
    request: { query: GetPet, variables: { id: '1' } },
    error: new Error('Bad query')
}]

// We can also mock out errors in the query to make sure our UI
// handles errors correctly.
test('it renders an error message when the query fails', async () => {
    const route = '/pet/1'
    const { getByText } = render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
            <MemoryRouter initialEntries={[route]}>
                <Route path="/pet/:petId" component={Pet} />
            </MemoryRouter>
        </MockedProvider>
    );

    const loadingElement = getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();

    const errorMessage = await waitForElement(() => getByText(/something went wrong./i));
    expect(errorMessage).toBeInTheDocument();
})