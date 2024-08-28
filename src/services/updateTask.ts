import { gql } from '@apollo/client';

const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
    }
  }`;

export default UPDATE_TASK;