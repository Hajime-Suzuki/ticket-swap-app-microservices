import Card from '@material-ui/core/Card'
import ErrorMessage from 'components/messages/ErrorMessage'
import LoadingIcon from 'components/UI/LoadingIcon'
import { GetTicketQuery, useGetTicketQuery } from 'graphql/generated/tickets'
import { extractDate } from 'helpers/date'
import React, { FC } from 'react'
import { SingleEventSingleTicketSectionRouteProps } from 'routes/types'
import styled from 'styled-components'
import { theme } from 'theme'
import useRouter from 'use-react-router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const SingleTicketSection: FC = () => {
  const {
    match: { params },
  } = useRouter<SingleEventSingleTicketSectionRouteProps>()

  const { data, loading, error } = useGetTicketQuery({
    variables: { eventId: params.eventId, ticketId: params.ticketId },
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message} />

  const ticket = data && data.getTicket.ticket
  if (!ticket) return <ErrorMessage text="Ticket not found" />

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="stretch" spacing={3}>
        <Grid item>
          <Typography variant="h4" align="center">
            Ticket Detail
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify">{ticket.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Ticket ticket={ticket} />
        </Grid>
        <OrderButtonGrid item>
          <Button variant="outlined" color="primary">
            Order
          </Button>
        </OrderButtonGrid>
      </Grid>
    </>
  )
}

const OrderButtonGrid = styled(Grid)`
  && {
    text-align: center;
    margin-top: 2em;
  }
`

type Ticket = NonNullable<GetTicketQuery['getTicket']['ticket']>
interface TicketProps {
  ticket: Ticket
}
const Ticket: FC<TicketProps> = ({ ticket }) => {
  const { month, date } = extractDate(ticket.date)
  return (
    <DateBlock>
      <Grid container alignItems="center">
        <Grid item xs={3} className="date-section">
          <div className="month">{month}</div>
          <div className="date">{date}</div>
        </Grid>
        <Grid item xs={9}>
          €{ticket.price}
        </Grid>
      </Grid>
    </DateBlock>
  )
}
const DateBlock = styled(Card)`
  max-width: 400px;
  font-size: 1.3em;
  margin: auto;
  text-align: center;
  letter-spacing: 5px;
  .date-section {
    color: ${theme.palette.text.secondary};
    padding: 0.5em;
    background-color: ${theme.palette.secondary.light};
    color: ${theme.palette.text.secondary};
  }
  .date {
    font-weight: bold;
  }
`
export default SingleTicketSection
