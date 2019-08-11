import Typography from '@material-ui/core/Typography'
import EventForm from 'components/forms/EventForm'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import {
  CreateEventInput,
  GetEventsDocument,
  useCreateEventMutation
} from 'graphql/generated/events'
import React, { FC } from 'react'
import { pathNames } from 'routes/paths'
import useRouter from 'use-react-router'
import { createEventSchema } from 'helpers/validation'

export const createEventInitialValues: CreateEventInput = {
  name: '',
  description: '',
  dates: [{ date: '', startTime: '', endTime: '' }],
  location: {
    name: '',
    city: '',
    address: ''
  }
}

const CreateEventPage: FC = () => {
  const { history } = useRouter()
  const [createEvent, { error }] = useCreateEventMutation({
    refetchQueries: [{ query: GetEventsDocument }]
  })

  const submit = async (values: CreateEventInput) => {
    await createEvent({ variables: { data: values } })
    history.push(pathNames.events())
  }

  return (
    <ContentWrapper>
      <Typography variant="h5">Create Event</Typography>
      <Formik
        initialValues={createEventInitialValues}
        onSubmit={submit}
        validationSchema={createEventSchema}
      >
        {formikProps => (
          <Form>
            <EventForm {...formikProps}></EventForm>
            <Typography
              color="error"
              align="center"
              style={{ marginTop: '1em' }}
            >
              {error && error.message}
            </Typography>
          </Form>
        )}
      </Formik>
    </ContentWrapper>
  )
}

export default CreateEventPage
