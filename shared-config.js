const serviceNames = {
  ticketServiceName: 'ticket-swap-tickets-service',
  gqlServiceName: 'ticket-swap-graphql-service'
}
const eventNames = {
  eventCreated: 'ticket-swap-event-created'
}

module.exports.shared = () => ({
  ...serviceNames,
  ...eventNames
})
