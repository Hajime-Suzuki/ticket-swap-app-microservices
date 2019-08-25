import { IMutationUpdateTicketArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'

export const updateTicketHandler = async (
  event: HandlerEvent<IMutationUpdateTicketArgs>
) => {
  const { keys, data } = event.body.data
  const res = await ticketRepository.findAndUpdate(keys, data)
  return res
}
