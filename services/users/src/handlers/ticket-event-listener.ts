import { SQSHandler } from 'aws-lambda'
import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { ICreateTicketInput } from '@ticket-swap-app/gql/src/generated/graphql'
import { ticketRepository } from '../repositories/tickets-repository'

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
  return ticketRepository.save(data)
}
