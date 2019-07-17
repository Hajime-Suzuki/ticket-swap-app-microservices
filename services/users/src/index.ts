import { usersActions } from '@ticket-swap-app/shared/src/constants'
import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { getUserHandler } from './handlers/get-user'

type ActionTypes = keyof typeof usersActions

export const handler = async (event: HandlerEvent<any, ActionTypes>) => {
  // maybe need to stop calling lambda from graphql lambda. instead, use API gateway. in that case, body is string.
  // Or use Step Functions
  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body)
  }
  console.log('event: ', event)

  try {
    switch (event.body.action) {
      case usersActions.getUser: {
        const user = await getUserHandler(event)
        return handleResponse.success({ user })
      }
      default:
        handleResponse.error(new Error('unknown action'))
    }
  } catch (error) {
    return handleResponse.error(error)
  }
}
