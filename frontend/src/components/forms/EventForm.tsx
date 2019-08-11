import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, IconButton } from '@material-ui/core'
import { FieldArray, FormikProps } from 'formik'
import React, { FC } from 'react'
import { createEventInitialValues } from 'views/create-event'
import DatePicker from './DatePicker'
import TextField from './Fields'

export interface EventFormFields {
  name: string
  description: string
  dates: any[]
  location: {
    name: string
    city: string
    address: string
  }
}

type Props = FormikProps<EventFormFields>

export const EventForm: FC<Props> = props => {
  return (
    <Grid container alignItems="center" direction="column" spacing={3}>
      <Grid item>
        <TextField name="name" label="name" />
      </Grid>
      <Grid item>
        <TextField name="description" label="description" multiline />
      </Grid>
      <Grid item xs={12} container justify="center" spacing={3}>
        <DatesField {...props}></DatesField>
      </Grid>
      <Grid item>
        <TextField name="location.name" label="location name" />
      </Grid>
      <Grid item>
        <TextField name="location.city" label="location city" />
      </Grid>
      <Grid item>
        <TextField name="location.address" label="location address" />
      </Grid>
      <Grid item>
        <Button
          onClick={() => props.handleSubmit()}
          variant="contained"
          color="primary"
          style={{ marginTop: '1em' }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

const DatesField: FC<Props> = ({ values, handleChange }) => {
  return (
    <FieldArray name="dates">
      {arrayHelpers => {
        return (
          <>
            {values.dates.map((_, index) => (
              <Grid item key={index} md={3} container justify="center">
                <DatePicker
                  name={`dates.${index}.date`}
                  label={`date ${index + 1}`}
                />

                {index !== 0 && (
                  <IconButton onClick={() => arrayHelpers.remove(index)}>
                    <FontAwesomeIcon
                      icon={faMinusSquare}
                      style={{ fontSize: 20 }}
                    />
                  </IconButton>
                )}
              </Grid>
            ))}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <IconButton
                size="small"
                onClick={() => {
                  arrayHelpers.insert(
                    values.dates.length,
                    createEventInitialValues.dates[0]
                  )
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} />
              </IconButton>
            </Grid>
          </>
        )
      }}
    </FieldArray>
  )
}

export default EventForm
