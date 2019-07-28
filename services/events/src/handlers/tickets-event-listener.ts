import { TicketCreatedEventBody } from '@ticket-swap-app/shared/src/types/events'
import { SNSMessage, SQSHandler } from 'aws-lambda'
import { logger } from '../utils'
import { ticketRepository } from '../repository/ticket-repository'

export const handler: SQSHandler = async event => {
  const { Message }: SNSMessage = JSON.parse(event.Records[0].body)
  const { type, payload }: TicketCreatedEventBody = JSON.parse(Message)
  logger.log('received data', { type, payload })

  switch (type) {
    case 'ticketCreated': {
      await ticketRepository.save(payload)
    }
  }
}
