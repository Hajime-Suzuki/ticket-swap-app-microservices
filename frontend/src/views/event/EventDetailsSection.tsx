import ErrorMessage from 'components/messages/ErrorMessage'
import { GetEventAndTicketsQuery } from 'graphql/generated/events'
import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import { extractStartDateAndEndDate } from 'helpers/date'

type Event = NonNullable<GetEventAndTicketsQuery['getEvent']>['event']
interface Props {
  event: Event
}

const EventDetailsSection: FC<Props> = props => {
  const { event } = props
  if (!event) return <ErrorMessage text="No Data Found" />
  const { location } = event
  return (
    <>
      <Date event={event} />
      <div>
        {location.name}, {location.address}, {location.city}
      </div>
    </>
  )
}

const Date: FC<{ event: NonNullable<Event> }> = ({ event }) => {
  const { startDate, endDate } = extractStartDateAndEndDate(event, {
    format: 'MMM DD'
  })
  return (
    <Typography>
      {startDate} - {endDate}
    </Typography>
  )
}

export default EventDetailsSection
