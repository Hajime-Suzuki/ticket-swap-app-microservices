import { extractSNSMessage } from '@ticket-swap-app/shared/src/events/extract-sns-message'
import {
  TicketEventPayload,
  TicketEventTypes
} from '@ticket-swap-app/shared/src/types/events'
import { SNSHandler } from 'aws-lambda'
import { ticketRepository } from '../repository/ticket-repository'

export const handler: SNSHandler = async event => {
  const { type, payload } = extractSNSMessage<TicketEventTypes>(event)

  switch (type) {
    case 'ticketCreated': {
      await ticketCreatedHandler(payload)
    }
  }
}

const ticketCreatedHandler = async (
  data: TicketEventPayload<'ticketCreated'>
) => {
  await ticketRepository.save(data)
}
