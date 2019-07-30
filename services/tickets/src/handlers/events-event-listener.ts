import { extractSNSMessage } from '@ticket-swap-app/shared/src/events/extract-sns-message'
import {
  EventEventPayload,
  EventEventTypes,
  EventCreatedEventBody
} from '@ticket-swap-app/shared/src/types/events'
import { SNSHandler } from 'aws-lambda'
import { eventRepository } from '../repositories/event-repository'

export const handler: SNSHandler = async event => {
  const { type, payload } = extractSNSMessage<EventEventTypes>(event)

  switch (type) {
    case 'eventCreated': {
      await eventCreateHandler(payload)
    }
  }
}

const eventCreateHandler = async (data: EventCreatedEventBody['payload']) => {
  await eventRepository.save(data)
}
