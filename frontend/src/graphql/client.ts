import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { getToken } from 'auth/amplify'

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken()
  console.log(`DEBUG => token: ${token}`)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' })

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
