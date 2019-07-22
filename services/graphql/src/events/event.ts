import { gql } from 'apollo-server-lambda'

export const eventSchema = gql`
  extend type Query {
    events: String
  }
`
