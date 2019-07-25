import {
  FindTicketArgs,
  TicketRepository
} from '../repositories/tickets-repository'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
export const getTicketHandler = async (event: HandlerEvent<FindTicketArgs>) => {
  console.log('event:', event)
  const res = await TicketRepository.findByKey(event.body.data)
  console.log('get ticket: ', res)
  return res
}
