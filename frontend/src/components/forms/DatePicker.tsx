import TextField from '@material-ui/core/TextField'
import { DatePicker as MUIDatePicker } from '@material-ui/pickers'
import { Field, FieldProps } from 'formik'
import { formatDate } from 'helpers/date'
import React, { FC } from 'react'

interface Props {
  name: string
  label: string
}

const DatePicker: FC<Props> = props => {
  return <Field component={FormComponent} {...props}></Field>
}

const FormComponent = (props: FieldProps<any> & Props) => {
  const { form, field } = props

  const handleChangeDate = (date: any) => {
    const d = formatDate(date, 'YYYY-MM-DD')
    form.setFieldValue(field.name, d)
  }

  return (
    <MUIDatePicker
      value={field.value || null}
      onChange={handleChangeDate}
      label="date"
      TextFieldComponent={TextField}
    />
  )
}

export default DatePicker
