import { gql } from 'apollo-server-lambda'

export const userSchema = gql`
  extend type Query {
    getUser(id: String!): GetUserResponse
  }
  type User {
    "id is sub from cognito"
    id: ID

    "email is hash key of DynamoDB"
    email: String!
  }

  type GetUserResponse {
    user: User
  }
`
