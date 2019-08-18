import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { GetTicketsByUserQuery } from 'graphql/generated/tickets'
import { formatCurrency } from 'helpers/number'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'

interface Props {
  tickets: GetTicketsByUserQuery['getTickets']['tickets']
}

const TicketsList: FC<Props> = ({ tickets }) => {
  return (
    <List style={{ width: '100%' }}>
      {tickets.map(ticket => (
        <Link key={ticket.id} to={pathNames.singleEvent(ticket.eventId)}>
          <ListItem divider button>
            <ListItemText>
              <Grid container justify="space-evenly">
                <Grid item xs={12} sm={4}>
                  <Typography>{`${ticket.event &&
                    ticket.event.name}`}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography>{`${ticket.date}`}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography color="primary">{`€ ${formatCurrency(
                    ticket.price
                  )}`}</Typography>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

export default TicketsList
