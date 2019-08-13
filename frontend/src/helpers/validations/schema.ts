import * as yup from 'yup'

const errorMessages = {
  required: (field: string) => `${field} is required`,
  endTime: 'end time should be later than start time'
}

const dateSchema = yup.object().shape({
  date: yup.string().required(errorMessages.required('date')),
  startTime: yup.string().required(errorMessages.required('start time')),
  endTime: yup
    .string()
    .required(errorMessages.required('end time'))
    .test('endTime', errorMessages.endTime, function(this: yup.TestContext) {
      const {
        parent: { endTime, startTime }
      } = this
      if (
        endTime === 'Invalid Date' ||
        startTime === 'Invalid Date' ||
        !startTime ||
        !endTime
      )
        return true
      return endTime > startTime
    })
})

const locationSchema = yup.object().shape({
  name: yup.string().required(errorMessages.required('name')),
  city: yup.string().required(errorMessages.required('city')),
  address: yup.string().required(errorMessages.required('address'))
})

export const createEventSchema = yup.object().shape({
  name: yup.string().required(errorMessages.required('name')),
  description: yup.string().required(errorMessages.required('description')),
  dates: yup.array().of(dateSchema),
  location: locationSchema
})

export const createTicketSchema = yup.object().shape({
  date: yup.string().required(errorMessages.required('date')),
  price: yup
    .string()
    .required(errorMessages.required('price'))
    .test('price', 'price should be number', function(
      this: yup.TestContext,
      value: string
    ) {
      if (!value) return true
      return !value.match(/[^.\d]/) ? true : false
    })
    .test('price', 'too many decimal numbers', function(
      this: yup.TestContext,
      value: string
    ) {
      if (!value) return true
      if (value.toString().match(/\d{1,}\.\d{3,}/)) return false
      return true
    }),
  description: yup.string()
})
