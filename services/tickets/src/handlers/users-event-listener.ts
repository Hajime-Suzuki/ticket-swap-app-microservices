import { SNSHandler } from 'aws-lambda'
import { UserRepository } from '../repositories/users-repository'

interface UserSignUpEvent {
  email: string
}

export const handler: SNSHandler = async event => {
  const data: UserSignUpEvent = JSON.parse(event.Records[0].Sns.Message)
  console.log('received data: ', data)
  await UserRepository.save(data)
}
