import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda'
import { APIGatewayEvent } from 'aws-lambda'
// import 'source-map-support/register'
import { AuthenticatedDirective } from './directives/authentication'
import { eventSchema } from './events/event'
import { eventResolvers } from './events/event-resolvers'
import { ticketSchema } from './tickets/ticket'
import { ticketResolvers } from './tickets/ticket-resolvers'
import { userSchema } from './users/user'
import { userResolvers } from './users/user-resolvers'

export interface ResolverContext {
  authorization?: string
  user: { id: string }
}

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [ticketSchema, eventSchema, userSchema],
    resolvers: [userResolvers, eventResolvers, ticketResolvers],
    schemaDirectives: {
      authenticated: AuthenticatedDirective
    }
  }),
  context: async (args: { event: APIGatewayEvent, context: ResolverContext }) => {
    return {
      authorization: args.event.headers.Authorization,
      user: undefined
    }
  },
  introspection: true, // by setting this false, you don't allow use graphql playground for this endpoint.
})

export const graphql = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
})
