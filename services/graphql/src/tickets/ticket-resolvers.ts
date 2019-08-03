import { ticketsActions } from '@ticket-swap-app/shared/src/constants'
import { ResolverContext } from '..'
import { IResolvers, ITicket } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'
import { shared } from '@ticket-swap-app/config/src/global-config'
import { logger } from '../utils'

const ticketLambda = new LambdaCaller(shared.ticketsPort, shared.ticketsFunc)

export const ticketResolvers: IResolvers<ResolverContext> = {
  Query: {
    getTickets: async (_, { args }) => {
      logger.log('createTicket', args)
      const res = await ticketLambda.invoke<{ tickets: ITicket[] }>(
        ticketsActions.getTickets,
        args
      )
      return res
    }
  },
  Mutation: {
    createTicket: async (_, { data }) => {
      logger.log('createTicket', data)
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
