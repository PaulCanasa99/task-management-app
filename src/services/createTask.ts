import { gql } from '@apollo/client';

const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }`;

export default CREATE_TASK;