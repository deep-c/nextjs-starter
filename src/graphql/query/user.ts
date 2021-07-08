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
  query GetUsersForAdmin($first: Int, $cursor: String) {
    users(first: $first, after: $cursor) {
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
