import { gql } from '@apollo/client';

export const me = gql`
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

export const getUsersForAdmin = gql`
  query GetUsersForAdmin($cursor: String) {
    users(first: 1, after: $cursor) {
      edges {
        node {
          id
          name
          image
          email
          role
          status
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
