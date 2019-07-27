import { eventsActions } from '@ticket-swap-app/shared/src/constants'
import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { createEventHandler } from './handlers/creat-event'

type ActionTypes = keyof typeof eventsActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }
  console.log('action: ', event.body.action)
  console.log('data: ', event.body.data)
  try {
    switch (event.body.action) {
      case eventsActions.createEvent: {
        const res = await createEventHandler(event)
        return handleResponse.success({ event: res })
      }
      default: {
        return handleResponse.error(new Error('unknown action'))
      }
    }
  } catch (error) {
    return handleResponse.error(error)
  }
}
