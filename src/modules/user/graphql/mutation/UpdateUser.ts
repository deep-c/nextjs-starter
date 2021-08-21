import { gql } from '@apollo/client';

export default gql`
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
