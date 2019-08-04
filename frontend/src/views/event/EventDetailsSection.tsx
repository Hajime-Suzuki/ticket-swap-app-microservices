import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Typography } from '@material-ui/core'
import ErrorMessage from 'components/messages/ErrorMessage'
import { GrayText } from 'components/UI/Typography'
import { GetEventAndTicketsQuery } from 'graphql/generated/events'
import { extractStartDateAndEndDate } from 'helpers/date'
import React, { FC } from 'react'
import styled from 'styled-components'

type EventQueryResult = NonNullable<
  GetEventAndTicketsQuery['getEvent']
>['event']
interface Props {
  event: EventQueryResult
}

const EventDetailsSection: FC<Props> = props => {
  const { event } = props
  if (!event) return <ErrorMessage text="No Data Found" />
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          {event.name}
        </Typography>
      </Grid>
      <Grid item>
        <Image />
      </Grid>
      <Grid item>
        <Date event={event} />
        <Location event={event}></Location>
      </Grid>
      <Grid item>
        <Description event={event}></Description>
      </Grid>
    </Grid>
  )
}

const Image = styled.div`
  width: 100%;
  height: 25vh;
  background-image: url('https://source.unsplash.com/random/400x300');
  background-size: cover;
`

type Event = NonNullable<EventQueryResult>
interface ChildProps {
  event: Event
}
const Date: FC<ChildProps> = ({ event }) => {
  const { startDate, endDate } = extractStartDateAndEndDate(event, {
    format: 'MMM DD'
  })
  return (
    <GrayText variant="body2">
      <FontAwesomeIcon icon={faClock} />
      {startDate} - {endDate}
    </GrayText>
  )
}

const Location: FC<ChildProps> = ({ event: { location } }) => {
  return (
    <GrayText variant="body2">
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      {location.name}, {location.address}
    </GrayText>
  )
}

const Description: FC<ChildProps> = ({ event: { description } }) => {
  return <Typography variant="body1">{description}</Typography>
}

export default EventDetailsSection
