import { shared, awsSettings } from '@ticket-swap-app/config/src/global-config'
import { secrets } from '@ticket-swap-app/config/src/.secrets'

export const ticketsActions = {
  createTicket: 'create-ticket',
  getTickets: 'get-tickets',
  getTicket: 'get-ticket',
  updateTicket: 'update-ticket'
}

export const eventsActions = {
  createEvent: 'create-event',
  getEvent: 'get-event',
  getEvents: 'get-events'
}

export const usersActions = {
  getUser: 'getUser'
}

export const getSNSARN = (serviceName: string) => {
  if (isOffline()) {
    return `arn:aws:sns:${awsSettings.region}:${secrets.AWS_ACCOUNT_ID}:${serviceName}`
  }
  return `arn:aws:sns:${shared.region}:${shared.AWS_ACCOUNT_ID}:${serviceName}`
}

export const isOffline = () => process.env.IS_OFFLINE || process.env.IS_LOCAL
