import { gql } from '@apollo/client';

export const meQuery = gql`
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

export const getUserForAdminQuery = gql`
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

export const getUsersForAdminQuery = gql`
  query GetUsersForAdmin($first: Int, $cursor: String, $search: String) {
    users(first: $first, after: $cursor, search: $search) {
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
