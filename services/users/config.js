const { shared } = require('../../shared-config')

const tableNames = {
  users_tickets_table: 'Ticket-swap-users-tickets',
  users_events_table: 'Ticket-swap-users-events',
  users_users_table: 'Ticket-swap-users-users'
}

module.exports.env = () => {
  const output = { ...shared(), ...tableNames }
  return output
}
