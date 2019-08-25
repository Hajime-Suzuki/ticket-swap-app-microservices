import { Grid } from '@material-ui/core'
import { Dropdown } from 'components/form-elements/Dropdown'
import { CreateTicketInput } from 'graphql/generated/tickets'
import React, { FC } from 'react'
import TextField, { TextFieldCustomProps } from '../form-elements/Fields'
import { TextFieldProps } from '@material-ui/core/TextField'

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
  minWidth?: TextFieldCustomProps['min_width']
  fullWidth?: TextFieldProps['fullWidth']
}

const MIN_WIDTH = 200

export const TicketForm: FC<Props> = props => {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Dropdown
          name="date"
          label="date"
          menuItems={props.dates}
          disabled={props.disableDate}
          fullWidth={props.fullWidth}
          min_width={props.minWidth || MIN_WIDTH}
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <TextField
          name="price"
          label="price"
          fullWidth={props.fullWidth}
          min_width={props.minWidth || MIN_WIDTH}
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <TextField
          name="description"
          label="description"
          multiline
          fullWidth={props.fullWidth}
          min_width={props.minWidth || MIN_WIDTH}
        />
      </Grid>
    </Grid>
  )
}

export default TicketForm
