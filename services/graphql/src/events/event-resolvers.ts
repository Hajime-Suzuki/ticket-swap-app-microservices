import { shared } from '@ticket-swap-app/config/src/global-config'
import { ResolverContext } from '..'
import { IResolvers } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'

const eventLambda = new LambdaCaller(shared.eventsPort, shared.eventsFunc)

// TODO: implement
export const eventResolvers: IResolvers<ResolverContext> = {
  Mutation: {
    createEvent: (_, args, ctx) => {
      console.log(args, ctx)
      return null
    }
  }
}
