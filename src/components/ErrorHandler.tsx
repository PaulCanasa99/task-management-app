import { ApolloError } from "@apollo/client";
import { Chip } from "@nextui-org/react";

const ErrorHandler = ({error}: {error: ApolloError}) => (
  <>
    <p>Some error/s ocurred fetching the results:</p>
    {error.graphQLErrors.map(({ message }, i) => (
      <Chip key={i}>{message}</Chip>
    ))}
  </>
)

export default ErrorHandler;