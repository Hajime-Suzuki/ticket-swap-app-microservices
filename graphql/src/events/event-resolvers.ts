import { IResolvers } from '../generated/graphql'

export const eventResolvers: IResolvers = {
  Query: {
    events: () => {
      return 'event!!!'
    }
  }
}
