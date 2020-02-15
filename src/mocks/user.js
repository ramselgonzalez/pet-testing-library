const defaultUser = {
  id: '1',
  firstName: 'Ramsel',
  lastName: 'Gonzalez',
  email: 'ramsel@gmail.com'
};

export const getUserMock = user => ({
  ...defaultUser,
  ...user
});
