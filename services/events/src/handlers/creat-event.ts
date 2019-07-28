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
import { EventRepository } from '../repository/event-repository'

const eventCreatedTopic = getSNSARN(eventNames.eventsEvent)

export const createEventHandler = async (
  event: HandlerEvent<ICreateEventInput>
) => {
  const data = event.body.data
  const newEvent = { ...data, id: shortid.generate() }

  const res = await EventRepository.save(newEvent)

  const params = {
    message: { type: 'eventCreated' as EventEventTypes, payload: newEvent },
    arn: eventCreatedTopic
  }

  console.log('sns will trigger event: ', JSON.stringify(params, null, 2))
  await publishEvent<EventCreatedEventBody>(params)

  return res
}
