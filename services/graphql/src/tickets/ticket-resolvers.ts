import {
  ticketsActions,
  eventsActions
} from '@ticket-swap-app/shared/src/constants'
import { ResolverContext } from '..'
import { IResolvers, ITicket, IEvent } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'
import { shared } from '@ticket-swap-app/config/src/global-config'
import { logger } from '../utils'
import { eventLambda } from '../events/event-resolvers'
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
  },
  Ticket: {
    event: async ticket => {
      // TODO: use dataloader or add event name to ticket

      const eventId = ticket.eventId

      const res = await eventLambda.invoke<{ event: IEvent }>({
        actionName: eventsActions.getEvent,
        data: { id: eventId }
      })
      return res.event
    }
  }
}
