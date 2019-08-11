import TextField from '@material-ui/core/TextField'
import { KeyboardTimePicker, MaterialUiPickersDate } from '@material-ui/pickers'
import { Field, FieldProps, getIn } from 'formik'
import React, { FC } from 'react'

interface Props {
  name: string
  label: string
}

const TimePicker: FC<Props> = props => {
  return <Field component={FormComponent} {...props}></Field>
}

const FormComponent = (props: FieldProps<any> & Props) => {
  const { form, field } = props

  const handleChangeDate = (
    date: MaterialUiPickersDate | null,
    value?: string | null
  ) => {
    form.setFieldValue(field.name, date)
  }

  const error: string | undefined = getIn(form.errors, field.name)
  const errorMessages = error && error.split('.')

  return (
    <KeyboardTimePicker
      label={props.label}
      placeholder="14:32"
      ampm={false}
      value={field.value || null}
      onChange={handleChangeDate}
      TextFieldComponent={TextField}
      error={!!error}
      helperText={errorMessages && errorMessages[errorMessages.length - 1]}
    />
  )
}

export default TimePicker
