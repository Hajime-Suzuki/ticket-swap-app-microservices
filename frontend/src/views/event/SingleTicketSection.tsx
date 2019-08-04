import React, { FC } from 'react'
import { SingleEventSingleTicketSectionRouteProps } from 'routes/types'
import useRouter from 'use-react-router'
import { useGetTicketQuery } from 'graphql/generated/tickets'
import LoadingIcon from 'components/UI/LoadingIcon'
import ErrorMessage from 'components/messages/ErrorMessage'

const SingleTicketSection: FC = () => {
  const {
    match: { params }
  } = useRouter<SingleEventSingleTicketSectionRouteProps>()

  const { data, loading, error } = useGetTicketQuery({
    variables: { eventId: params.eventId, ticketId: params.ticketId }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />

  const ticket = data && data.getTicket.ticket
  if (!ticket) return <ErrorMessage text="Ticket not found" />

  return <div>{ticket.price}</div>
}

export default SingleTicketSection
