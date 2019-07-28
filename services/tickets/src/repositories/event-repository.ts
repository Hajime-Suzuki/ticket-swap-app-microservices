import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import {
  Mapper,
  MapperConstructorArgs
} from '@ticket-swap-app/shared/src/database'
import { EventModel } from '../models/Event'

class EventRepository extends Mapper<EventModel, typeof EventModel> {
  constructor(args: MapperConstructorArgs<typeof EventModel>) {
    super(args)
  }
}

export const eventRepository = new EventRepository({
  region: awsSettings.region,
  endpoint: isOffline()
    ? 'http://localhost:' + dynamoPorts.ticketsDbPort
    : undefined,
  model: EventModel
})
