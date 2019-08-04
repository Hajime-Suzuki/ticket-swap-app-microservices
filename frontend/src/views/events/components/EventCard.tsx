import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { GetEventsQuery } from 'graphql/generated/events'
import React from 'react'
import styled from 'styled-components'
import { extractStartDateAndEndDate } from 'helpers/date'

interface EventCardProps {
  event: NonNullable<GetEventsQuery['getEvents']>['events'][number]
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { startDate, endDate } = extractStartDateAndEndDate(event)
  return (
    <Card>
      <CardMedia
        style={{ width: '100%', height: '20vh' }}
        image="https://source.unsplash.com/random/400x300"
      >
        <OverlayGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <OverlayGridItem text={event.name} variant="h5" />
          <OverlayGridItem text={event.location && event.location.city} />
          <OverlayGridItem text={`${startDate} - ${endDate}`} />
        </OverlayGrid>
      </CardMedia>
      <CardContent>{event.description}</CardContent>
    </Card>
  )
}

const OverlayGridItem = ({
  text,
  variant
}: {
  text?: string
  variant?: TypographyProps['variant']
}) => (
  <Grid item>
    <Typography variant={variant || 'body1'}>{text}</Typography>
  </Grid>
)

const OverlayGrid = styled(Grid)`
  width: 100%;
  height: 20vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
`

export default EventCard
