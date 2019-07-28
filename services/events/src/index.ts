import { eventsActions } from '@ticket-swap-app/shared/src/constants'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { createEventHandler } from './handlers/creat-event'
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
      default:
        throw new Error('unknown action')
    }
  } catch (error) {
    return responseHandler.error(error)
  }
}
