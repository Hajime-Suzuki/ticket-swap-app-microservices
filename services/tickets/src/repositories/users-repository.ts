import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import {
  Mapper,
  MapperConstructorArgs
} from '@ticket-swap-app/shared/src/database'
import { UserModel } from '../models/User'

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
