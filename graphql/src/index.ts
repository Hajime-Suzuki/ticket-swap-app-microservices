import { ApolloServer } from 'apollo-server-lambda'
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import 'source-map-support/register'
import { eventSchema } from './events/event'
import { eventResolvers } from './events/event-resolvers'
import { userSchema } from './users/user'
import { userResolvers } from './users/user-resolvers'

const server = new ApolloServer({
  typeDefs: mergeTypes([userSchema, eventSchema]),
  resolvers: mergeResolvers([userResolvers, eventResolvers])
})

export const graphql = server.createHandler()
