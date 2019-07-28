import { eventNames } from '@ticket-swap-app/config/src/global-config'
import { ICreateEventInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import {
  EventCreatedEventBody,
  EventEventTypes
} from '@ticket-swap-app/shared/src/types/events'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import * as shortid from 'shortid'
import { eventRepository } from '../repository/event-repository'
import { logger } from '../utils'

const eventCreatedTopic = getSNSARN(eventNames.eventsEvent)

export const createEventHandler = async (
  event: HandlerEvent<ICreateEventInput>
) => {
  const data = event.body.data
  const newEvent = { ...data, id: shortid.generate() }

  const res = await eventRepository.save(newEvent)

  const params = {
    message: { type: 'eventCreated' as EventEventTypes, payload: newEvent },
    arn: eventCreatedTopic
  }

  logger.log('sns will trigger event: ', params)

  await publishEvent<EventCreatedEventBody>(params)

  return res
}
