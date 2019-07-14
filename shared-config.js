const secrets = require('./.env')

const serviceNames = {
  ticketServiceName: 'ticket-swap-tickets-service',
  gqlServiceName: 'ticket-swap-graphql-service',
  usersServiceName: 'ticket-swap-users-service'
}
const eventNames = {
  eventCreated: 'ticket-swap-event-created',
  userSignUpEvent: 'ticket-swap-user-sign-up'
}

const ports = {
  gqlPort: 8080,
  ticketsPort: 8081,
  usersPort: 8082
}

const dynamo = {
  ticketsDbPort: 8000,
  usersDbPort: 8001
}

const awsSettings = {
  region: 'eu-central-1'
}

const functionNames = {
  ticketsFunc: 'ticket-swap-tickets-handler',
  usersFunc: 'ticket-swap-users-handler'
}

module.exports.shared = () => ({
  ...secrets,
  ...serviceNames,
  ...eventNames,
  ...ports,
  ...awsSettings,
  ...dynamo,
  ...functionNames
})
