import { SNS } from 'aws-sdk/clients/all'
import { isOffline } from '../constants'
import { shared } from '@ticket-swap-app/config/src/global-config'

interface PublishEventArgs {
  subject?: string
  message: Record<string, string>
  arn: string
}

const sns = new SNS({
  endpoint: isOffline()
    ? 'http://localhost:' + shared.snsOfflinePort
    : undefined
})

export const publishEvent = ({ subject, message, arn }: PublishEventArgs) => {
  const params = {
    Subject: subject,
    Message: JSON.stringify(message),
    TopicArn: arn
  }

  return sns.publish(params).promise()
}
