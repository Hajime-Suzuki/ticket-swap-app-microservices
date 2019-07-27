import { shared } from './global-config'
const { APP_NAME } = shared

const topics = {
  tickets_userEventsQueue: `${APP_NAME}-tickets-user-events-queue`,
  tickets_eventEventsQueue: `${APP_NAME}-tickets-event-events-queue`,
  users_ticketEventsQueue: `${APP_NAME}-users-ticket-events-queue`,
  users_eventEventsQueue: `${APP_NAME}-users-event-events-queue`,
  events_ticketEventsQueue: `${APP_NAME}-events-ticket-events-queue`,
  events_userEventsQueue: `${APP_NAME}-events-user-events-queue`,
  sqsOfflinePort: 4576
}

export const SQS = {
  ...topics
}
