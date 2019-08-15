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
      const res = await ticketLambda.invoke<{ tickets: ITicket[] }>({
        actionName: ticketsActions.getTickets,
        data: args
      })
      return res
    },
    getTicket: async (_, { args }) => {
      logger.log('getTicket', args)
      const res = await ticketLambda.invoke<{ ticket: ITicket }>({
        actionName: ticketsActions.getTicket,
        data: args
      })
      return res
    }
  },
  Mutation: {
    createTicket: async (_, { data }, context) => {
      logger.log('createTicket', data)

      const res = await ticketLambda.invoke<{ ticket: ITicket }>({
        actionName: ticketsActions.createTicket,
        data,
        context
      })
      return res
    }
  }
}
