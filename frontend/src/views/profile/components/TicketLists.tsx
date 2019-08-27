import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { TicketByUser } from 'graphql/types'
import { formatCurrency } from 'helpers/number'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'

interface Props {
  openModal: (ticket: TicketByUser) => () => void
  tickets: TicketByUser[]
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
                  <Typography color="primary">{ticket.eventName}</Typography>
                </Link>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography>{`${ticket.date}`}</Typography>
              </Grid>
              <Grid item xs={5} sm={3}>
                <Typography color="primary">
                  {formatCurrency(ticket.price)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={openModal(ticket)}>
                  <FontAwesomeIcon
                    icon={faPen}
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
