import Grid from '@material-ui/core/Grid'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetEventQuery } from 'graphql/generated/events'
import React, { FC } from 'react'
import { SingleEventRouteProps } from 'routes/types'
import useRouter from 'use-react-router'
import EventDateListSection from './EventDateListSection'
import EventDetailsSection from './EventDetailsSection'
import TicketSection from './TicketSection'

const EventPage: FC = () => {
  const {
    match: { params }
  } = useRouter<SingleEventRouteProps>()

  const isTicketsSection = !!params.date

  const { data, loading, error } = useGetEventQuery({
    variables: { id: params.eventId }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!data) return <ErrorMessage text="No Data Found" />
  const event = data.getEvent.event
  return (
    <>
      <ContentWrapper>
        <Grid container>
          <Grid item xs={12} md={6}>
            <EventDetailsSection event={event} />
          </Grid>
          <Grid item xs={12} md={6}>
            {!isTicketsSection && <EventDateListSection event={event} />}
            {isTicketsSection && <TicketSection />}
          </Grid>
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default EventPage
