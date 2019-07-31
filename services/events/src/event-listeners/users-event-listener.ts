import { extractSNSMessage } from '@ticket-swap-app/shared/src/events/extract-sns-message'
import {
  UserEventTypes,
  UserSignUpEventBody
} from '@ticket-swap-app/shared/src/types/events'
import { SNSHandler } from 'aws-lambda'
import { userRepository } from '../repository/user-repository'
import { logger } from '../utils'

export const handler: SNSHandler = async event => {
  const { type, payload } = extractSNSMessage<UserEventTypes>(event)

  switch (type) {
    case 'userSignUp': {
      await userSignUpHandler(payload)
    }
  }
}

const userSignUpHandler = async (data: UserSignUpEventBody['payload']) => {
  const user = await userRepository.findByEmail({ email: data.email })

  if (!user) {
    await userRepository.save(data)
    logger.log('user created')
    return
  }
  logger.log('user already exists')
}
