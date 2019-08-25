import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core'
import TicketForm, { TicketFormProps } from 'components/forms/TicketForm'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { Form, Formik } from 'formik'
import { useGetTicketsByUserQuery } from 'graphql/generated/tickets'
import React, { FC, useState } from 'react'
import { PrivateRouteProps, UserProfileProps } from 'routes/types'
import TicketsList from './components/TicketLists'

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
  const saveTicket = (values: TicketFormProps) => {
    // TODO: add mutation
    console.log({ values })
  }

  const [selectedTicketId, setTicketId] = useState('')

  const openEditModal = (id: string) => (e: any) => {
    e.stopPropagation()
    openModal()
    setTicketId(id)
  }

  if (loading) return <LoadingIcon />
  if (error) return <ErrorMessage text={error.message}></ErrorMessage>
  if (!data) return null

  const tickets = data.getTickets.tickets

  const selectedTicket = tickets.find(t => t.id === selectedTicketId)
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
      />
    </ContentWrapper>
  )
}

interface Props {
  ticket: TicketFormProps | undefined
  isOpen: boolean
  closeModal: () => void
  onSave: (values: TicketFormProps) => void
}

const EditTicketModal: FC<Props> = props => {
  const { isOpen, closeModal, onSave, ticket } = props
  if (!ticket) return null
  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs">
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={ticket}
          onSubmit={onSave}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {() => (
            <Form>
              <TicketForm
                dates={[{ name: ticket.date, value: ticket.date }]}
                disableDate
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>cancel</Button>
        <Button type="submit">save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserProfilePage
