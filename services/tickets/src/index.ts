import { ticketsActions } from '@ticket-swap-app/shared/src/constants'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { createTicketHandler } from './handlers/create-ticket'
import { getTicketsHandler } from './handlers/get-tickets'
import { updateTicketHandler } from './handlers/update-ticket'
import { logger, responseHandler } from './utils'

type ActionTypes = keyof typeof ticketsActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }

  logger.log('event received: ', {
    action: event.body.action,
    body: event.body
  })

  try {
    switch (event.body.action) {
      case ticketsActions.createTicket: {
        const res = await createTicketHandler(event)
        return responseHandler.success({ ticket: res })
      }
      case ticketsActions.getTickets: {
        const res = await getTicketsHandler(event)
        return responseHandler.success({ tickets: res })
      }
      case ticketsActions.updateTicket: {
        const res = await updateTicketHandler(event)
        return responseHandler.success({ test: res })
      }
      default: {
        throw new Error('unknown action')
      }
    }
  } catch (error) {
    return responseHandler.error(error)
  }
}
