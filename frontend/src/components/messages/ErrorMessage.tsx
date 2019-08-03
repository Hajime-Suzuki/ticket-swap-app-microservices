import { Typography } from '@material-ui/core'
import React, { FC } from 'react'

interface Props {
  text: string
}
const ErrorMessage: FC<Props> = ({ text }) => {
  return <Typography color="error">{text}</Typography>
}

export default ErrorMessage
