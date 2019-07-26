import { DynamoDB } from 'aws-sdk'
import { DataMapper, StringToAnyObjectMap } from '@aws/dynamodb-data-mapper'
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller'

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

export class Mapper<
  T,
  TModel extends ZeroArgumentsConstructor<StringToAnyObjectMap>
> {
  private mapper: DataMapper
  private model: TModel

  constructor({
    region,
    endpoint,
    model
  }: {
    region: string
    endpoint: string
    model: TModel
  }) {
    this.model = model
    this.mapper = newMapper({ region, endpoint })
  }

  query(args: Partial<T>) {
    return this.getArrayFromIterable(this.mapper.query(this.model, args))
  }

  scan() {
    return this.getArrayFromIterable(this.mapper.scan(this.model))
  }

  update(target: any, condition: any) {
    console.log(target, condition)
  }

  save(data: Partial<T>) {
    const params = this.merge(data)
    console.log('Mapper: will save data:', params)
    return this.mapper.put(params)
  }

  private merge(data: Partial<T>) {
    return Object.assign(new this.model(), {
      ...data,
      createdAt: Date.now().toString()
    })
  }

  private async getArrayFromIterable(iterator: any) {
    const res: T[] = []
    for await (const data of iterator) {
      res.push(data)
    }
    return res
  }
}
