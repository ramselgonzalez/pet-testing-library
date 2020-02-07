import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GetUser, GetPet, DeletePet } from '../data/queries';
import App from '.';

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
    },
    {
      request: { query: GetPet, variables: { id: '1' } },
      result: { data: { pet: mockPet } }
  }
];

test('renders sidebar with title', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const headerElement = getByText(/pet testing library/i);
  expect(headerElement).toBeInTheDocument();
});


// We can render the whole app inside of a router test if certain buttons
// navigate to pages. We can set an initial route and assert that we are
// actually on the page we should be on.
test('can navigate to pet profile page', async () => {
  // Mock out user verification - There is probably
  // a better way to do this.
  localStorage.setItem('token', 'test-token')
  const initialRoute = '/profile';
  const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[initialRoute]}>
              <App />
          </MemoryRouter>
      </MockedProvider>
  );

  // Initial route lands on the profile page.
  const profileHeader = await waitForElement(() => getByText(/welcome, ramsel./i));
  expect(profileHeader).toBeInTheDocument()
  
  // Click on the pet card view button.
  const viewPetButton = getByText(/view/i);
  fireEvent.click(viewPetButton);

  // Assert that we've landed on the pet profile page.
  const petProfileHeader = await waitForElement(() => getByText(/ike's profile page/i));
  expect(petProfileHeader).toBeInTheDocument()

  // Click the 'Add A Pet' navbar icon.
  const addPetNavButton = getByText(/add a pet/i);
  fireEvent.click(addPetNavButton);

  // Assert that we landed on the add pet page.
  const addPetSubHeader = getByText(/add a pet to your profile!/i);
  expect(addPetSubHeader).toBeInTheDocument();
});