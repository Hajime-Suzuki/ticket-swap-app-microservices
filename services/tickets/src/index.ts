import { ToJSON } from '@ticket-swap-app/shared/src/response'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'
import {
  APIGatewayProxyEvent,
  Context,
  Callback,
  APIGatewayProxyResult
} from 'aws-lambda'
import { saveTicket } from './repository'

// TODO: move to shared
type APIGatewayProxyHandler<TBody> = (
  event: Omit<APIGatewayProxyEvent, 'body'> & { body: TBody },
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => void | Promise<APIGatewayProxyResult>

export const handler: APIGatewayProxyHandler<
  ICreateTicketInput
> = async event => {
  try {
    console.log(event.body)
    const res = await saveTicket(event.body)
    return ToJSON.success({ ticket: res })
  } catch (error) {
    return ToJSON.error(error)
  }
}
