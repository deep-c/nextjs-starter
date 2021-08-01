import { gql } from '@apollo/client';

export const updateMeMutation = gql`
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

export const updateUserMutation = gql`
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
