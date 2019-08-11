import Typography from '@material-ui/core/Typography'
import EventForm, { EventFormFields } from 'components/forms/EventForm'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import React, { FC } from 'react'

const initialValues: EventFormFields = {
  name: '',
  description: '',
  dates: [''],
  location: {
    name: '',
    city: '',
    address: ''
  }
}

const CreateEventPage: FC = () => {
  const submit = (values: any) => {
    console.log(values)
  }
  return (
    <ContentWrapper>
      <Typography variant="h5">Create Event</Typography>
      <Formik initialValues={initialValues} onSubmit={submit}>
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
