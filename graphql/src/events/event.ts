import { gql } from 'apollo-server-lambda'

export const eventSchema = gql`
  type Query {
    events: String
  }
`
