import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query Query($input: FilterTaskInput!) {
    tasks(input: $input) {
      createdAt
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
    }
  }`;

export default GET_TASKS