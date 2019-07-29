import { UserSignUpEventBody } from '@ticket-swap-app/shared/src/types/events'
import { SNSMessage, SQSHandler, SNSHandler } from 'aws-lambda'
import { userRepository } from '../repository/user-repository'
import { logger } from '../utils'

export const handler: SNSHandler = async event => {
  const { Message }: SNSMessage = event.Records[0].Sns
  const { type, payload }: UserSignUpEventBody = JSON.parse(Message)

  logger.log('received data: ', { type, payload })
  const user = await userRepository.findByEmail({ email: payload.email })
  if (!user) {
    await userRepository.save(payload)
    logger.log('user created')
    return
  }
  logger.log('user already exists')
}
