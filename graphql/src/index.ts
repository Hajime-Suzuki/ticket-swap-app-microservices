import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda'
import 'source-map-support/register'
import { eventSchema } from './events/event'
import { eventResolvers } from './events/event-resolvers'
import { userSchema } from './users/user'
import { userResolvers } from './users/user-resolvers'
import { ticketSchema } from './tickets/ticket'
import { ticketResolvers } from './tickets/ticket-resolvers'

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [userSchema, eventSchema, ticketSchema],
    resolvers: [userResolvers, eventResolvers, ticketResolvers],

  }),
  introspection: true, // by setting this false, you don't allow use graphql playground for this endpoint.
})

export const graphql = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
})
