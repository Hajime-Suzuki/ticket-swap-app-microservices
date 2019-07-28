import { SQSHandler, SNSMessage } from 'aws-lambda'
import { UserRepository } from '../repositories/users-repository'
import { UserSignUpEventBody } from '@ticket-swap-app/shared/src/types/events'

export const handler: SQSHandler = async event => {
  const { Message }: SNSMessage = JSON.parse(event.Records[0].body)
  const { type, payload }: UserSignUpEventBody = JSON.parse(Message)

  console.log('received data: ', { type, payload })

  await UserRepository.save(payload)
}
