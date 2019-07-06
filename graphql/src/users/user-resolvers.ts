import { IResolvers } from '../generated/graphql'

export const userResolvers: IResolvers = {
  Query: {
    user: () => {
      return 'Hello world!!' as any
    }
  }
}
