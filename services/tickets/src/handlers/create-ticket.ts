import { shared } from '@ticket-swap-app/config/src/global-config'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { ticketRepository } from '../repositories/tickets-repository'

const eventCreatedTopic = getSNSARN(shared.ticketsEvent)

export const createTicketHandler = async (
  event: HandlerEvent<ICreateTicketInput>
) => {
  console.log('event:', event)
  const data = event.body.data
  const res = await ticketRepository.save(data)
  console.log('ticket saved: ', res)

  await publishEvent<TicketCreatedEventBody>({
    message: { type: 'ticketCreated', payload: data },
    arn: eventCreatedTopic
  })

  return res
}
