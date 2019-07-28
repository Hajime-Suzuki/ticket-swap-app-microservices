import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/tickets-config'

@table(tableNames.tickets_events_table)
export class EventModel {
  @hashKey()
  id: string

  @attribute()
  name: string

  @attribute()
  date: string

  @attribute()
  location: Location
}

interface Location {
  name: string
  city: string
  address: string
}
