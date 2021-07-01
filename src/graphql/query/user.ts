import { gql } from '@apollo/client';

export const me = gql`
  query {
    me {
      id
      name
      email
      image
      role
      bio
      createdAt
      updatedAt
    }
  }
`;
