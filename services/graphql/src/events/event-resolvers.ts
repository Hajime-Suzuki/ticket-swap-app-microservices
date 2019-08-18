import { shared } from '@ticket-swap-app/config/src/global-config'
import { eventsActions } from '@ticket-swap-app/shared/src/constants'
import { ResolverContext } from '..'
import { IEvent, IResolvers } from '../generated/graphql'
import { LambdaCaller } from '../helpers/lambda-caller'

export const eventLambda = new LambdaCaller(
  shared.eventsPort,
  shared.eventsFunc
)

export const eventResolvers: IResolvers<ResolverContext> = {
  Query: {
    getEvents: async () => {
      const res = await eventLambda.invoke<{ events: IEvent[] }>({
        actionName: eventsActions.getEvents
      })
      return res
    },
    getEvent: async (_, data) => {
      const res = await eventLambda.invoke<{ event: IEvent }>({
        actionName: eventsActions.getEvent,
        data
      })
      return res
    }
  },
  Mutation: {
    createEvent: async (_, { data }) => {
      const res = await eventLambda.invoke<{ event: IEvent }>({
        actionName: eventsActions.createEvent,
        data
      })
      return res.event
    }
  }
}
