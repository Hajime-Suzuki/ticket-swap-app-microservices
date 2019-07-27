import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { TicketRepository } from '../repositories/tickets-repository'
import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql'

type UpdateTicketArgs = {
  eventId: ITicket['eventId']
  userId: ITicket['userId']
} & Partial<ITicket>

export const updateTicketHandler = async (
  event: HandlerEvent<UpdateTicketArgs>
) => {
  const { userId, eventId, ...data } = event.body.data
  const res = await TicketRepository.findAndUpdate({ userId, eventId }, data)
  return res
}
