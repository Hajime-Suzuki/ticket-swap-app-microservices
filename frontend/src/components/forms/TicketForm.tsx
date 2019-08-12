import { Grid } from '@material-ui/core'
import { FormikProps } from 'formik'
import { CreateTicketInput } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import DatePicker from './DatePicker'
import TextField from './Fields'

export type TicketFormProps = Pick<
  CreateTicketInput,
  'date' | 'price' | 'description'
>

type Props = FormikProps<TicketFormProps>

export const TicketForm: FC<Props> = () => {
  return (
    <Grid container alignItems="center" direction="column" spacing={3}>
      <Grid item xs={12} container justify="center" spacing={3}>
        <DatePicker name="date" />
      </Grid>
      <Grid item>
        <TextField name="price" label="price" type="number" />
      </Grid>
      <Grid item>
        <TextField name="description" label="description" multiline />
      </Grid>
    </Grid>
  )
}

export default TicketForm
