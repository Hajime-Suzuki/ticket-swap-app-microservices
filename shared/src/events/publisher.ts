import { shared } from '@ticket-swap-app/config/src/global-config'
import { SNS } from 'aws-sdk/clients/all'
import { isOffline } from '../constants'
import { logger } from '../../../services/tickets/src/utils'

interface PublishEventArgs<TBody> {
  subject?: string
  message: TBody
  arn: string
}

const endpoint = isOffline()
  ? 'http://localhost:' + shared.snsOfflinePort
  : undefined

const sns = new SNS({ endpoint })

export const publishEvent = <TBody>({
  subject,
  message,
  arn
}: PublishEventArgs<TBody>) => {
  const params = {
    Subject: subject,
    Message: JSON.stringify(message),
    TopicArn: arn
  }
  logger.log('publish event', { endpoint, arn })

  return sns.publish(params).promise()
}
