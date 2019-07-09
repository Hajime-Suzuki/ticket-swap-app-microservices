import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { APIGatewayProxyHandler } from '@ticket-swap-app/shared/src/types'
import { TicketRepository } from './repository'

export const handler: APIGatewayProxyHandler<
  ICreateTicketInput
> = async event => {
  try {
    console.log('body received: ', event.body)
    const res = await TicketRepository.save(event.body)

    return handleResponse.success({ ticket: res })
  } catch (error) {
    return handleResponse.error(error)
  }
}
