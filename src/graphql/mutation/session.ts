import { gql } from '@apollo/client';

export const updateSessionMutation = gql`
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

export const removeSessionMutation = gql`
  mutation RemoveSession($id: ID!) {
    removeSession(id: $id) {
      id
    }
  }
`;
