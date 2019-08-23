import {
  DataMapper,
  QueryOptions,
  StringToAnyObjectMap,
  GetOptions
} from '@aws/dynamodb-data-mapper'
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller'
import { DynamoDB } from 'aws-sdk'

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

export interface MapperConstructorArgs<T> {
  region: string
  endpoint: string | undefined
  model: T
}

export class Mapper<
  T,
  TModel extends ZeroArgumentsConstructor<StringToAnyObjectMap>
> {
  private mapper: DataMapper
  private model: TModel

  constructor({ region, endpoint, model }: MapperConstructorArgs<TModel>) {
    this.model = model
    this.mapper = newMapper({ region, endpoint })
  }

  async find<TReturn = Partial<T>>(
    args: Partial<T>,
    options?: GetOptions
  ): Promise<TReturn | null> {
    try {
      const res = await this.mapper.get(this.merge(args), options)
      return res as TReturn
    } catch (e) {
      if (e.name === 'ItemNotFoundException') {
        return null
      }
      throw e
    }
  }

  findManyMapByHashKey<THashKey extends keyof T>(
    keyName: THashKey,
    keys: T[THashKey][]
  ) {
    // TODO: fetch again if length > 100
    const params = keys.map(key => this.merge({ [keyName]: key } as any))
    return this.getMapFromIterable(keyName, this.mapper.batchGet(params))
  }

  query(args: Partial<T>, options?: QueryOptions) {
    return this.getArrayFromIterable(
      this.mapper.query(this.model, args, options)
    )
  }

  scan() {
    return this.getArrayFromIterable(this.mapper.scan(this.model))
  }

  async findAndUpdate(identifier: Partial<T>, args: Partial<T>) {
    const data = await this.find(identifier)
    const updated = Object.assign(data, args)
    return this.mapper.update(updated)
  }

  async save(data: Partial<T>) {
    const params = this.merge({ ...data, createdAt: Date.now().toString() })
    console.log('Mapper: will save data:', params)
    const newItem = await this.mapper.put(params)
    return newItem
  }

  private merge(data: Partial<T>) {
    return Object.assign(new this.model(), data)
  }

  private async getArrayFromIterable(iterator: any) {
    const res: T[] = []
    for await (const data of iterator) {
      res.push(data)
    }
    return res
  }

  private async getMapFromIterable(keyName: keyof T, iterator: any) {
    const map = {} as Record<keyof T, T>
    for await (const data of iterator) {
      const key = data[keyName]
      map[key] = data
    }

    return map
  }
}
