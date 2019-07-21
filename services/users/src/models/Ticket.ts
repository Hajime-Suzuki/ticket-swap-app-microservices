import {
  attribute,
  hashKey,
  rangeKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/users-config'

@table(tableNames.users_tickets_table)
export class TicketModel {
  @hashKey()
  eventId: string

  @rangeKey()
  userId: string

  @attribute()
  price: string

  @attribute()
  soldAt?: string
}
