import { eventsActions } from '@ticket-swap-app/shared/src/constants'
import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'

type ActionTypes = keyof typeof eventsActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }
  console.log('action: ', event.body.action)
  try {
    switch (event.body.action) {
      case eventsActions.createEvent: {
        return handleResponse.success({ event: 1234 })
      }
      default: {
        return handleResponse.error(new Error('unknown action'))
      }
    }
  } catch (error) {
    return handleResponse.error(error)
  }
}
