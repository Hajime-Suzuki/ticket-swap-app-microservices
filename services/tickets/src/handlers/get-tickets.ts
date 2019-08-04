import { QueryOptions } from '@aws/dynamodb-data-mapper/build/namedParameters/QueryOptions'
import { IGetTicketsArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'
import { getQueryFilter } from '../utils'
export const getTicketsHandler = async (
  event: HandlerEvent<IGetTicketsArgs>
) => {
  const { keys, filter } = event.body.data

  const options: QueryOptions = {}
  if (filter) {
    options.filter = getQueryFilter({
      subject: 'date',
      type: 'Equals',
      object: filter.date
    })
  }

  const res = await ticketRepository.query({ eventId: keys.eventId }, options)
  return res
}
