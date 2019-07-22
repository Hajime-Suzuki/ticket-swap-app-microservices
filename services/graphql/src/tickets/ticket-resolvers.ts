import { ticketsActions } from '@ticket-swap-app/shared/src/constants'
import { ResolverContext } from '..'
import { IResolvers, ITicket } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'
import { shared } from '@ticket-swap-app/config/src/global-config'

const ticketLambda = new LambdaCaller(shared.ticketsPort, shared.ticketsFunc)

export const ticketResolvers: IResolvers<ResolverContext> = {
  Query: {
    getTicket: async (_, { eventId, userId }) => {
      console.log('getTicket')
      const res = await ticketLambda.invoke<{ ticket: ITicket }>(
        ticketsActions.getTicket,
        { eventId, userId }
      )
      return res
    }
  },
  Mutation: {
    createTicket: async (_, { data }) => {
      console.log('createTicket')
      console.log('data: ', data)
      try {
        const { ticket } = await ticketLambda.invoke<{ ticket: ITicket }>(
          ticketsActions.createTicket,
          data
        )
        return ticket
      } catch (err) {
        console.log('createTicketError', err)
      }
    }
  }
}
