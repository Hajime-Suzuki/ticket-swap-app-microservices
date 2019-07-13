import { ticketsActions } from '@ticket-swap-app/shared/src/constants'
import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { HandlerEvent } from '@ticket-swap-app/shared/src/handlers/types'
import { createTicketHandler } from './handlers/create-ticket'
import { getTicketHandler } from './handlers/get-ticket'

type ActionTypes = keyof typeof ticketsActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
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

      default:
        handleResponse.error(new Error('unknown action'))
    }

  } catch (error) {
    return handleResponse.error(error)
  }
}
