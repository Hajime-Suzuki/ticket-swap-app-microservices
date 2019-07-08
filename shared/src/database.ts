import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'

export const newMapper = ({
  endpoint,
  region
}: {
  region: string
  endpoint: string | undefined
}) => {
  return new DataMapper({
    client: new DynamoDB({
      region,
      ...(endpoint && { endpoint })
    })
  })
}
