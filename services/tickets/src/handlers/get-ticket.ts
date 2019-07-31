import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import {
  FindTicketArgs,
  ticketRepository
} from '../repositories/tickets-repository'
export const getTicketHandler = async (event: HandlerEvent<FindTicketArgs>) => {
  const res = await ticketRepository.find(event.body.data)
  return res
}
