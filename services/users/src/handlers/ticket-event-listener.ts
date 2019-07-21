import { SQSHandler } from 'aws-lambda'
import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'

export const handler: SQSHandler = async event => {
  const { type, payload }: TicketCreatedEventBody = JSON.parse(
    event.Records[0].body
  )
  console.log('received data: ', { type, payload })

  switch (type) {
    case 'ticketCreated': {
      console.log('ticketCreated')
      break
    }
    default: {
      console.log('unsupported')
      break
    }
  }

  // SAVE TO DB
}
