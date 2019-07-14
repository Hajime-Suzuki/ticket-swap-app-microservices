import { gql } from 'apollo-server-lambda'

export const userSchema = gql`
  extend type Query {
    user: User
  }
  type User {
    "id is sub from cognito"
    id: ID

    "email is hash key of DynamoDB"
    email: String!
  }
`
