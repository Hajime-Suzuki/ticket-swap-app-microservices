import { GetEventsQuery } from 'graphql/generated/events'

export type EventsFromQueryRes = GetEventsQuery['getEvents']['events']
