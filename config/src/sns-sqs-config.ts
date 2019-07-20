import { shared } from './global-config'
const { APP_NAME } = shared

const topics = {
  ticketsUserSignUpTopic: `${APP_NAME}-tickets-user-signup`,
  usersTicketCreatedTopic: `${APP_NAME}-users-ticket-created`
}

export const SQS = {
  ...topics
}
