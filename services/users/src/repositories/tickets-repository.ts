// TODO: check if this can be used
import {
  ITicket,
  ICreateTicketInput
} from '@ticket-swap-app/gql/src/generated/graphql'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import {
  Mapper,
  MapperConstructorArgs
} from '@ticket-swap-app/shared/src/database'
import { TicketModel } from '../models/Ticket'
import {
  awsSettings,
  dynamoPorts
} from '@ticket-swap-app/config/src/global-config'

class TicketRepository extends Mapper<TicketModel, typeof TicketModel> {
  constructor(args: MapperConstructorArgs<typeof TicketModel>) {
    super(args)
  }
}

export const ticketRepository = new TicketRepository({
  region: awsSettings.region,
  endpoint: isOffline()
    ? 'http://localhost:' + dynamoPorts.usersDbPort
    : undefined,
  model: TicketModel
})
