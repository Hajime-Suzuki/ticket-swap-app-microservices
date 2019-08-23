import { QueryOptions } from '@aws/dynamodb-data-mapper/build/namedParameters/QueryOptions'
import { IGetTicketsArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'
import { getQueryFilter } from '../utils'

export const getTicketsHandler = async (
  event: HandlerEvent<IGetTicketsArgs>
) => {
  const { keys } = event.body.data

  const options = getOptions(event.body.data)
  const tickets = await ticketRepository.query(keys, options)

  return tickets
}

const getOptions = ({ filter }: IGetTicketsArgs) => {
  const options: QueryOptions = {}
  if (filter) {
    options.filter = getQueryFilter({
      subject: 'date',
      type: 'Equals',
      object: filter.date
    })
  }
  return options
}
