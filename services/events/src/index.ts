import {
  IGetEventResponse,
  IGetEventsResponse
} from '@ticket-swap-app/gql/src/generated/graphql'
import { eventsActions } from '@ticket-swap-app/shared/src/constants'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { createEventHandler } from './handlers/creat-event'
import { getEventHandler } from './handlers/get-event'
import { getEventsHandler } from './handlers/get-events'
import { logger, responseHandler } from './utils'

type ActionTypes = keyof typeof eventsActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }

  logger.log('event received', {
    action: event.body.action,
    body: event.body.data
  })

  try {
    switch (event.body.action) {
      case eventsActions.createEvent: {
        const res = await createEventHandler(event)
        return responseHandler.success({ event: res })
      }
      case eventsActions.getEvent: {
        const res = await getEventHandler(event)
        return responseHandler.success<IGetEventResponse>({
          event: res
        })
      }
      case eventsActions.getEvents: {
        const res = await getEventsHandler(event)
        return responseHandler.success<IGetEventsResponse>({ events: res })
      }
      default:
        throw new Error('unknown action')
    }
  } catch (error) {
    return responseHandler.error(error)
  }
}
