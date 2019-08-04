import { eventNames } from '@ticket-swap-app/config/src/global-config'
import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import { UserSignUpEventBody } from '@ticket-swap-app/shared/src/types/events'
import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import * as shortid from 'shortid'
import { logger } from './utils'
import { userRepository } from './repositories/users-repository'

const arn = getSNSARN(eventNames.usersEvent)

export const handler: CognitoUserPoolTriggerHandler = async event => {
  // console.log(JSON.stringify(event))
  logger.log('event received', { event })
  event.response.autoConfirmUser = true

  const params = {
    id: shortid.generate(),
    email: event.userName,
    username: event.request.userAttributes.preferred_username
  }
  await userRepository.save(params)

  await publishEvent<UserSignUpEventBody>({
    message: { type: 'userSignUp', payload: params },
    arn
  })

  return event
}
