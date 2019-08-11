import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'
import { getYear } from 'date-fns'
import { useGetEventQuery } from 'graphql/generated/events'
import { getDate } from 'helpers/date'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'
import { SingleEventRouteProps } from 'routes/types'
import useRouter from 'use-react-router'

const EventDateListSection: FC = () => {
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

  const { dates } = event
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h4">Available Dates</Typography>
      </Grid>
      <Grid item>
        <List>
          {dates.map((d, i) => {
            return (
              <ListItem key={i}>
                <ListItemText>
                  <Link to={pathNames.tickets(event.id, d.date)}>
                    <Typography color="primary">
                      {`${getDate(d.date)} - ${getYear(new Date(d.date))}`}
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            )
          })}
        </List>
      </Grid>
    </Grid>
  )
}

export default EventDateListSection
