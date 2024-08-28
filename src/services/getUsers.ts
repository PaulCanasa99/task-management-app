import { gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      avatar
      fullName
      id
    }
  }`;

export default GET_USERS;