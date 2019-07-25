import { gql } from 'apollo-server-lambda'

export const userSchema = gql`
  extend type Query {
    getUser(id: String!): GetUserResponse
  }

  type User {
    id: String!
    email: String!
    createdAt: String!
    updatedAt: String
  }

  type GetUserResponse {
    user: User
  }
`
