import { IQueryGetTicketsByUserIdArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { GSINames, ticketRepository } from '../repositories/tickets-repository'
import { eventRepository } from '../repositories/event-repository'

// TODO: not used.
export const getTicketsByUserIdHandler = async (
  e: HandlerEvent<IQueryGetTicketsByUserIdArgs>
) => {
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
