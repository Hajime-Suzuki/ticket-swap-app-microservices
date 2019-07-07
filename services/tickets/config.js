const { shared } = require('../../shared-config')

const tableNames = {
  tickets_tickets_table: 'Ticket-swap-tickets-tickets',
  tickets_events_table: 'Ticket-swap-tickets-events',
  tickets_users_table: 'Ticket-swap-tickets-users'
}

module.exports.env = () => {
  const output = { ...shared(), ...tableNames }

  console.log('env: ', output)
  return output
}
