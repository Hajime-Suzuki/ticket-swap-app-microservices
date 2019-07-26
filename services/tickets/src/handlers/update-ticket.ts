import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import {
  TicketRepository,
  UpdateTicketArgs
} from '../repositories/tickets-repository'
export const updateTicketHandler = async (
  event: HandlerEvent<UpdateTicketArgs>
) => {
  console.log('event:', event)
  const res = await TicketRepository.update(event.body.data)
  console.log('get ticket: ', res)
  return res
}
