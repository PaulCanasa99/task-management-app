import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App.tsx'
import './index.css'

const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql/',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiNzZhNjNjZjEtOTY0Zi00MDFhLWE3YmEtNGZmZGU0ZDBjZDlhIiwicHJvamVjdElkIjoiMWU4NGRmM2QtNDJlOS00MWMyLTk5MTItZGQ5ZTE3ODk0NTBiIiwiZnVsbE5hbWUiOiJQYXVsIENhbmFzYSIsImVtYWlsIjoicGF1bC5jYW5hc2FAcHVjcC5lZHUucGUiLCJpYXQiOjE3MjQ0MjQ2NzR9.iRj1Z6mbjvr-Nzmhb70aU0YRo6rHPvxM1Apa1nz1tWM'
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ApolloProvider>
  </StrictMode>,
)
