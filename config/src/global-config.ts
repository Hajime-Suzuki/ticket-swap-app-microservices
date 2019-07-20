import { secrets } from './.secrets'

const APP_NAME = 'ticket-swap'

const serviceNames = {
  ticketServiceName: `${APP_NAME}-tickets`,
  gqlServiceName: `${APP_NAME}-graphql`,
  usersServiceName: `${APP_NAME}-users`
}
const eventNames = {
  eventCreatedEvent: `${APP_NAME}-event-created`,
  userSignUpEvent: `${APP_NAME}-user-sign-up`
}

const ports = {
  gqlPort: 8080,
  ticketsPort: 8081,
  usersPort: 8082,
  snsOfflinePort: 7000
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
