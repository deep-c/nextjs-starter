import { gql } from '@apollo/client';

export default gql`
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
