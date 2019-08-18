import { QueryOptions } from '@aws/dynamodb-data-mapper/build/namedParameters/QueryOptions'
import { IGetTicketsArgs } from '@ticket-swap-app/gql/src/generated/graphql'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository, GSINames } from '../repositories/tickets-repository'
import { getQueryFilter } from '../utils'

export const getTicketsHandler = async (
  event: HandlerEvent<IGetTicketsArgs>
) => {
  const { keys } = event.body.data

  const options = getOptions(event.body.data)

  console.log({ keys, options })
  const res = await ticketRepository.query(keys, options)
  return res
}

const getOptions = ({ keys, filter }: IGetTicketsArgs) => {
  const options: QueryOptions = {}
  if (filter) {
    options.filter = getQueryFilter({
      subject: 'date',
      type: 'Equals',
      object: filter.date
    })
  }

  const gsiOperationName = getGSIName(keys)
  if (gsiOperationName) {
    options.indexName = gsiOperationName
  }

  return options
}

const getGSIName = (keys: IGetTicketsArgs['keys']) => {
  if (keys.userId) return GSINames.userId
  return null
}
