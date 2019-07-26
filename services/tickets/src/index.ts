import { ticketsActions } from '@ticket-swap-app/shared/src/constants'
import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { createTicketHandler } from './handlers/create-ticket'
import { getTicketHandler } from './handlers/get-ticket'
import { updateTicketHandler } from './handlers/update-ticket'
import { TicketRepository } from './repositories/tickets-repository'

type ActionTypes = keyof typeof ticketsActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }
  console.log('action: ', event.body.action)
  try {
    switch (event.body.action) {
      case ticketsActions.createTicket: {
        const res = await createTicketHandler(event)
        return handleResponse.success({ ticket: res })
      }
      case ticketsActions.getTicket: {
        const res = await getTicketHandler(event)
        return handleResponse.success({ ticket: res })
      }
      case ticketsActions.updateTicket: {
        const res = await updateTicketHandler(event)
        return handleResponse.success({ test: res })
      }
      default: {
        return handleResponse.error(new Error('unknown action'))
      }
    }
  } catch (error) {
    return handleResponse.error(error)
  }
}
