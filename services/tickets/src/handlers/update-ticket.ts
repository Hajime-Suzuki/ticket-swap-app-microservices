import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'

type UpdateTicketArgs = {
  eventId: ITicket['eventId']
  userId: ITicket['userId']
} & Partial<ITicket>

export const updateTicketHandler = async (
  event: HandlerEvent<UpdateTicketArgs>
) => {
  const { id, eventId, ...data } = event.body.data
  const res = await ticketRepository.findAndUpdate({ id, eventId }, data)
  return res
}
