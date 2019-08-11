import MUITextField, { TextFieldProps } from '@material-ui/core/TextField'
import React, { FC } from 'react'
import { Field, FieldProps } from 'formik'

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

  return (
    <MUITextField
      name={name}
      label={label || name}
      type={type}
      onChange={handleChange}
    />
  )
}

// TODO: remove this later
// export const TextField: FC<TextFieldProps> = ({
//   name,
//   label,
//   type,
//   ...rest
// }) => {
//   return (
//     <MUITextField name={name} label={label || name} type={type} {...rest} />
//   )
// }

export default TextField
