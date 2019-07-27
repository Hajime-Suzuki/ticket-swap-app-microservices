import {
  IUser,
  IMutationCreateEventArgs,
  IEvent
} from '@ticket-swap-app/gql/src/generated/graphql'

import { Mapper } from '@ticket-swap-app/shared/src/database'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import { shared } from '@ticket-swap-app/config/src/global-config'
import { EventModel } from '../models/Event'
const { eventsDbPort, region } = shared

const mapper = new Mapper<EventModel, typeof EventModel>({
  region,
  endpoint: isOffline() ? 'http://localhost:' + eventsDbPort : undefined,
  model: EventModel
})

const save = (
  data: IMutationCreateEventArgs['data'] & { id: IEvent['id'] }
) => {
  return mapper.save(data)
}

export interface FindEventArgs {
  id: IEvent['id']
}
const findByKey = async (args: FindEventArgs) => {
  const res = await mapper.query(args)
  return res[0]
}

const scan = async () => {
  return mapper.scan()
}

export const EventRepository = {
  save,
  scan,
  findByKey
}
