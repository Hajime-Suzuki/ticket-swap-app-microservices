import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/events-config'
import { IEvent } from '@ticket-swap-app/gql/src/generated/graphql'

@table(tableNames.events_events_table)
export class EventModel implements IEvent {
  @hashKey()
  id: string

  @attribute()
  name: string

  @attribute()
  description: string

  @attribute()
  date: string

  @attribute()
  location: Location

  @attribute()
  createdAt: string

  @attribute()
  updatedAt?: string
}

interface Location {
  name: string
  city: string
  address: string
}
