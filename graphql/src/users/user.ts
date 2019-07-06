import { gql } from 'apollo-server-lambda'

export const userSchema = gql`
  type Query {
    user: String
  }
  type Mutation {
    createUser(data: CreateUserInput): User
  }
  type User {
    id: ID!
    userName: String!
    email: String!
  }
  input CreateUserInput {
    userName: String!
    email: String!
    password: String!
  }
`
