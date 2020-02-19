import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import {
  render,
  waitForElement,
  fireEvent,
  within
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/react-testing';
import { GetPet, AddToy } from '../../graphql/queries';
import { getPetMock, getToyMock } from '../../mocks';
import { Pet } from '.';

const mockToy = getToyMock();
const mockToy2 = getToyMock({ id: '2', description: 'An orange ball' });
const mockPet = getPetMock({ toys: [mockToy] });

const getPetRequestMock = {
  request: { query: GetPet, variables: { id: '1' } },
  result: { data: { pet: mockPet } }
};

const getPetErrorMock = {
  request: { query: GetPet, variables: { id: '1' } },
  error: new Error('Bad query')
};

const addToyRequestMock = {
  request: {
    query: AddToy,
    variables: {
      id: '1',
      name: mockToy2.name,
      description: mockToy2.description
    }
  },
  result: { data: { addToy: mockToy2 } }
};
// Since the withUser HOC that wraps <Pet /> needs access to
// router props (match.params, specifically), we can't just
// render the component by itself. We can render it through a
// <Route /> and set the Router's url to the desired location
// with appropriate url params. This will give it access to the
// router props.
test('it renders a pet page successfully', async () => {
  const { request } = getPetRequestMock;
  const route = `/pet/${request.variables.id}`;
  const mocks = [getPetRequestMock];
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
});

// We can also mock out errors in the query to make sure our UI
// handles errors correctly.
test('it renders an error message when the query fails', async () => {
  const mocks = [getPetErrorMock];
  const { request } = getPetErrorMock;
  const route = `/pet/${request.variables.id}`;
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[route]}>
        <Route path="/pet/:petId" component={Pet} />
      </MemoryRouter>
    </MockedProvider>
  );

  const loadingElement = getByText(/loading.../i);
  expect(loadingElement).toBeInTheDocument();

  const errorMessage = await waitForElement(() =>
    getByText(/something went wrong./i)
  );
  expect(errorMessage).toBeInTheDocument();
});

test('it adds a toy successfully', async () => {
  const mocks = [getPetRequestMock, addToyRequestMock];
  const { request: getRequest } = getPetRequestMock;
  const { request: addRequest } = addToyRequestMock;
  const route = `/pet/${getRequest.variables.id}`;
  const {
    getByLabelText,
    getByTestId,
    getAllByRole,
    getByText,
    findByText
  } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[route]}>
        <Route path="/pet/:petId" component={Pet} />
      </MemoryRouter>
    </MockedProvider>
  );

  const headerElement = await findByText(/ike/i);
  expect(headerElement).toBeInTheDocument();

  const addToyButton = getByText(/add a toy/i);
  fireEvent.click(addToyButton);

  const [toyInput] = getAllByRole('button');
  UserEvent.click(toyInput);
  const options = document.body.querySelector('ul[role=listbox]');
  const ballOption = within(options).getByText(/ball/i);
  UserEvent.click(ballOption);

  const descriptionInput = getByLabelText('description');
  fireEvent.change(descriptionInput, {
    target: { value: addRequest.variables.description }
  });

  const addButton = getByTestId('add-toy-button');
  fireEvent.click(addButton);

  const addConfirmation = await waitForElement(() =>
    getByText(/you have successfully added a toy./i)
  );
  expect(addConfirmation).toBeInTheDocument();
});
