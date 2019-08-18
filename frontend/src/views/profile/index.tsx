import { Grid } from '@material-ui/core'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetTicketsByUserQuery } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import { PrivateRouteProps, UserProfileProps } from 'routes/types'
import TicketsList from './components/TicketLists'

const UserProfilePage: FC<PrivateRouteProps<UserProfileProps>> = props => {
  const user = props.user

  const { data, error, loading } = useGetTicketsByUserQuery({
    variables: { userId: (user && user.id) || '' }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message}></ErrorMessage>
  if (!data) return null

  const tickets = data.getTickets.tickets

  return (
    <ContentWrapper>
      <Grid container direction="column" justify="center" alignItems="center">
        <TicketsList tickets={tickets}></TicketsList>
      </Grid>
    </ContentWrapper>
  )
}

export default UserProfilePage
