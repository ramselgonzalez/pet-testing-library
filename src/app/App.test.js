import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { AuthProvider } from '../provider/auth';
import { GetUser, GetPet, LogIn, SignUp } from '../data/queries';
import { getPetMock, getUserMock, getToyMock } from '../mocks';
import App from '.';

const mockToy = getToyMock();
const mockPet = getPetMock();
const mockPetwithToys = getPetMock({ toys: [mockToy] });
const mockUser = getUserMock({ pets: [mockPet] });

const getUserRequestMock = {
  request: { query: GetUser },
  result: { data: { user: mockUser } }
};

const getPetRequestMock = {
  request: { query: GetPet, variables: { id: '1' } },
  result: { data: { pet: mockPetwithToys } }
};

const logInRequestMock = {
  request: {
    query: LogIn,
    variables: { email: 'ramsel@gmail.com', password: 'password' }
  },
  result: {
    data: {
      logIn: {
        token: 'test-jwt-response',
        user: { id: '1', email: 'ramsel@gmail.com' }
      }
    }
  }
};

const signUpRequestMock = {
  request: {
    query: SignUp,
    variables: {
      email: 'ramsel@gmail.com',
      firstName: 'Ramsel',
      lastName: 'Gonzalez',
      password: 'password'
    }
  },
  result: {
    data: {
      signUp: {
        id: '1',
        email: 'ramsel@gmail.com',
        firstName: 'Ramsel',
        lastName: 'Gonzalez'
      }
    }
  }
};

test('can sign up a new account', async () => {
  const initialRoute = '/sign-up';
  const mocks = [signUpRequestMock];
  const { request } = signUpRequestMock;
  const { getByText, getByTestId, getByLabelText, getByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    </MockedProvider>
  );

  const signUpHeader = getByRole('heading');
  expect(signUpHeader).toHaveTextContent(/sign up/i);

  const firstNameInput = getByLabelText('firstName');
  fireEvent.change(firstNameInput, {
    target: { value: request.variables.firstName }
  });

  const lastNameInput = getByLabelText('lastName');
  fireEvent.change(lastNameInput, {
    target: { value: request.variables.lastName }
  });

  const emailInput = getByLabelText('email');
  fireEvent.change(emailInput, {
    target: { value: request.variables.email }
  });

  const passwordInput = getByLabelText('password');
  fireEvent.change(passwordInput, {
    target: { value: request.variables.password }
  });

  const submitButton = getByTestId('sign-up-button');
  fireEvent.click(submitButton);

  // assert that the user is redirected to the log in page
  const logInPageText = await waitForElement(() =>
    getByText(/don't have an account/i)
  );
  expect(logInPageText).toBeInTheDocument();
});

test('can login and redirected to profile page and log out', async () => {
  const initialRoute = '/log-in';
  const mocks = [logInRequestMock, getUserRequestMock];
  const { request } = logInRequestMock;
  const { getByText, getByTestId, getByLabelText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    </MockedProvider>
  );

  const emailInput = getByLabelText('email');
  fireEvent.change(emailInput, {
    target: { value: request.variables.email }
  });

  const passwordInput = getByLabelText('password');
  fireEvent.change(passwordInput, {
    target: { value: request.variables.password }
  });

  const logInButton = getByTestId('log-in-button');
  fireEvent.click(logInButton);

  const sidebarHeading = await waitForElement(() =>
    getByText(/pet testing library/i)
  );
  expect(sidebarHeading).toBeInTheDocument();

  const signOutButton = getByText(/sign out/i);
  fireEvent.click(signOutButton);

  // assert that the user is redirected to the log in page
  const logInPageText = await waitForElement(() =>
    getByText(/don't have an account/i)
  );
  expect(logInPageText).toBeInTheDocument();
});

// We can render the whole app inside of a router test if certain buttons
// navigate to pages. We can set an initial route and assert that we are
// actually on the page we should be on.
test('can navigate to pet profile page', async () => {
  // Mock out user verification to bypass login
  localStorage.setItem('token', 'test-token');
  const initialRoute = '/profile';
  const mocks = [getUserRequestMock, getPetRequestMock];
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    </MockedProvider>
  );

  // Initial route lands on the profile page.
  const profileHeader = await waitForElement(() =>
    getByText(/welcome, ramsel./i)
  );
  expect(profileHeader).toBeInTheDocument();

  // Click on the pet card view button.
  const viewPetButton = getByText(/view/i);
  fireEvent.click(viewPetButton);

  // Assert that we've landed on the pet profile page.
  const petProfileHeader = await waitForElement(() => getByText(/ike/i));
  expect(petProfileHeader).toBeInTheDocument();

  // Click the 'Add A Pet' navbar icon.
  const addPetNavButton = getByText(/add a pet/i);
  fireEvent.click(addPetNavButton);

  // Assert that we landed on the add pet page.
  const addPetSubHeader = getByText(/add a pet to your profile!/i);
  expect(addPetSubHeader).toBeInTheDocument();

  localStorage.clear();
});
