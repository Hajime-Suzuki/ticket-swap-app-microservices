import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TicketForm, { TicketFormProps } from 'components/forms/TicketForm'
import ErrorMessage from 'components/messages/ErrorMessage'
import ContentWrapper from 'components/space/ContentWrapper'
import LoadingIcon from 'components/UI/LoadingIcon'
import { Form, Formik } from 'formik'
import { useGetEventQuery } from 'graphql/generated/events'
import { createTicketSchema } from 'helpers/validations/schema'
import React, { FC } from 'react'
import { SellTicketRouteProps } from 'routes/types'
import useRouter from 'use-react-router'

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

  const eventDates = data && data.getEvent && data.getEvent.event.dates
  if (!eventDates) return null
  // const [createEvent, { error, loading }] = useCreateTicket({
  //   refetchQueries: [{ query: GetEventsDocument }]
  // })

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

  const error = { message: null }
  const loading = false

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
