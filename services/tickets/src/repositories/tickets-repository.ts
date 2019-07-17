import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import { Mapper } from '@ticket-swap-app/shared/src/database'
import { TicketModel } from '../models/Ticket'
import { shared } from '@ticket-swap-app/config/src/global-config'

const { region, ticketsDbPort } = shared

const mapper = new Mapper<ITicket, typeof TicketModel>({
  region,
  endpoint: isOffline() ? 'http://localhost:' + ticketsDbPort : undefined,
  model: TicketModel
})

export type CreateTicketArgs = Pick<TicketModel, 'userId' | 'eventId' | 'price'>

const save = (data: CreateTicketArgs) => {
  return mapper.save(data)
}

export interface FindTicketArgs {
  userId: TicketModel['userId']
  eventId: TicketModel['eventId']
}
const findByKey = async (args: FindTicketArgs) => {
  const res = await mapper.query(args)
  return res[0]
}

const scan = async () => {
  return mapper.scan()
}

export const TicketRepository = {
  save,
  scan,
  findByKey
}
