import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import { Mapper } from '@ticket-swap-app/shared/src/database'
import { UserModel } from '../models/User'

const mapper = new Mapper<UserModel, typeof UserModel>({
  region: awsSettings.region,
  endpoint: isOffline()
    ? 'http://localhost:' + dynamoPorts.eventsDbPort
    : undefined,
  model: UserModel
})

const save = (data: Pick<IUser, 'id' | 'email'>) => {
  return mapper.save(data)
}

export interface FindEventArgs {
  email: IUser['email']
}
const findByEmail = async (args: FindEventArgs) => {
  return mapper.find(args)
}

const scan = async () => {
  return mapper.scan()
}

export const UserRepository = {
  save,
  scan,
  findByEmail
}
