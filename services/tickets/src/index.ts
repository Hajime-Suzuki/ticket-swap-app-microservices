import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import {
  attribute,
  hashKey,
  rangeKey,
  table
} from '@aws/dynamodb-data-mapper-annotations'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'
import { newRepository } from '@ticket-swap-app/shared/src/repository'

const db = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  convertEmptyValues: true
})

@table(process.env.tickets_tickets_table)
class MyDomainObject {
  @hashKey()
  id: string

  @attribute()
  name: string
}

const mapper = new DataMapper({
  client: new DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
})

export const handler: APIGatewayProxyHandler = async event => {
  // const res = await db
  //   .put({
  //     TableName: process.env.tickets_tickets_table,
  //     Item: {
  //       id: 'super complex id'
  //     }
  //   })
  //   .promise()
  // console.log(res)

  // const { Items: tickets } = await db
  //   .scan({
  //     TableName: process.env.tickets_tickets_table
  //   })
  //   .promise()

  // const res = await mapper.scan(MyDomainObject)
  // const res = []
  // for await (const item of mapper.scan(MyDomainObject)) {
  //   res.push(item)
  //   // individual items will be yielded as the scan is performed
  // }

  newRepository(db)

  const toSave = Object.assign(new MyDomainObject(), { id: 'foo' })
  const res = await mapper.put(toSave)
  return {
    statusCode: 200,
    body: JSON.stringify({ tickets: res })
  }
}
