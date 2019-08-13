import MUITextField, { TextFieldProps } from '@material-ui/core/TextField'
import { Field, FieldProps, getIn } from 'formik'
import React, { FC } from 'react'

export const TextField: FC<TextFieldProps> = props => {
  return <Field component={FieldComponent} {...props} />
}

const FieldComponent: FC<FieldProps<any> & TextFieldProps> = props => {
  const { name, label, type, form, field } = props
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    form.setFieldValue(field.name, e.target.value)
  }
  const error = getIn(form.errors, field.name)
  return (
    <MUITextField
      name={name}
      value={field.value}
      label={label || name}
      type={type}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  )
}

export default TextField
