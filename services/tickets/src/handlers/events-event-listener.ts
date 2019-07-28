import { EventCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { SNSMessage, SQSHandler } from 'aws-lambda'
import { eventRepository } from '../repositories/event-repository'
import { logger } from '../utils'

export const handler: SQSHandler = async event => {
  const { Message }: SNSMessage = JSON.parse(event.Records[0].body)
  const { type, payload }: EventCreatedEventBody = JSON.parse(Message)

  logger.log('received data', { type, payload })

  await eventRepository.save(payload)
}
