import { IResolvers } from '../generated/graphql'

export const userResolvers: IResolvers = {
  Query: {
    user: () => {
      return { id: '2', userName: 'my name', email: 'asht@test.com' }
    }
  }
}
