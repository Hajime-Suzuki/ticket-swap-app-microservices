import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { eventRepository } from '../repositories/event-repository'
import { GSINames, ticketRepository } from '../repositories/tickets-repository'

// TODO: not used.
export const getTicketsByUserIdHandler = async (e: HandlerEvent<any>) => {
  const { userId } = e.body.data
  const tickets = await ticketRepository.query(
    { userId },
    { indexName: GSINames.userId }
  )

  const eventsMap = await eventRepository.findManyMapByHashKey(
    'id',
    tickets.map(t => t.eventId)
  )

  const merged = tickets.map(ticket => {
    const event = eventsMap[ticket.eventId]
    return { ...ticket, event }
  })

  return merged
}
