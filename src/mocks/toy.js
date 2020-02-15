const defaultToy = {
  id: '1',
  name: 'BALL',
  description: 'A red ball'
};

export const getToyMock = toy => ({
  ...defaultToy,
  ...toy
});
