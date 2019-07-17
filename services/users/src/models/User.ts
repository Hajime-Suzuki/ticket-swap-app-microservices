import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { tableNames } from '@ticket-swap-app/config/src/users-config'

@table(tableNames.users_users_table)
export class UserModel implements IUser {
  @hashKey()
  email: string

  @attribute()
  id: string

  @attribute()
  createdAt: string

  @attribute()
  updatedAt?: string
}
