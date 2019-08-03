import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetEventQuery } from 'graphql/generated/events'
import React from 'react'
import { SingleEventRouteProps } from 'routes/types'

const EventPage: React.FC<SingleEventRouteProps> = props => {
  const {
    match: { params }
  } = props
  const { data, loading, error } = useGetEventQuery({
    variables: { id: params.eventId }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!data || !data.getEvent || !data.getEvent.event)
    return <div>No Event Found</div>

  const event = data!.getEvent!.event!

  return <div>{event.name}</div>
}

export default EventPage
