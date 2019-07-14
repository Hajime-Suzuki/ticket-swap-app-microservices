import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'

@table(process.env.tickets_users_table)
export class UserModel implements IUser {
  @hashKey()
  email: string

  @attribute()
  id?: string

  @attribute()
  createdAt: string

  @attribute()
  updatedAt?: string
}
