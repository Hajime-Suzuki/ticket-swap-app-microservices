import TextField from '@material-ui/core/TextField'
import { TimePicker as MUITimePicker } from '@material-ui/pickers'
import { Field, FormikProps, FieldProps } from 'formik'
import React, { FC } from 'react'
interface Props {
  onChange: FormikProps<any>['handleChange']
  value: string
  name: string
  label: string
}

const TimePicker: FC<Props> = props => {
  const { onChange: handleChangeDate, ...rest } = props
  return <Field component={DP} {...rest}></Field>
}

const DP = (props: FieldProps<any> & Props) => {
  const { form, field } = props

  const handleChangeDate = (value: any) => {
    form.setFieldValue(field.name, value)
  }

  console.log({ field })
  return (
    <MUITimePicker
      value={field.value || null}
      onChange={handleChangeDate}
      label="date"
      TextFieldComponent={TextField}
    />
  )
}

export default TimePicker