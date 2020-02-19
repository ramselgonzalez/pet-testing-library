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

export const GetPet = gql`
  query GetPet($id: ID!) {
    pet(id: $id) {
      id
      age
      name
      species
      toys {
        id
        description
        name
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

export const SignUp = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
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

export const AddToy = gql`
  mutation addToy($id: ID!, $description: String!, $name: ToyEnum!) {
    addToy(id: $id, description: $description, name: $name) {
      id
      name
      description
    }
  }
`;

export const DeleteToy = gql`
  mutation deleteToy($id: ID!) {
    deleteToy(id: $id) {
      id
      name
    }
  }
`;
