import { gql } from '@apollo/client';

export default gql`
  mutation RemoveSession($id: ID!) {
    removeSession(id: $id) {
      id
    }
  }
`;
