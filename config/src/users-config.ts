import { shared } from './global-config'
const { APP_NAME } = shared
export const tableNames = {
  users_tickets_table: `${APP_NAME}_users-tickets`,
  users_events_table: `${APP_NAME}_users-events`,
  users_users_table: `${APP_NAME}_users-users`
}
