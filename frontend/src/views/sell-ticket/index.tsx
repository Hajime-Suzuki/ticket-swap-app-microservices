import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TicketForm, { TicketFormProps } from 'components/forms/TicketForm'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import { createTicketSchema } from 'helpers/validations/schema'
import React, { FC } from 'react'
import useRouter from 'use-react-router'
import {
  useGetEventQuery,
  useCreateEventMutation,
  GetEventsDocument
} from 'graphql/generated/events'
import { SellTicketRouteProps } from 'routes/types'
import LoadingIcon from 'components/UI/LoadingIcon'
import ErrorMessage from 'components/messages/ErrorMessage'

export const createTicketInitialValues: TicketFormProps = {
  date: '',
  price: '',
  description: ''
}

const SellTicketPage: FC = () => {
  const {
    history,
    match: { params }
  } = useRouter<SellTicketRouteProps>()
  const { data, error: getEventError } = useGetEventQuery({
    variables: { id: params.eventId }
  })

  const eventDates = data && data.getEvent.event.dates

  // const [createEvent, { error, loading }] = useCreateTicket({
  //   refetchQueries: [{ query: GetEventsDocument }]
  // })

  // const error = { message: null }
  // const loading = false

  if (!eventDates) return <LoadingIcon />
  if (getEventError) {
    return <ErrorMessage text={getEventError.message} />
  }
  if (!eventDates.length) {
    return <ErrorMessage text="this event does not have a date" />
  }

  const submit = async (values: TicketFormProps) => {
    console.log(values)
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
        {formikProps => (
          <Form>
            <TicketForm {...formikProps} dates={eventDates}></TicketForm>
            <div style={{ textAlign: 'center' }}>
              <Typography
                color="error"
                align="center"
                style={{ marginTop: '1em' }}
              >
                {error && error.message}
              </Typography>
              <Button
                onClick={() => formikProps.handleSubmit()}
                variant="contained"
                color="primary"
                disabled={loading}
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
