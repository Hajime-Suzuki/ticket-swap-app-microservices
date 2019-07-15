export const ticketsActions = {
  createTicket: 'create-ticket',
  getTicket: 'get-ticket',
}

export const usersActions = {
  getUser: 'getUser'
}

export const getARN = (serviceName: string) => `arn:aws:sns:${process.env.region}:${process.env.AWS_ACCOUNT_ID}:${serviceName}`
