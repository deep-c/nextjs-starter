import { gql } from '@apollo/client';

export const updateMe = gql`
  mutation UpdateMe($fields: UpdateMeInput!) {
    updateMe(fields: $fields) {
      id
      name
      image
      bio
      role
      status
      email
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser($id: ID!, $fields: UpdateUserInput!) {
    updateUser(id: $id, fields: $fields) {
      name
      image
      bio
      email
      emailVerified
      createdAt
      updatedAt
      role
      status
    }
  }
`;
