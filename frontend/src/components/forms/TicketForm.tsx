import { Grid } from '@material-ui/core'
import { Dropdown } from 'components/form-elements/Dropdown'
import { FormikProps } from 'formik'
import { CreateTicketInput } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import TextField from '../form-elements/Fields'
import { Event } from 'graphql/generated/events'

export type TicketFormProps = Pick<
  CreateTicketInput,
  'date' | 'description'
> & { price: string }

type Props = FormikProps<TicketFormProps> & { dates: Event['dates'] }

export const TicketForm: FC<Props> = ({ dates }) => {
  const menuItems = dates.map(date => ({
    name: date.date,
    value: date.date
  }))
  return (
    <Grid container alignItems="center" direction="column" spacing={3}>
      <Grid item>
        <Dropdown name="date" label="date" menuItems={menuItems} />
      </Grid>
      <Grid item>
        <TextField name="price" label="price" />
      </Grid>
      <Grid item>
        <TextField name="description" label="description" multiline />
      </Grid>
    </Grid>
  )
}

export default TicketForm
