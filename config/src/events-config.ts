import { shared } from './global-config'
const { APP_NAME } = shared
export const tableNames = {
  events_tickets_table: `${APP_NAME}_events-tickets`,
  events_events_table: `${APP_NAME}_events-events`,
  events_users_table: `${APP_NAME}_events-users`
}
