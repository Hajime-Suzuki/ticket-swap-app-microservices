import { ticketActions } from '@ticket-swap-app/shared/src/constants';
import { handleResponse } from '@ticket-swap-app/shared/src/response';
import { createTicketHandler } from './handlers/create-ticket';
import { getTicketHandler } from './handlers/get-ticket';

type ActionTypes = keyof typeof ticketActions

export interface Event<TBody = any> {
  action: ActionTypes
  body: TBody
}

export const handler = async (event: Event) => {
  try {
    switch (event.action) {
      case ticketActions.createTicket: {
        const res = await createTicketHandler(event)
        return handleResponse.success({ ticket: res })
      }
      case ticketActions.getTicket: {
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
