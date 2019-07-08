import { ToJSON } from '@ticket-swap-app/shared/src/response'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { saveTicket } from './repository'

export const handler: APIGatewayProxyHandler = async event => {
  try {
    const res = await saveTicket({ eventId: '1', userId: '123', price: '1.22' })
    return ToJSON.success({ ticket: res })
  } catch (error) {
    return ToJSON.error(error)
  }
}
