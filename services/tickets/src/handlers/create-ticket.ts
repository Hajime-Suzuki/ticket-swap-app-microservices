import { TicketRepository, CreateTicketArgs } from '../repository'
import { HandlerEvent } from '@ticket-swap-app/shared/src/handlers/types'

export const createTicketHandler = async (event: HandlerEvent<CreateTicketArgs>) => {
  console.log('event:', event)
  const res = await TicketRepository.save(event.body.data)
  console.log('ticket saved: ', res)
  return res
}
