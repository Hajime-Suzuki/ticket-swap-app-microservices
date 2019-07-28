import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { UserModel } from '../models/User'
import {
  Mapper,
  MapperConstructorArgs
} from '@ticket-swap-app/shared/src/database'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'

class UserRepository extends Mapper<UserModel, typeof UserModel> {
  constructor(args: MapperConstructorArgs<typeof UserModel>) {
    super(args)
  }
}

export const userRepository = new UserRepository({
  region: awsSettings.region,
  endpoint: isOffline()
    ? 'http://localhost:' + dynamoPorts.ticketsDbPort
    : undefined,
  model: UserModel
})
