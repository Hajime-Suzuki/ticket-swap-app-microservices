import { TicketRepository, CreateTicketArgs } from '../repository'
import { Event } from '..'

export const createTicketHandler = async (event: Event<CreateTicketArgs>) => {
  console.log('event:', event)
  const res = await TicketRepository.save(event.body)
  console.log('ticket saved: ', res)
  return res
}
