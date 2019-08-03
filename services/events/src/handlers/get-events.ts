import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { eventRepository } from '../repository/event-repository'

export const getEventsHandler = async (_: HandlerEvent<undefined>) => {
  return eventRepository.scan()
}
