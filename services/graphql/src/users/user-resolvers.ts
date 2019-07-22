import { ResolverContext } from '..'
import { IResolvers, IUser } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'
import { usersActions } from '@ticket-swap-app/shared/src/constants'
import { shared } from '@ticket-swap-app/config/src/global-config'

const usersLambda = new LambdaCaller(shared.usersPort, shared.usersFunc)

export const userResolvers: IResolvers<ResolverContext> = {
  Query: {
    getUser: async (_, { id }) => {
      console.log('getUser')
      const res = await usersLambda.invoke<{ user: IUser }>(
        usersActions.getUser,
        { id }
      )
      return res
    }
  }
}
