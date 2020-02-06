import React from 'react';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GetUser, DeletePet } from '../../data/queries';
import { Profile } from '.';

const deletePet = { id: '1', age: 1, name: 'Ike', species: 'DOG' };
const mocks = [
  {
    request: { query: GetUser },
    result: () => ({
      data: {
        user: [
          {
            id: '1',
            firstName: 'Ramsel',
            lastName: 'Gonzalez',
            email: 'ramsel@gmail.com',
            pets: [{ id: '1', age: 1, name: 'Ike', species: 'DOG' }]
          }
        ]
      }
    })
  },
  {
    request: { query: DeletePet },
    variables: { id: '1' },
    result: { data: { deletePet } }
  }
];

test('it renders the page', async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Profile />
    </MockedProvider>
  );
  const welcomeTextElement = await waitForElement(() =>
    getByText(/your pets./i)
  );
  expect(welcomeTextElement).toBeInTheDocument();
});
