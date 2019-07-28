import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { tableNames } from '@ticket-swap-app/config/src/tickets-config'

@table(tableNames.tickets_users_table)
export class UserModel {
  @hashKey()
  email: string

  @attribute()
  createdAt: string
}
