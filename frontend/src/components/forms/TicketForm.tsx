import { Grid } from '@material-ui/core'
import { Dropdown } from 'components/form-elements/Dropdown'
import { CreateTicketInput } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import TextField from '../form-elements/Fields'

export type TicketFormProps = Pick<
  CreateTicketInput,
  'date' | 'description'
> & { price: string }

interface Props {
  dates: {
    name: string
    value: string
  }[]
  disableDate?: boolean
}

export const TicketForm: FC<Props> = props => {
  return (
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
  )
}

export default TicketForm
