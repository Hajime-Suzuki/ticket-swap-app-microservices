import { SQSHandler } from 'aws-lambda'
import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { TicketRepository } from '../repositories/tickets-repository'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'

export const handler: SQSHandler = async event => {
  const body: TicketCreatedEventBody = JSON.parse(event.Records[0].body)
  console.log('received data: ', { type: body.type, payload: body.payload })

  switch (body.type) {
    case 'ticketCreated': {
      const payload = body.payload as TicketCreatedEventBody['payload']
      await saveTicket(payload)
      break
    }
    default: {
      console.log('unsupported')
      break
    }
  }
}

const saveTicket = (data: ICreateTicketInput) => {
  return TicketRepository.save(data)
}
