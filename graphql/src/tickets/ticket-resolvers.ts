import { Lambda } from 'aws-sdk'
import { IResolvers, ITicket } from '../generated/graphql'

console.log({ port: process.env.ticketPort })

// TODO: use dataLayer.
class TicketLambda {
  lambda: Lambda
  constructor(port: string) {
    this.lambda = new Lambda({
      apiVersion: '2015-03-31',
      endpoint: process.env.IS_OFFLINE ? 'http://localhost:' + port : undefined
    })
  }

  async invoke<TRes = any>(data: any) {
    const res = await this.lambda
      .invoke({
        FunctionName: process.env.ticketServiceName,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({
          body: data
        })
      })
      .promise()

    return JSON.parse(JSON.parse(res.Payload.toString()).body) as TRes
  }
}

const ticketLambda = new TicketLambda(process.env.ticketPort)

export const ticketResolvers: IResolvers = {
  Query: {
    getTicket: async (_, { eventId, userId }) => {
      const res = await ticketLambda.invoke<{ ticket: ITicket }>({ eventId, userId })
      return res
    }
  },
  Mutation: {
    createTicket: async (_, { data }) => {
      try {
        const { ticket } = await ticketLambda.invoke<{ ticket: ITicket }>(data)
        return ticket
      } catch (err) {
        console.log(err)
      }
    }
  }
}
