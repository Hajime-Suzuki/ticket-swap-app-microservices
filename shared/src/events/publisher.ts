import { SNS } from 'aws-sdk/clients/all'
import { isOffline } from '../constants'

interface PublishEventArgs {
  subject?: string
  message: Record<string, string>
  arn: string
}

const sns = new SNS({
  endpoint: isOffline() ? 'http://localhost:' + process.env.snsOfflinePort : undefined
})

export const publishEvent = ({ subject, message, arn }: PublishEventArgs) => {

  const params = {
    Subject: subject,
    Message: JSON.stringify(message),
    TopicArn: arn
  }

  return sns.publish(params).promise()
}
