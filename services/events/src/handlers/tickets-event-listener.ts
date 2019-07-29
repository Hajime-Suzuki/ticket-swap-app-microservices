import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { SNSHandler } from 'aws-lambda'
import { ticketRepository } from '../repository/ticket-repository'
import { logger } from '../utils'

export const handler: SNSHandler = async event => {
  // TODO: make body handler that returns type and payload
  const { Message } = event.Records[0].Sns
  const { type, payload }: TicketCreatedEventBody = JSON.parse(Message)
  logger.log('received data', { type, payload })

  switch (type) {
    case 'ticketCreated': {
      await ticketRepository.save(payload)
    }
  }
}
