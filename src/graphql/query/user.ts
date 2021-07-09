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

export const getUserForAdmin = gql`
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
