import { TicketRepository, CreateTicketArgs } from '../repositories/tickets-repository'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'

export const createTicketHandler = async (event: HandlerEvent<CreateTicketArgs>) => {
  console.log('event:', event)
  const res = await TicketRepository.save(event.body.data)
  console.log('ticket saved: ', res)
  // send SNS
  return res
}
