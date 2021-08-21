import { gql } from '@apollo/client';

export default gql`
  query GetMe {
    me {
      id
      name
      email
      image
      role
      status
      bio
      createdAt
      updatedAt
    }
  }
`;
