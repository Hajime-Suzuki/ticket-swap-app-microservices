import { DataMapper, StringToAnyObjectMap } from '@aws/dynamodb-data-mapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { ITicket } from '@ticket-swap-app/gql/src/generated/graphql';
import { newMapper } from '@ticket-swap-app/shared/src/database';
import { TicketModel } from './model';
const { IS_OFFLINE, region, ticketDbPort } = process.env

class Mapper<T, TModel extends ZeroArgumentsConstructor<StringToAnyObjectMap>> {
  private mapper: DataMapper
  private model: TModel

  constructor({ region, endpoint, model }: { region: string, endpoint: string, model: TModel }) {
    this.model = model
    this.mapper = newMapper({ region, endpoint })
  }

  query(args: Partial<T>) {
    return this.getArrayFromIterable(this.mapper.query(this.model, args))
  }

  scan() {
    return this.getArrayFromIterable(this.mapper.scan(this.model))
  }
  save(data: Partial<T>) {
    return this.mapper.put(this.merge(data))
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

const mapper = new Mapper<ITicket, typeof TicketModel>({
  region,
  endpoint: IS_OFFLINE ? 'http://localhost:' + ticketDbPort : undefined,
  model: TicketModel
})


const save = (data: Pick<TicketModel, 'userId' | 'eventId' | 'price'>) => {
  return mapper.save(data)
}

interface FindTicketArgs {
  eventId: string
  userId: string
}
const findByKey = async (args: FindTicketArgs) => {
  const res = await mapper.query(args)
  return res[0]
}

const scan = async () => {
  return mapper.scan()
}

export const TicketRepository = {
  save,
  scan,
  findByKey
}
