import {
  APIGatewayProxyEvent,
  Callback,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'

export type APIGatewayProxyHandler<TBody> = (
  event: Omit<APIGatewayProxyEvent, 'body'> & { body: TBody },
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => void | Promise<APIGatewayProxyResult>
