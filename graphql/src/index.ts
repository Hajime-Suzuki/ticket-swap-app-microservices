import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda'
import 'source-map-support/register'
import { eventSchema } from './events/event'
import { eventResolvers } from './events/event-resolvers'
import { userSchema } from './users/user'
import { userResolvers } from './users/user-resolvers'

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [userSchema, eventSchema],
    resolvers: [userResolvers, eventResolvers]
  })
})

export const graphql = server.createHandler()
