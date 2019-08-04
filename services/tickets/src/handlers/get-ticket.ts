import { IGetTicketArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'

export const getTicketHandler = async (event: HandlerEvent<IGetTicketArgs>) => {
  const args = event.body.data

  const res = await ticketRepository.find(args)

  return res
}
