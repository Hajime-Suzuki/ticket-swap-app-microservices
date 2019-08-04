import Grid from '@material-ui/core/Grid'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetEventAndTicketsQuery } from 'graphql/generated/events'
import React, { FC } from 'react'
import { SingleEventRouteProps } from 'routes/types'
import useRouter from 'use-react-router'
import EventDateListSection from './EventDateListSection'
import EventDetailsSection from './EventDetailsSection'

const EventPage: FC = () => {
  const {
    match: { params }
  } = useRouter<SingleEventRouteProps>()

  const { data, loading, error } = useGetEventAndTicketsQuery({
    variables: { id: params.eventId }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!data || !data.getEvent) return <ErrorMessage text="No Data Found" />
  const event = data.getEvent.event
  return (
    <>
      <ContentWrapper>
        <Grid container>
          <Grid item xs={12} md={6}>
            <EventDetailsSection event={event} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EventDateListSection event={event} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default EventPage
