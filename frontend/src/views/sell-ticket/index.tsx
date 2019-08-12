import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TicketForm, { TicketFormProps } from 'components/forms/TicketForm'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import { createTicketSchema } from 'helpers/validations/schema'
import React, { FC } from 'react'
import useRouter from 'use-react-router'

export const createTicketInitialValues: TicketFormProps = {
  date: '',
  price: '0.00',
  description: ''
}

const SellTicketPage: FC = () => {
  const { history } = useRouter()
  // const [createEvent, { error, loading }] = useCreateEventMutation({
  //   refetchQueries: [{ query: GetEventsDocument }]
  // })
  const error = { message: null }
  const loading = false

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
            <TicketForm {...formikProps}></TicketForm>
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
