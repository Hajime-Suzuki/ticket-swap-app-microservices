import { shared } from './global-config'
const { APP_NAME } = shared
export const tableNames = {
  tickets_tickets_table: `${APP_NAME}-tickets-tickets`,
  tickets_events_table: `${APP_NAME}-tickets-events`,
  tickets_users_table: `${APP_NAME}-tickets-users`
}
