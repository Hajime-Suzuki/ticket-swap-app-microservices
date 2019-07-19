import { SNS } from 'aws-sdk/clients/all'
import { isOffline } from '../constants'
import { shared } from '@ticket-swap-app/config/src/global-config'

interface PublishEventArgs {
  subject?: string
  message: Record<string, string>
  arn: string
}

const endpoint = isOffline()
  ? 'http://localhost:' + shared.snsOfflinePort
  : undefined

const sns = new SNS({ endpoint })

export const publishEvent = ({ subject, message, arn }: PublishEventArgs) => {
  const params = {
    Subject: subject,
    Message: JSON.stringify(message),
    TopicArn: arn
  }
  console.log({ endpoint, arn })

  return sns.publish(params).promise()
}
