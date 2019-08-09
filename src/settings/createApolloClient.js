import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GRAPHQL_SERVER_URL } from 'globalConstants'

const httpLink = new HttpLink({
  uri: GRAPHQL_SERVER_URL,
})

const link = ApolloLink.from([httpLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export default client
