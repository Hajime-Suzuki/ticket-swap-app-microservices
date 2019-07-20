import { SQSHandler } from 'aws-lambda'
import { UserRepository } from '../repositories/users-repository'
import { UserSignUpEventPayload } from '@ticket-swap-app/shared/src/types/events'

export const handler: SQSHandler = async event => {
  const data: UserSignUpEventPayload = JSON.parse(event.Records[0].body)
  console.log('received data: ', data)
  await UserRepository.save(data)
}
