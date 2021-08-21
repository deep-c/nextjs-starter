import { gql } from '@apollo/client';

export default gql`
  mutation UpdateMe($fields: UpdateMeInput!) {
    updateMe(fields: $fields) {
      id
      name
      image
      bio
      role
      status
      email
    }
  }
`;
