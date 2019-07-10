import { handleResponse } from '@ticket-swap-app/shared/src/response'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { APIGatewayProxyHandler } from '@ticket-swap-app/shared/src/types'
import { TicketRepository } from './repository'
// import from 'aws-sdk'
// event: { userId: '1', eventId: '9998', price: '159.09' }
export const handler = async event => {
  try {
    console.log('event:', event)
    const res = await TicketRepository.save(event.body)
    console.log('ticket saved: ', res)
    return handleResponse.success({ ticket: res })
  } catch (error) {
    return handleResponse.error(error)
  }
}
