import { UserSignUpEventPayload } from '@ticket-swap-app/shared/src/types/events'
import { SQSHandler } from 'aws-lambda'

export const handler: SQSHandler = async event => {
  const data: UserSignUpEventPayload = JSON.parse(event.Records[0].body)
  console.log('received data: ', data)
  // SAVE TO DB
}
