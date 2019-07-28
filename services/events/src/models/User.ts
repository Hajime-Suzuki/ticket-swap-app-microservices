import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/events-config'

@table(tableNames.events_users_table)
export class UserModel {
  @hashKey()
  email: string

  @attribute()
  id: string
}
