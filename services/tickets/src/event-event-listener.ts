import { SNSHandler } from 'aws-lambda'

export const handler: SNSHandler = async event => {
  console.log('message received: ', event.Records[0].Sns.Message)
  return
}
