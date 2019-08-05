import {
  attribute,
  hashKey,
  table,
  rangeKey
} from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/tickets-config'
import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql'

@table(tableNames.tickets_tickets_table)
export class TicketModel implements ITicket {
  @rangeKey()
  id: string

  @hashKey()
  eventId: string

  @attribute()
  userId: string

  @attribute()
  price: string

  @attribute()
  date: string

  @attribute()
  username: string

  @attribute()
  description: string

  @attribute()
  createdAt: string

  @attribute()
  soldAt?: string
}
