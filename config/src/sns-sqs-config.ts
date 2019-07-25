import { shared } from './global-config'
const { APP_NAME } = shared

const topics = {
  tickets_userEventsQueue: `${APP_NAME}-tickets-user-events-queue`,
  users_ticketEventsQueue: `${APP_NAME}-users-ticket-events-queue`,
  sqsOfflinePort: 4576
}

export const SQS = {
  ...topics
}
