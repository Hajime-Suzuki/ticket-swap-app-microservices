import { getARN } from '@ticket-swap-app/shared/src/constants'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import * as shortid from 'shortid'
const arn = getARN(process.env.userSignUpEvent)

export const handler: CognitoUserPoolTriggerHandler = async event => {

  console.log('event received', JSON.stringify(event), null, 2)
  event.response.autoConfirmUser = true
  await publishEvent({ message: { id: shortid.generate(), email: event.userName }, arn })

  return event
}
