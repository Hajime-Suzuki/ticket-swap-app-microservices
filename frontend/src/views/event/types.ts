import { GetEventQuery } from 'graphql/generated/events'
import { GetTicketsQuery } from 'graphql/generated/tickets'

export type EventFromQueryRes = GetEventQuery['getEvent']['event']
export type TicketFromQueryRes = GetTicketsQuery['getTickets']['tickets']
