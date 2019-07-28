import { SQSHandler, SNSMessage } from 'aws-lambda'
import { UserSignUpEventBody } from '@ticket-swap-app/shared/src/types/events'
import { logger } from '../utils'
import { UserRepository } from '../repository/user-repository'

export const handler: SQSHandler = async event => {
  const { Message }: SNSMessage = JSON.parse(event.Records[0].body)
  const { type, payload }: UserSignUpEventBody = JSON.parse(Message)

  logger.log('received data: ', { type, payload })
  const user = await UserRepository.findByEmail({ email: payload.email })
  if (!user) {
    await UserRepository.save(payload)
    logger.log('user created')
    return
  }
  logger.log('user already exists')
}
