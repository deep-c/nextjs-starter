import { gql } from '@apollo/client';

export const getSessionsForAdminQuery = gql`
  query GetSessionsForAdmin($first: Int, $cursor: String, $search: String) {
    sessions(first: $first, after: $cursor, search: $search) {
      edges {
        node {
          id
          expires
          createdAt
          updatedAt
          user {
            id
            name
            image
            email
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
