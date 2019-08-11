import * as yup from 'yup'

const dateSchema = yup.object().shape({
  date: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required()
})

const locationSchema = yup.object().shape({
  name: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required()
})

export const createEventSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  dates: yup.array().of(dateSchema),
  location: locationSchema
})
