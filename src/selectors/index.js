export const formatUser = user => {
  if (!user) {
    return;
  }

  const formattedUser = { ...user };
  const { pets } = formattedUser;
  const formattedPets = pets.map(formatPet);
  formattedUser.pets = formattedPets;

  return formattedUser;
};

export const formatPet = pet => {
  if (!pet) {
    return;
  }

  const formattedPet = { ...pet };
  const { species, toys } = formattedPet;
  if (toys) {
    const formattedToys = toys.map(formatToy);
    formattedPet.toys = formattedToys;
  }
  const formattedSpecies =
    species.charAt(0).toUpperCase() + species.substring(1).toLowerCase();
  formattedPet.species = formattedSpecies;
  return formattedPet;
};

export const formatToy = toy => {
  if (!toy) {
    return;
  }

  const formattedToy = { ...toy };
  const { name } = formattedToy;
  const formattedName =
    name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  formattedToy.name = formattedName;
  return formattedToy;
};
