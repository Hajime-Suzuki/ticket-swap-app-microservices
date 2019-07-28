import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import * as shortid from 'shortid'
import { UserRepository } from './repositories/users-repository'
import { eventNames } from '@ticket-swap-app/config/src/global-config'
import { UserSignUpEventBody } from '@ticket-swap-app/shared/src/types/events'
import { logger } from './utils'

const arn = getSNSARN(eventNames.usersEvent)

export const handler: CognitoUserPoolTriggerHandler = async event => {
  logger.log('event received', event.response)
  event.response.autoConfirmUser = true

  const params = { id: shortid.generate(), email: event.userName }
  await UserRepository.save(params)

  await publishEvent<UserSignUpEventBody>({
    message: { type: 'userSignUp', payload: params },
    arn
  })

  return event
}
