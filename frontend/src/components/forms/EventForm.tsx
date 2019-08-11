import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, IconButton } from '@material-ui/core'
import { FieldArray, FormikProps } from 'formik'
import React, { FC } from 'react'
import { createEventInitialValues } from 'views/create-event'
import DatePicker from './DatePicker'
import TextField from './Fields'
import TimePicker from './TimePicker'
import { CreateEventInput } from 'graphql/generated/events'

type Props = FormikProps<CreateEventInput>

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

const DatesField: FC<Props> = ({ values }) => {
  return (
    <FieldArray name="dates">
      {arrayHelpers => {
        return (
          <>
            {values.dates.map((_, index) => (
              <Grid
                item
                key={index}
                container
                justify="center"
                style={{ textAlign: 'center' }}
                spacing={2}
              >
                <Grid item xs={12} md={2}>
                  <DatePicker
                    name={`dates.${index}.date`}
                    label={`date ${index + 1}`}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TimePicker
                    name={`dates.${index}.startTime`}
                    label="start time"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TimePicker
                    name={`dates.${index}.endTime`}
                    label="end time"
                  />
                </Grid>

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
