import { gql } from '@apollo/client';

export default gql`
  mutation UpdateSession($id: ID!, $fields: UpdateSessionInput!) {
    updateSession(id: $id, fields: $fields) {
      id
      accessToken
      sessionToken
      createdAt
      updatedAt
      expires
      user {
        id
        name
        email
        image
      }
    }
  }
`;
