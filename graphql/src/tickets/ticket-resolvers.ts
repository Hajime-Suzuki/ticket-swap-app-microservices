import { Lambda } from 'aws-sdk'
import { IResolvers, ITicket } from '../generated/graphql'
import { ticketActions } from '@ticket-swap-app/shared/src/constants'
import { ResolverContext } from '..';
console.log({ port: process.env.ticketPort })

const ticketsFunc = process.env.ticketsFunc


// TODO: use dataLayer.
class TicketLambda {
  lambda: Lambda
  constructor(port: string) {
    this.lambda = new Lambda({
      apiVersion: '2015-03-31',
      endpoint: process.env.IS_OFFLINE ? 'http://localhost:' + port : undefined
    })
  }

  async invoke<TRes = any>(actionName: string, data: any) {
    const params = {
      FunctionName: ticketsFunc,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        action: actionName,
        body: data
      })
    }
    console.log('will invoke lambda: ', params)
    const res = await this.lambda.invoke(params).promise()
    console.log('invoked lambda: ', res)
    if (res.StatusCode !== 200) throw new Error(`lambda function ${ticketsFunc}.${actionName} failed`)
    return JSON.parse(JSON.parse(res.Payload.toString()).body) as TRes
  }
}

const ticketLambda = new TicketLambda(process.env.ticketPort)

export const ticketResolvers: IResolvers<ResolverContext> = {
  Query: {
    getTicket: async (_, { eventId, userId }) => {
      console.log('getTicket')
      const res = await ticketLambda.invoke<{ ticket: ITicket }>(ticketActions.getTicket, { eventId, userId })
      return res
    }
  },
  Mutation: {
    createTicket: async (_, { data }) => {
      console.log('createTicket')
      console.log('data: ', data)
      try {
        const { ticket } = await ticketLambda.invoke<{ ticket: ITicket }>(ticketActions.createTicket, data)
        return ticket
      } catch (err) {
        console.log(err)
      }
    }
  }
}
