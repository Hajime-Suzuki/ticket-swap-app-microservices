import { shared } from '@ticket-swap-app/config/src/global-config'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { publishEvent } from '@ticket-swap-app/shared/src/events/publisher'
import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import * as httpErrors from 'http-errors'
import * as shortId from 'shortid'
import { eventRepository } from '../repositories/event-repository'
import { ticketRepository } from '../repositories/tickets-repository'
import { userRepository } from '../repositories/users-repository'

const eventCreatedTopic = getSNSARN(shared.ticketsEvent)

export const createTicketHandler = async (
  event: HandlerEvent<ICreateTicketInput>
) => {
  const data = event.body.data
  const evt = await eventRepository.find({
    id: data.eventId
  })

  const user = await userRepository.find({ email: event.body.user.email })

  if (!evt) throw httpErrors(404, 'event not found')
  if (!user) throw httpErrors(404, 'user not found')

  const params = {
    id: shortId.generate(),
    userId: user.id,
    username: user.username,
    ...data
  }
  const res = await ticketRepository.save(params)

  await publishEvent<TicketCreatedEventBody>({
    message: { type: 'ticketCreated', payload: params },
    arn: eventCreatedTopic
  })

  return res
}
