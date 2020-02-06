import { graphql } from '@apollo/react-hoc';
import { AddPet, DeletePet, GetUser, LogIn } from './queries';

export const withUser = graphql(GetUser);

export const withLogIn = graphql(LogIn, {
  props: ({ mutate }) => ({
    logIn: async (email, password) => {
      try {
        const response = await mutate({ variables: { email, password } });
        return response.data.logIn;
      } catch (err) {
        throw err;
      }
    }
  })
});

export const withAddPet = graphql(AddPet, {
  props: ({ mutate }) => ({
    addPet: async (age, name, species) => {
      try {
        const response = await mutate({
          variables: { age, name, species },
          update: async (proxy, { data: { addPet } }) => {
            const data = await proxy.readQuery({ query: GetUser });
            data.user.pets.push(addPet);
            proxy.writeQuery({ query: GetUser, data });
          }
        });
        return response.data.addPet;
      } catch (err) {
        throw err;
      }
    }
  })
});

export const withDeletePet = graphql(DeletePet, {
  props: ({ mutate }) => ({
    deletePet: async id => {
      try {
        const response = await mutate({
          variables: { id },
          update: async (proxy, { data: { deletePet } }) => {
            const data = await proxy.readQuery({ query: GetUser });
            const delPetIndex = data.user.pets.findIndex(
              pet => pet.id === deletePet.id
            );
            data.user.pets.splice(delPetIndex, 1);
            proxy.writeQuery({ query: GetUser, data });
          }
        });
        return response.data.deletePet;
      } catch (err) {
        throw err;
      }
    }
  })
});
