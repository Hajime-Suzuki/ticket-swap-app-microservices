import { GetTicketsByUserQuery } from './generated/tickets'

export type TicketByUser = GetTicketsByUserQuery['getTickets']['tickets'][number]
