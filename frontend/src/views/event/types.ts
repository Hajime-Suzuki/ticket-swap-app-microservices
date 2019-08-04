import { GetEventQuery } from 'graphql/generated/events'

export type EventFromQueryRes = GetEventQuery['getEvent']['event']
