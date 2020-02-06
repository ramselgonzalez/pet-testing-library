import gql from 'graphql-tag';

export const GetUser = gql`
  query GetUser {
    user {
      id
      email
      firstName
      lastName
      pets {
        id
        age
        name
        species
      }
    }
  }
`;

export const LogIn = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const AddPet = gql`
  mutation AddPet($name: String!, $age: Int!, $species: Species!) {
    addPet(name: $name, age: $age, species: $species) {
      id
      age
      name
      species
    }
  }
`;

export const DeletePet = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id) {
      id
      age
      name
      species
    }
  }
`;
