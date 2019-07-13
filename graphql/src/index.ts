import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda';
import { APIGatewayEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import { authenticationChecker } from './auth/auth-checker';
import { eventSchema } from './events/event';
import { eventResolvers } from './events/event-resolvers';
import { ticketSchema } from './tickets/ticket';
import { ticketResolvers } from './tickets/ticket-resolvers';
import { userSchema } from './users/user';
import { userResolvers } from './users/user-resolvers';




const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [userSchema, eventSchema, ticketSchema],
    resolvers: [userResolvers, eventResolvers, ticketResolvers],

  }),
  context: async ({ event, context }: { event: APIGatewayEvent, context: Context }) => {
    // signIn()
    const res = await authenticationChecker(event)
    console.log(res)
    return res
  },
  introspection: true, // by setting this false, you don't allow use graphql playground for this endpoint.
})

export const graphql = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
})
