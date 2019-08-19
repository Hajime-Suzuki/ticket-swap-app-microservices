import { Button, Grid, Typography } from '@material-ui/core'
import { Dropdown } from 'components/form-elements/Dropdown'
import { Form, Formik } from 'formik'
import { CreateTicketInput } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import TextField from '../form-elements/Fields'

export type TicketFormProps = Pick<
  CreateTicketInput,
  'date' | 'description'
> & { price: string }

interface Props {
  initialValues: TicketFormProps
  dates: {
    name: string
    value: string
  }[]
  validationSchema?: any
  onSubmit: (...args: any[]) => any
  error?: { message: string }
  loading?: boolean
  disableDate?: boolean
}

export const TicketForm: FC<Props> = props => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {formikProps => (
        <Form>
          <Grid container alignItems="center" direction="column" spacing={3}>
            <Grid item>
              <Dropdown
                name="date"
                label="date"
                menuItems={props.dates}
                disabled={props.disableDate}
              />
            </Grid>
            <Grid item>
              <TextField name="price" label="price" />
            </Grid>
            <Grid item>
              <TextField name="description" label="description" multiline />
            </Grid>
          </Grid>
          <div style={{ textAlign: 'center' }}>
            <Typography
              color="error"
              align="center"
              style={{ marginTop: '1em' }}
            >
              {props.error && props.error.message}
            </Typography>
            <Button
              onClick={() => formikProps.handleSubmit()}
              variant="contained"
              color="primary"
              disabled={props.loading}
              style={{ margin: '1em 0em' }}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
  // return (
  //   <Grid container alignItems="center" direction="column" spacing={3}>
  //     <Grid item>
  //       <Dropdown name="date" label="date" menuItems={menuItems} />
  //     </Grid>
  //     <Grid item>
  //       <TextField name="price" label="price" />
  //     </Grid>
  //     <Grid item>
  //       <TextField name="description" label="description" multiline />
  //     </Grid>
  //   </Grid>
  // )
}

export default TicketForm
