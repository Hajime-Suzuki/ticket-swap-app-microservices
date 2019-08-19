import Typography from '@material-ui/core/Typography'
import TicketForm, { TicketFormProps } from 'components/forms/TicketForm'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { useGetEventQuery } from 'graphql/generated/events'
import {
  GetTicketsDocument,
  useCreateTicketMutation
} from 'graphql/generated/tickets'
import { createTicketSchema } from 'helpers/validations/schema'
import React, { FC, useMemo } from 'react'
import { pathNames } from 'routes/paths'
import { PrivateRouteProps, SellTicketRouteProps } from 'routes/types'
import { Formik, Form } from 'formik'
import { Button } from '@material-ui/core'

export const createTicketInitialValues: TicketFormProps = {
  date: '',
  price: '',
  description: ''
}

const SellTicketPage: FC<PrivateRouteProps<SellTicketRouteProps>> = props => {
  const {
    history,
    match: { params }
  } = props
  const { data, error: getEventError } = useGetEventQuery({
    variables: { id: params.eventId }
  })
  const [
    createTicket,
    { error: mutationError, loading: mutationLoading }
  ] = useCreateTicketMutation()

  const eventDates = data && data.getEvent && data.getEvent.event.dates

  const dateMenuItem = useMemo(() => {
    return eventDates
      ? eventDates.map(date => ({
          name: date.date,
          value: date.date
        }))
      : []
  }, [eventDates])

  if (!eventDates) return null

  if (!eventDates) return <LoadingIcon />
  if (getEventError) {
    return <ErrorMessage text={getEventError.message} />
  }
  if (!eventDates.length) {
    return <ErrorMessage text="this event does not have a date" />
  }

  const submit = async (values: TicketFormProps) => {
    console.log(values)
    await createTicket({
      variables: { data: { ...values, eventId: params.eventId } },
      refetchQueries: [
        {
          query: GetTicketsDocument,
          variables: {
            keys: { eventId: params.eventId },
            filter: { date: values.date }
          }
        }
      ]
    })
    history.push(pathNames.singleEvent(params.eventId))
  }

  return (
    <ContentWrapper>
      <Typography variant="h5">Sell Ticket</Typography>
      <Formik
        initialValues={createTicketInitialValues}
        onSubmit={submit}
        validationSchema={createTicketSchema}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {() => (
          <Form>
            <TicketForm dates={dateMenuItem} />
            <div style={{ textAlign: 'center' }}>
              <Typography
                color="error"
                align="center"
                style={{ marginTop: '1em' }}
              >
                {mutationError && mutationError.message}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={mutationLoading}
                style={{ margin: '1em 0em' }}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ContentWrapper>
  )
}

export default SellTicketPage
