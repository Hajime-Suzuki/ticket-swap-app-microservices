import { shared } from '@ticket-swap-app/config/src/global-config'
import { ResolverContext } from '..'
import { IResolvers, IEvent } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'
import { eventsActions } from '@ticket-swap-app/shared/src/constants'

const eventLambda = new LambdaCaller(shared.eventsPort, shared.eventsFunc)

export const eventResolvers: IResolvers<ResolverContext> = {
  Mutation: {
    createEvent: async (_, { data }) => {
      const res = await eventLambda.invoke<{ event: IEvent }>(
        eventsActions.createEvent,
        data
      )
      console.log({ res })
      return res.event
    }
  }
}
