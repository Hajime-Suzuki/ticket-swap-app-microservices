import { shared } from '@ticket-swap-app/config/src/global-config'

export const ticketsActions = {
  createTicket: 'create-ticket',
  getTicket: 'get-ticket'
}

export const usersActions = {
  getUser: 'getUser'
}

export const getSNSARN = (serviceName: string) =>
  `arn:aws:sns:${shared.region}:${shared.AWS_ACCOUNT_ID}:${serviceName}`

export const isOffline = () => process.env.IS_OFFLINE
