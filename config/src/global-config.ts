import { secrets } from './.secrets'

const APP_NAME = 'ticket-swap'

const serviceNames = {
  ticketServiceName: `${APP_NAME}-tickets`,
  gqlServiceName: `${APP_NAME}-graphql`,
  usersServiceName: `${APP_NAME}-users`
}
const eventNames = {
  // eventCreatedEvent: `${APP_NAME}-users-event`,
  usersEvent: `${APP_NAME}-user-events`,
  ticketsEvent: `${APP_NAME}-ticket-events`
}

const ports = {
  gqlPort: 5000,
  ticketsPort: 5001,
  usersPort: 5002,
  snsOfflinePort: 4575
}

const dynamo = {
  ticketsDbPort: 8000,
  usersDbPort: 8001
}

const awsSettings = {
  region: 'eu-central-1'
}

const functionNames = {
  ticketsFunc: `${serviceNames.ticketServiceName}-handler`,
  usersFunc: `${serviceNames.usersServiceName}-handler`
}

export const shared = {
  ...serviceNames,
  ...eventNames,
  ...ports,
  ...awsSettings,
  ...dynamo,
  ...functionNames,
  ...secrets,
  APP_NAME
  // key: ${self:custom.someValue} works too.
}
