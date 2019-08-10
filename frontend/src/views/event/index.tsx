import Grid from '@material-ui/core/Grid'
import ContentWrapper from 'components/space/ContentWrapper'
import React, { FC } from 'react'
import { EventPageSubRoutes } from 'routes'
import EventDetailsSection from './EventDetailsSection'

const EventPage: FC = () => {
  return (
    <ContentWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <EventDetailsSection />
        </Grid>
        <Grid item xs={12} md={6}>
          {EventPageSubRoutes()}
        </Grid>
      </Grid>
    </ContentWrapper>
  )
}

export default EventPage
