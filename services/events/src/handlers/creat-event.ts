import { shared } from '@ticket-swap-app/config/src/global-config'
import { ICreateEventInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { getSNSARN } from '@ticket-swap-app/shared/src/constants'
import { HandlerEvent } from '@ticket-swap-app/shared/src/types/service-handler'
import { EventRepository } from '../repository/events-repository'

const eventCreatedTopic = getSNSARN(shared.ticketsEvent)

export const createEventHandler = async (
  event: HandlerEvent<ICreateEventInput>
) => {
  const data = event.body.data
  const res = await EventRepository.save(data)
  console.log('ticket saved: ', res)

  // TODO: implement later
  // publish event!

  return res
}
