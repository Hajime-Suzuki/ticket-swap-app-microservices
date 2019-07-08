const serviceNames = {
  ticketServiceName: 'ticket-swap-tickets-service',
  gqlServiceName: 'ticket-swap-graphql-service'
}
const eventNames = {
  eventCreated: 'ticket-swap-event-created'
}

const ports = {
  gqlPort: 8080,
  ticketPort: 8081
}

const dynamo = {
  ticketDbPort: 8000
}

const awsSettings = {
  region: 'eu-central-1'
}

module.exports.shared = () => ({
  ...serviceNames,
  ...eventNames,
  ...ports,
  ...awsSettings,
  ...dynamo
})
