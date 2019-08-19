import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { GetTicketsByUserQuery } from 'graphql/generated/tickets'
import { formatCurrency } from 'helpers/number'
import React, { FC, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'

interface Props {
  openModal: (id: string) => (e: SyntheticEvent<any, any>) => void
  tickets: GetTicketsByUserQuery['getTickets']['tickets']
}

const TicketsList: FC<Props> = ({ tickets, openModal }) => {
  return (
    <List style={{ width: '100%' }}>
      {tickets.map(ticket => (
        <ListItem divider key={ticket.id}>
          <ListItemText>
            <Grid container justify="space-evenly" alignItems="center">
              <Grid item xs={12} sm={4}>
                <Link to={pathNames.singleEvent(ticket.eventId)}>
                  <Typography color="primary">{`${ticket.event &&
                    ticket.event.name}`}</Typography>
                </Link>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography>{`${ticket.date}`}</Typography>
              </Grid>
              <Grid item xs={5} sm={3}>
                <Typography color="primary">{`€ ${formatCurrency(
                  ticket.price
                )}`}</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={openModal(ticket.id)}>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    style={{ fontSize: 20, verticalAlign: 'middle' }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default TicketsList
