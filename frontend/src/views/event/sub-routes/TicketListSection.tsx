import { List } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetTicketsQuery } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import { SingleEventTicketSectionRouteProps } from 'routes/types'
import useRouter from 'use-react-router'
import TicketListItem from '../components/TicketListItem'
import { pathNames } from 'routes/paths'
import { Link } from 'react-router-dom'

const TicketListSection: FC = () => {
  const {
    match: { params }
  } = useRouter<SingleEventTicketSectionRouteProps>()

  const { data, loading, error } = useGetTicketsQuery({
    variables: {
      keys: { eventId: params.eventId },
      filter: { date: params.date }
    }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />

  const tickets = data && data.getTickets.tickets

  if (!tickets || !tickets.length)
    return <ErrorMessage text="No ticket available" />

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h4">Available Tickets</Typography>
      </Grid>
      <List style={{ width: '100%' }}>
        {tickets.map(ticket => (
          <Link
            key={ticket.id}
            to={pathNames.singleTicket(params.eventId, params.date, ticket.id)}
          >
            <TicketListItem ticket={ticket}></TicketListItem>
          </Link>
        ))}
      </List>
    </Grid>
  )
}

export default TicketListSection
