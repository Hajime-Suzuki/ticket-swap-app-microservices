import { Grid } from '@material-ui/core'
import { useGetEventsQuery } from 'graphql/generated/events'
import React from 'react'
import { Link } from 'react-router-dom'
import EventCard from './components/EventCard'
import { pathNames } from 'routes/paths'
import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'

const EventsPage: React.FC = () => {
  const { data, error, loading } = useGetEventsQuery()
  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!data || !data.getEvents) return null

  return (
    <Grid container spacing={2} justify="center">
      {data.getEvents.events.map(event => {
        return (
          <Grid item xs={12} md={4} key={event.id}>
            <Link to={`${pathNames.singleEvent(event.id)}`}>
              <EventCard event={event}></EventCard>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default EventsPage
