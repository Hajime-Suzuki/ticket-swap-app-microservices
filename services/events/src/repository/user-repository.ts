import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import {
  Mapper,
  MapperConstructorArgs
} from '@ticket-swap-app/shared/src/database'
import { UserModel } from '../models/User'

export interface FindUserArgs {
  email: IUser['email']
}

class UserRepository extends Mapper<UserModel, typeof UserModel> {
  constructor(args: MapperConstructorArgs<typeof UserModel>) {
    super(args)
  }
  findByEmail(args: FindUserArgs) {
    return this.find(args)
  }
}

export const userRepository = new UserRepository({
  region: awsSettings.region,
  endpoint: isOffline()
    ? 'http://localhost:' + dynamoPorts.eventsDbPort
    : undefined,
  model: UserModel
})
