import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:5000/graphql' }),
  cache: new InMemoryCache()
})
