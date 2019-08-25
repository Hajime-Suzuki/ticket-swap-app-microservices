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
import { TextFieldCustomProps } from './Fields'

type Props = {
  menuItems: {
    name: string
    value: any
  }[]
} & TextFieldCustomProps

export const Dropdown: FC<TextFieldProps & Props> = props => {
  return (
    <Field
      component={FieldComponent}
      {...props}
      style={{ minWidth: props.min_width }}
    />
  )
}

const FieldComponent: FC<FieldProps<any> & TextFieldProps & Props> = props => {
  const { label, form, field, menuItems, disabled, fullWidth, ...rest } = props
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
    <FormControl fullWidth={fullWidth} error={!!error} {...(rest as any)}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={field.value}
        onChange={handleChange}
        input={<Input name={field.name} />}
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
  )
}
