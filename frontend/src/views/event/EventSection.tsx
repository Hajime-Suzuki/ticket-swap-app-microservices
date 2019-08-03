import ErrorMessage from 'components/messages/ErrorMessage'
import { GetEventAndTicketsQuery } from 'graphql/generated/events'
import React, { FC } from 'react'

interface Props {
  data: GetEventAndTicketsQuery['getEvent']
}

const EventSection: FC<Props> = props => {
  const { data } = props
  if (!data || !data.event) return <ErrorMessage text="No Data Found" />
  const event = data.event
  const { location } = event
  return (
    <>
      <div>{event.name}</div>
      <div>
        {location.name}, {location.address}, {location.city}
      </div>
    </>
  )
}

export default EventSection
