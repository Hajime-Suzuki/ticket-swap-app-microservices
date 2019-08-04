import { List, ListItem, ListItemText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetTicketsQuery } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { SingleEventTicketSectionRouteProps } from 'routes/types'
import useRouter from 'use-react-router'

const TicketSection: FC = () => {
  const {
    match: { params }
  } = useRouter<SingleEventTicketSectionRouteProps>()

  const { data, loading, error } = useGetTicketsQuery({
    variables: {
      args: { keys: { eventId: params.eventId }, filter: { date: params.date } }
    }
  })

  const tickets = data && data.getTickets.tickets

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />
  if (!tickets || !tickets.length)
    return <ErrorMessage text="No ticket available" />

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h4">Available Tickets</Typography>
      </Grid>
      <List>
        {tickets.map(ticket => (
          <ListItem key={ticket.id}>
            <ListItemText>
              <Link to="/">test</Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Grid>
  )
}

export default TicketSection
