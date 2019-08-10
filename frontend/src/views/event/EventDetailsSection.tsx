import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Typography } from '@material-ui/core'
import { GrayText } from 'components/UI/Typography'
import { extractStartDateAndEndDate } from 'helpers/date'
import React, { FC } from 'react'
import styled from 'styled-components'
import { EventFromQueryRes } from './types'
import useRouter from 'use-react-router'
import { SingleEventRouteProps } from 'routes/types'
import { useGetEventQuery } from 'graphql/generated/events'
import LoadingIcon from 'components/UI/LoadingIcon'
import ErrorMessage from 'components/messages/ErrorMessage'

const EventDetailsSection: FC = props => {
  const {
    match: { params }
  } = useRouter<SingleEventRouteProps>()

  const { data, loading, error } = useGetEventQuery({
    variables: { id: params.eventId }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!data) return <ErrorMessage text="No Data Found" />
  const event = data.getEvent.event

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

interface ChildProps {
  event: EventFromQueryRes
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
  return (
    <Typography variant="body1" align="justify">
      {description}
    </Typography>
  )
}

export default EventDetailsSection
