import { hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/events-config'

@table(tableNames.events_tickets_table)
export class TicketModel {
  @hashKey()
  eventId: string

  @rangeKey()
  userId: string
}
