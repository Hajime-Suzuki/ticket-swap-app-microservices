import { Event } from '..';
import { FindTicketArgs, TicketRepository } from '../repository';


export const getTicketHandler = async (event: Event<FindTicketArgs>) => {
  console.log('event:', event)
  const res = await TicketRepository.findByKey(event.body)
  console.log('get ticket: ', res)
  return res
}
