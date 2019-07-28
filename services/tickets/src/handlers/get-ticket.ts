import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import {
  FindTicketArgs,
  ticketRepository
} from '../repositories/tickets-repository'
export const getTicketHandler = async (event: HandlerEvent<FindTicketArgs>) => {
  console.log('event:', event)
  const res = await ticketRepository.find(event.body.data)
  console.log('get ticket: ', res)
  return res
}
