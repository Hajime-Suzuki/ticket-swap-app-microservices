import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { UserModel } from '../models/User'
import { Mapper } from '@ticket-swap-app/shared/src/database'

const { IS_OFFLINE, usersDbPort, region } = process.env

const mapper = new Mapper<UserModel, typeof UserModel>({
  region,
  endpoint: IS_OFFLINE ? 'http://localhost:' + usersDbPort : undefined,
  model: UserModel
})

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
  scan,
  findByKey
}
