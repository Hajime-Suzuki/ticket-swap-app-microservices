import {
  attribute,
  hashKey,
  table,
  rangeKey
} from '@aws/dynamodb-data-mapper-annotations'
import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql'

@table(process.env.tickets_tickets_table)
export class TicketModel implements ITicket {
  @hashKey()
  eventId: string

  @rangeKey()
  userId: string

  @attribute()
  price: string

  @attribute()
  createdAt: number

  @attribute()
  soldAt?: number
}
