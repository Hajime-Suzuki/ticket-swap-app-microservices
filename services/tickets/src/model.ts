import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql'

@table(process.env.tickets_tickets_table)
export class Ticket implements ITicket {
  @hashKey()
  eventId: string

  @attribute()
  userId: string

  @attribute()
  price: string

  @attribute()
  createdAt: number

  @attribute()
  soldAt?: number
}
