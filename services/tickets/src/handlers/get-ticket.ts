
import { FindTicketArgs, TicketRepository } from '../repository'
import { HandlerEvent } from '@ticket-swap-app/shared/src/handlers/types'

export const getTicketHandler = async (event: HandlerEvent<FindTicketArgs>) => {
  console.log('event:', event)
  const res = await TicketRepository.findByKey(event.body.data)
  console.log('get ticket: ', res)
  return res
}
