import {
  TicketRepository,
  CreateTicketArgs
} from '../repositories/tickets-repository'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { shared } from '@ticket-swap-app/config/src/global-config'

const eventCreatedTopic = getSNSARN(shared.ticketCreatedEvent)

export const createTicketHandler = async (
  event: HandlerEvent<CreateTicketArgs>
) => {
  console.log('event:', event)
  const data = event.body.data
  const res = await TicketRepository.save(data)
  console.log('ticket saved: ', res)

  await publishEvent({
    message: data,
    arn: eventCreatedTopic
  })

  return res
}
