import { gql } from '@apollo/client';

export default gql`
  query GetUserForAdmin($id: ID!) {
    user(id: $id) {
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
