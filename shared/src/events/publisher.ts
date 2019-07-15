import { SNS } from 'aws-sdk/clients/all'
import { isOffline } from '../constants'
const sns = new SNS()

interface PublishEventArgs {
  subject?: string
  message: Record<string, string>
  arn: string
}
export const publishEvent = ({ subject, message, arn }: PublishEventArgs) => {

  const params = {
    Subject: subject,
    Message: JSON.stringify(message),
    TopicArn: arn
  }

  if (!isOffline()) {
    return sns.publish(params).promise()
  }
}
