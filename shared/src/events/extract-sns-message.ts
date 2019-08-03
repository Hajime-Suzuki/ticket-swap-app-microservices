import { SNSEvent } from 'aws-lambda'
import { Logger } from '../logger'
import { EventHandlerBody, EventTypes } from '../types/events'

const logger = new Logger('SNS Message Handler')

export const extractSNSMessage = <TType extends EventTypes>(
  event: SNSEvent
) => {
  const { Message } = event.Records[0].Sns
  const message: EventHandlerBody<TType, any> = JSON.parse(Message)
  logger.log('event received', { type: message.type, payload: message.payload })
  return message
}
