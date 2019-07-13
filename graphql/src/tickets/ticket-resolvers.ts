import { ticketsActions } from '@ticket-swap-app/shared/src/constants'
import { ResolverContext } from '..'
import { IResolvers, ITicket } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'

console.log(process.env.ticketsPort, process.env.ticketsFunc)
const ticketLambda = new LambdaCaller(process.env.ticketsPort, process.env.ticketsFunc)

export const ticketResolvers: IResolvers<ResolverContext> = {
  Query: {
    getTicket: async (_, { eventId, userId }) => {
      console.log('getTicket')
      const res = await ticketLambda.invoke<{ ticket: ITicket }>(ticketsActions.getTicket, { eventId, userId })
      return res
    }
  },
  Mutation: {
    createTicket: async (_, { data }) => {
      console.log('createTicket')
      console.log('data: ', data)
      try {
        const { ticket } = await ticketLambda.invoke<{ ticket: ITicket }>(ticketsActions.createTicket, data)
        return ticket
      } catch (err) {
        console.log(err)
      }
    }
  }
}
