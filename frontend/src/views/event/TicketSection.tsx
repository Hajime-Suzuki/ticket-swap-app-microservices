import React, { FC } from 'react'
import { GetEventAndTicketsQuery } from 'graphql/generated/events'

interface Props {
  tickets: GetEventAndTicketsQuery['getTickets']['tickets']
}
const TicketSection: FC<Props> = props => {
  const { tickets } = props
  return (
    <>
      {tickets.map(ticket => {
        return <div key={ticket.id}>{ticket.price}</div>
      })}
    </>
  )
}

export default TicketSection
