import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Input
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import { TextFieldProps } from '@material-ui/core/TextField'
import { Field, FieldProps, getIn } from 'formik'
import React, { FC } from 'react'

interface Props {
  menuItems: {
    name: string
    value: any
  }[]
}

export const Dropdown: FC<TextFieldProps & Props> = props => {
  return <Field component={FieldComponent} {...props} />
}

const FieldComponent: FC<FieldProps<any> & TextFieldProps & Props> = props => {
  const { label, form, field, menuItems, disabled } = props
  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    form.setFieldValue(field.name, e.target.value)
  }

  const error = getIn(form.errors, field.name)
  return (
    <>
      <FormControl fullWidth error={!!error}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={field.value}
          onChange={handleChange}
          input={<Input name={field.name} />}
          autoWidth
          disabled={disabled}
        >
          {menuItems.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </>
  )
}
