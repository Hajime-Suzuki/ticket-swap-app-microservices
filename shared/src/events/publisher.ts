import { SNS } from 'aws-sdk/clients/all'
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

  return sns.publish(params).promise()
}
