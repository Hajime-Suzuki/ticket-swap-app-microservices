import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import {
  Mapper,
  MapperConstructorArgs
} from '@ticket-swap-app/shared/src/database'
import { TicketModel } from '../models/Ticket'

class TicketRepository extends Mapper<TicketModel, typeof TicketModel> {
  constructor(args: MapperConstructorArgs<typeof TicketModel>) {
    super(args)
  }
}

export const ticketRepository = new TicketRepository({
  region: awsSettings.region,
  endpoint: isOffline()
    ? 'http://localhost:' + dynamoPorts.eventsDbPort
    : undefined,
  model: TicketModel
})
