import MUITextField, { TextFieldProps } from '@material-ui/core/TextField'
import { Field, FieldProps, getIn } from 'formik'
import React, { FC } from 'react'

export const TextField: FC<TextFieldProps> = props => {
  return <Field component={FieldComponent} {...props} />
}

const FieldComponent: FC<
  FieldProps<any> & Omit<TextFieldProps, 'name'>
> = props => {
  const { label, type, form, field, multiline } = props
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
      name={field.name}
      value={field.value || ''}
      label={label || field.name}
      type={type}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      multiline={multiline}
    />
  )
}

export default TextField
