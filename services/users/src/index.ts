import { usersActions } from '@ticket-swap-app/shared/src/constants'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { getUserHandler } from './handlers/get-user'
import { logger, responseHandler } from './utils'

type ActionTypes = keyof typeof usersActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  // maybe need to stop calling lambda from graphql lambda. instead, use API gateway. in that case, body is string.
  // Or use Step Functions
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }

  logger.log('event received: ', {
    action: event.body.action,
    body: event.body
  })

  try {
    switch (event.body.action) {
      case usersActions.getUser: {
        const user = await getUserHandler(event)
        return responseHandler.success({ user })
      }
      default:
        throw new Error('unknown action')
    }
  } catch (error) {
    return responseHandler.error(error)
  }
}
