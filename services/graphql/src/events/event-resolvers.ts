import { IResolvers } from '../generated/graphql'
import { Lambda } from 'aws-sdk'

const lambda = new Lambda({
  apiVersion: '2015-03-31'
})

// TODO: implement
export const eventResolvers: IResolvers = {
  Query: {
    events: async () => {
      try {
        const res = await lambda
          .invoke({
            FunctionName: 'ticket-swap-tickets-service',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({ type: 'test!!!!' })
          })
          .promise()

        console.log(res)
        return 'event!!!'
      } catch (err) {
        console.log(err)
      }
    }
  }
}
