import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { UserModel } from '../models/User'
import { Mapper } from '@ticket-swap-app/shared/src/database'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import { shared } from '@ticket-swap-app/config/src/global-config'
const { usersDbPort, region } = shared

const mapper = new Mapper<UserModel, typeof UserModel>({
  region,
  endpoint: isOffline() ? 'http://localhost:' + usersDbPort : undefined,
  model: UserModel
})

export const save = (args: Pick<IUser, 'id' | 'email'>) => {
  return mapper.save(args)
}

export interface FindUserArgs {
  id: IUser['id']
}
const findByKey = async (args: FindUserArgs) => {
  const res = await mapper.query(args)
  return res[0]
}

const scan = async () => {
  return mapper.scan()
}

export const UserRepository = {
  save,
  scan,
  findByKey
}
