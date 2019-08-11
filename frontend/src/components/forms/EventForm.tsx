import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, IconButton, Button } from '@material-ui/core'
import { FieldArray, FormikProps } from 'formik'
import React, { FC } from 'react'
import DatePicker from './DatePicker'
import TextField from './Fields'

export interface EventFormFields {
  name: string
  description: string
  dates: string[]
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
        <TextField name="name" label="name" onChange={props.handleChange} />
      </Grid>
      <Grid item>
        <TextField
          name="description"
          label="description"
          multiline
          onChange={props.handleChange}
        />
      </Grid>
      <Grid item xs={12} container justify="center" spacing={3}>
        <DatesField {...props}></DatesField>
      </Grid>
      <Grid item>
        <TextField
          name="location.name"
          label="location name"
          onChange={props.handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          name="location.city"
          label="location city"
          onChange={props.handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          name="location.address"
          label="location address"
          onChange={props.handleChange}
        />
      </Grid>
      <Grid item>
        <Button
          type="submit"
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
                  name={`dates.${index}`}
                  value={values.dates[index]}
                  label={`date ${index + 1}`}
                  onChange={handleChange}
                />

                {index !== 0 && (
                  <DeleteButton
                    index={index}
                    onClick={arrayHelpers.remove}
                  ></DeleteButton>
                )}
              </Grid>
            ))}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <IconButton
                size="small"
                onClick={() => {
                  arrayHelpers.insert(values.dates.length, '')
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

const DeleteButton: FC<{ onClick: (index: number) => void; index: number }> = ({
  onClick,
  index
}) => {
  return (
    <IconButton
      onClick={() => {
        onClick(index)
      }}
    >
      <FontAwesomeIcon icon={faMinusSquare} style={{ fontSize: 20 }} />
    </IconButton>
  )
}

export default EventForm
