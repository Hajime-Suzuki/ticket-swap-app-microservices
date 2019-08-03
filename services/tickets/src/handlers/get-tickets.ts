import { IGetTicketsArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'
export const getTicketsHandler = async (
  event: HandlerEvent<IGetTicketsArgs>
) => {
  const args = event.body.data
  const res = await ticketRepository.query(args)
  return res
}
