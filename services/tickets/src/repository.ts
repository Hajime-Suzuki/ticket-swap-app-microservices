import { newMapper } from '@ticket-swap-app/shared/src/database'
import { TicketModel } from './model'
const { IS_OFFLINE, region, ticketDbPort } = process.env

const mapper = newMapper({
  region,
  endpoint: IS_OFFLINE ? 'http://localhost:' + ticketDbPort : undefined
})

const merge = (data: Partial<TicketModel>) => {
  return Object.assign(new TicketModel(), {
    ...data,
    createdAt: Date.now().toString()
  })
}
export const saveTicket = (
  data: Pick<TicketModel, 'userId' | 'eventId' | 'price'>
) => {
  return mapper.put(merge(data))
}
