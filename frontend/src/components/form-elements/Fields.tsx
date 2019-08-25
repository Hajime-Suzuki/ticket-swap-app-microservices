import MUITextField, { TextFieldProps } from '@material-ui/core/TextField'
import { Field, FieldProps, getIn } from 'formik'
import React, { FC } from 'react'

export interface TextFieldCustomProps {
  min_width?: number | string
}
export const TextField: FC<TextFieldProps & TextFieldCustomProps> = props => {
  return (
    <Field
      component={FieldComponent}
      {...props}
      style={{ minWidth: props.min_width }}
    />
  )
}

const FieldComponent: FC<
  FieldProps<any> & Omit<TextFieldProps, 'name'>
> = props => {
  const { label, type, form, field, multiline, ...rest } = props
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
      {...(rest as any)}
    />
  )
}

export default TextField
