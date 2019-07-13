import { usersActions } from '@ticket-swap-app/shared/src/constants'
import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
type ActionTypes = keyof typeof usersActions

export interface Event<TBody = any> {
  action: ActionTypes
  body: TBody
}

export const handler = async (event: Event) => {
  console.log('event: ', event)
  try {
    switch (event.action) {
      case usersActions.createUser: {
        const user: IUser = {
          id: '1234',
          userName: 'userName',
          email: 'some-email@t.com'
        }
        return handleResponse.success({ user })
      }
      default:
        handleResponse.error(new Error('unknown action'))
    }
  } catch (error) {
    return handleResponse.error(error)
  }
}
