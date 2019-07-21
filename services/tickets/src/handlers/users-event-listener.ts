import { SQSHandler } from 'aws-lambda'
import { UserRepository } from '../repositories/users-repository'
import { UserSignUpEventBody } from '@ticket-swap-app/shared/src/types/events'

export const handler: SQSHandler = async event => {
  const { type, payload }: UserSignUpEventBody = JSON.parse(
    event.Records[0].body
  )
  console.log('received data: ', { type, payload })
  await UserRepository.save(payload)
}
