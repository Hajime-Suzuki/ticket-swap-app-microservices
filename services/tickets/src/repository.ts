import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DynamoDB } from 'aws-sdk'
import { TicketModel } from './model'

// const db = new DynamoDB.DocumentClient({
//   region: 'localhost',
//   endpoint: 'http://localhost:8000',
//   convertEmptyValues: true
// })

export class EntityModel {
  mapper: DataMapper
  static region: string
  static endpoint: string
  static mapper: DataMapper
  static connect = (args: { region: string; endpoint: string }) => {
    EntityModel.region = args.region
    EntityModel.endpoint = args.endpoint
    EntityModel.mapper = new DataMapper({
      client: new DynamoDB({
        region: EntityModel.region,
        endpoint: EntityModel.endpoint
      })
    })
  }
}

export class Ticket extends EntityModel {
  static async put(data: Pick<TicketModel, 'userId' | 'eventId' | 'price'>) {
    return EntityModel.mapper.put(
      Object.assign(new TicketModel(), {
        eventId: '1',
        userId: '123',
        price: '1.22'
      })
    )
  }

  static merge(data: Partial<TicketModel>) {
    return Object.assign(new TicketModel(), {
      eventId: '1',
      userId: '123',
      price: '1.22'
    })
  }
}

const mapper = new DataMapper({
  client: new DynamoDB({
    region: EntityModel.region,
    endpoint: EntityModel.endpoint
  })
})
const merge = (data: Partial<TicketModel>) => {
  return Object.assign(new TicketModel(), data)
}
export const saveTicket = (
  data: Pick<TicketModel, 'userId' | 'eventId' | 'price'>
) => {
  return mapper.put(merge(data))
}
