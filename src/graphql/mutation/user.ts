import { gql } from '@apollo/client';

export const updateUser = gql`
  mutation UpdateUser($id: ID!, $fields: UserUpdateInput!) {
    updateUser(id: $id, fields: $fields) {
      id
      name
      image
      bio
      email
      createdAt
      updatedAt
      role
    }
  }
`;
