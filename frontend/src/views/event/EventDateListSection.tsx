import ErrorMessage from 'components/messages/ErrorMessage'
import { GetEventAndTicketsQuery } from 'graphql/generated/events'
import React, { FC } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography
} from '@material-ui/core'
import { getDate } from 'helpers/date'
import { getYear } from 'date-fns'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'

interface Props {
  event: NonNullable<GetEventAndTicketsQuery['getEvent']>['event']
}

const EventDateListSection: FC<Props> = props => {
  const { event } = props
  if (!event) return <ErrorMessage text="No Data Found" />
  const { dates } = event
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h4">available dates</Typography>
      </Grid>
      <Grid item>
        <List>
          {dates.map((d, i) => {
            return (
              <ListItem key={i}>
                <ListItemText>
                  <Link to={pathNames.tickets(event.id, d.date)}>
                    <Typography color="primary">
                      {`${getDate(d.date)} - ${getYear(d.date)}`}
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
