import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import ErrorMessage from 'components/messages/ErrorMessage'
import { getYear } from 'date-fns'
import { getDate } from 'helpers/date'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'
import { EventFromQueryRes } from './types'

interface Props {
  event: EventFromQueryRes
}

const EventDateListSection: FC<Props> = props => {
  const { event } = props
  if (!event) return <ErrorMessage text="No Data Found" />
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
