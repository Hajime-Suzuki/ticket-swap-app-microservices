import Typography from '@material-ui/core/Typography'
import EventForm, { EventFormFields } from 'components/forms/EventForm'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import React, { FC } from 'react'
import { useCreateEventMutation } from 'graphql/generated/events'

export const createEventInitialValues: EventFormFields = {
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
  const [createEvent, result] = useCreateEventMutation()

  const submit = async (values: any) => {
    console.log(JSON.stringify(values, null, 2))
    // const res = await createEvent({ variables: values })
    // console.log({ res, result })
  }
  return (
    <ContentWrapper>
      <Typography variant="h5">Create Event</Typography>
      <Formik initialValues={createEventInitialValues} onSubmit={submit}>
        {formikProps => {
          return (
            <Form>
              <EventForm {...formikProps}></EventForm>
            </Form>
          )
        }}
      </Formik>
    </ContentWrapper>
  )
}

export default CreateEventPage
