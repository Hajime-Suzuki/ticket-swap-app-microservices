import { Grid } from '@material-ui/core'
import { useGetEventsQuery } from 'graphql/generated/events'
import React from 'react'
import { Link } from 'react-router-dom'
import EventCard from './components/EventCard'

const Events: React.FC = () => {
  const { data, error, loading } = useGetEventsQuery()
  if (loading) return <div>loading...</div>
  if (error) return <div>{error.message}</div>
  if (!data || !data.getEvents) return null

  return (
    <Grid container spacing={2} justify="center">
      {data.getEvents.events.map(event => {
        return (
          <Grid item xs={12} md={4} key={event.id}>
            <Link to="/">
              <EventCard event={event}></EventCard>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Events
