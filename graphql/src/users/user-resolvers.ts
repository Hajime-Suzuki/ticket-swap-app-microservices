import { ResolverContext } from '..'
import { IResolvers, IUser } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'
import { usersActions } from '@ticket-swap-app/shared/src/constants'

const usersLambda = new LambdaCaller(process.env.usersPort, process.env.usersFunc)

export const userResolvers: IResolvers<ResolverContext> = {
  Query: {
    getUser: async (_, { id }) => {
      console.log('getUser')
      const res = await usersLambda.invoke<{ user: IUser }>(usersActions.getUser, { id })
      return res
    }
  }
}
