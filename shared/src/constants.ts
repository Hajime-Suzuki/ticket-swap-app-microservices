import { shared } from '@ticket-swap-app/config/src/global-config'

export const ticketsActions = {
  createTicket: 'create-ticket',
  getTicket: 'get-ticket',
  updateTicket: 'update-ticket'
}

export const usersActions = {
  getUser: 'getUser'
}

export const getSNSARN = (serviceName: string) => {
  if (isOffline()) {
    return 'arn:aws:sns:eu-central-1:000000000000:' + serviceName
  }
  return `arn:aws:sns:${shared.region}:${shared.AWS_ACCOUNT_ID}:${serviceName}`
}

export const isOffline = () => process.env.IS_OFFLINE || process.env.IS_LOCAL
