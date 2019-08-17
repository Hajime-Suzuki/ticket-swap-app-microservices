import React, { FC } from 'react'
import ContentWrapper from 'components/space/ContentWrapper'
import { useGetTicketsQuery } from 'graphql/generated/tickets'
import { useUser } from 'hooks/useUser'
import LoadingIcon from 'components/UI/LoadingIcon'
import ErrorMessage from 'components/messages/ErrorMessage'

const UserProfilePage: FC = () => {
  const { user } = useUser()
  console.log({ user })
  const { data, error, loading } = useGetTicketsQuery({
    variables: {
      keys: { userId: (user && user.id) || '' }
    }
  })

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message}></ErrorMessage>
  if (!data) return null

  console.log(data.getTickets.tickets)

  return (
    <ContentWrapper>
      <div>test</div>
    </ContentWrapper>
  )
}

export default UserProfilePage
