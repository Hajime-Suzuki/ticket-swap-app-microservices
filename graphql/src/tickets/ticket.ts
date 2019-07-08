import { gql } from 'apollo-server-lambda'

export const ticketSchema = gql`
  type Ticket {
    eventId: ID!
    userId: ID!
    price: String!
    soldAt: Int
    createdAt: Int!
  }

  extend type Query {
    getTicket(id: ID!): GetTicketResponse
  }

  extend type Mutation {
    createTicket(data: CreateTicketInput): Ticket
  }

  input CreateTicketInput {
    eventId: ID!
    user: ID!
    price: String!
  }

  type GetTicketResponse {
    ticket: Ticket
  }
`
