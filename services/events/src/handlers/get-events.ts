import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { eventRepository } from '../repository/event-repository'
import * as httpErrors from 'http-errors'

export const getEventsHandler = async (_: HandlerEvent<undefined>) => {
  return eventRepository.scan()
}
