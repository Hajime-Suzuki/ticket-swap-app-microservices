import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { eventRepository } from '../repository/event-repository'
import {
  IQueryGetUserArgs,
  IEvent
} from '@ticket-swap-app/gql/src/generated/graphql'
import * as httpErrors from 'http-errors'

export const getEventHandler = async (
  event: HandlerEvent<IQueryGetUserArgs>
) => {
  const evt = await eventRepository.find<IEvent>(event.body.data)
  if (!evt) throw httpErrors(404, 'event not found')
  return evt
}
