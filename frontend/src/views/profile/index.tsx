import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core'
import TicketForm from 'components/forms/TicketForm'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { Form, Formik } from 'formik'
import {
  GetTicketsByUserDocument,
  useGetTicketsByUserQuery,
  useUpdateTicketMutation
} from 'graphql/generated/tickets'
import { TicketByUser } from 'graphql/types'
import React, { FC, useState } from 'react'
import { PrivateRouteProps, UserProfileProps } from 'routes/types'
import TicketsList from './components/TicketLists'
import { updateTicketSchema } from 'helpers/validations/schema'

const useModal = () => {
  const [isOpen, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return {
    isOpen,
    openModal,
    closeModal
  }
}

const UserProfilePage: FC<PrivateRouteProps<UserProfileProps>> = props => {
  const user = props.user
  const { isOpen, openModal, closeModal } = useModal()
  const { data, error, loading } = useGetTicketsByUserQuery({
    variables: { userId: (user && user.id) || '' }
  })

  const [
    updateTicket,
    { error: updateError, loading: updateLoading }
  ] = useUpdateTicketMutation()

  const saveTicket = async (values: TicketByUser) => {
    const { id, eventId, userId, price, description } = values

    await updateTicket({
      variables: { keys: { id, eventId }, data: { price, description } },
      refetchQueries: [
        { query: GetTicketsByUserDocument, variables: { userId } }
      ]
    })
    closeModal()
  }

  const [selectedTicket, setTicket] = useState<TicketByUser | null>(null)

  const openEditModal = (ticket: TicketByUser) => () => {
    openModal()
    setTicket(ticket)
  }

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message}></ErrorMessage>
  if (!data) return null

  const tickets = data.getTickets.tickets

  return (
    <ContentWrapper>
      <Grid container direction="column" justify="center" alignItems="center">
        <TicketsList tickets={tickets} openModal={openEditModal} />
      </Grid>
      <EditTicketModal
        ticket={selectedTicket}
        isOpen={isOpen}
        closeModal={closeModal}
        onSave={saveTicket}
        loading={updateLoading}
        error={updateError && updateError.message}
      />
    </ContentWrapper>
  )
}

interface Props {
  ticket: TicketByUser | null
  isOpen: boolean
  closeModal: () => void
  onSave: (values: TicketByUser) => void
  loading?: boolean
  error?: string
}

const EditTicketModal: FC<Props> = props => {
  const { isOpen, closeModal, onSave, ticket, loading, error } = props
  if (!ticket) return null
  return (
    <Formik
      initialValues={ticket}
      onSubmit={onSave}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={updateTicketSchema}
    >
      {({ handleSubmit }) => (
        <Form>
          <Dialog open={isOpen} fullWidth maxWidth="xs">
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
              <TicketForm
                dates={[{ name: ticket.date, value: ticket.date }]}
                disableDate
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>cancel</Button>
              <Button onClick={handleSubmit as any} disabled={loading}>
                save
              </Button>
              {error && <ErrorMessage text={error}></ErrorMessage>}
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default UserProfilePage
