import MUITextField, { TextFieldProps } from '@material-ui/core/TextField'
import React, { FC } from 'react'

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  type,
  ...rest
}) => {
  return (
    <MUITextField name={name} label={label || name} type={type} {...rest} />
  )
}

export default TextField
