import { gql } from '@apollo/client';

const CREATE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }`;

export default CREATE_TASK;