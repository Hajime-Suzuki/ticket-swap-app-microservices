import ListItem from '@material-ui/core/ListItem'
import React, { FC } from 'react'
import { TicketFromQueryRes } from '../types'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemAvatar, Avatar, Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { formatCurrency } from 'helpers/number'

interface Props {
  ticket: TicketFromQueryRes[number]
}

const TicketListItem: FC<Props> = ({ ticket }) => {
  return (
    <ListItem divider button>
      <ListItemAvatar>
        <Avatar>{ticket.userId}</Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Grid container justify="space-evenly">
          <StyledGrid item xs={12} md={3}>
            <Typography>{`${ticket.date}`}</Typography>
          </StyledGrid>
          <StyledGrid item container xs={12} md={6} justify="space-evenly">
            <Grid item xs={6}>
              <Typography color="primary">{`€ ${formatCurrency(
                ticket.price
              )}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{ticket.username}</Typography>
            </Grid>
          </StyledGrid>
        </Grid>
      </ListItemText>
    </ListItem>
  )
}

const StyledGrid = styled(Grid)`
  text-align: center;
`

export default TicketListItem
