import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetEventAndTicketsQuery } from 'graphql/generated/events'
import React, { FC } from 'react'
import { SingleEventRouteProps } from 'routes/types'
import useRouter from 'use-react-router'
import EventSection from './EventSection'
import TicketSection from './TicketSection'

const EventPage: FC = () => {
  const {
    match: { params }
  } = useRouter<SingleEventRouteProps>()

  const { data, loading, error } = useGetEventAndTicketsQuery({
    variables: { id: params.eventId }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!data || !data.getEvent) return <ErrorMessage text="No Data Found" />

  return (
    <>
      <EventSection data={data.getEvent} />
      <TicketSection tickets={data.getTickets.tickets} />
    </>
  )
}

export default EventPage
