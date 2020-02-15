const defaultPet = {
  id: '1',
  name: 'Ike',
  age: 1,
  species: 'DOG',
  toys: []
};

export const getPetMock = pet => ({
  ...defaultPet,
  ...pet
});
