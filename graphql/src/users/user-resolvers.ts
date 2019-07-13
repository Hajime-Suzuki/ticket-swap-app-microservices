import { IResolvers, IUser } from '../generated/graphql'
import { ResolverContext } from '..'
import { LambdaCaller } from '../helpers/lambda-caller'
import { usersActions } from '@ticket-swap-app/shared/src/constants'

const userLambda = new LambdaCaller(process.env.usersPort, process.env.usersFunc)

export const userResolvers: IResolvers<ResolverContext> = {
  Query: {
  },
  Mutation: {
    createUser: async (_, { data }) => {
      const { user } = await userLambda.invoke<{ user: IUser }>(usersActions.createUser, data)
      console.log(user)
      return user
    }
  }
}
