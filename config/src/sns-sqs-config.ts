import { shared } from './global-config'
const { APP_NAME } = shared

const topics = {
  tickets_userTopic: `${APP_NAME}-tickets-user-events`,
  users_ticketTopic: `${APP_NAME}-users-ticket-events`
}

export const SQS = {
  ...topics
}
