import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { UserRepository } from '../repositories/users-repository'

interface GetUserBody {
  id: IUser['id']
}

export const getUserHandler = async (event: HandlerEvent<GetUserBody>) => {
  const user = await UserRepository.findByKey(event.body.data)
  return user
}
