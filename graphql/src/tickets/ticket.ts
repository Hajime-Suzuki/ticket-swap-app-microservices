import { gql } from 'apollo-server-lambda'

export const ticketSchema = gql`
  type Ticket {
    eventId: ID!
    userId: ID!
    price: String!
    createdAt: String!
    soldAt: String
  }

  extend type Query {
    getTicket(id: ID!): GetTicketResponse
  }

  extend type Mutation {
    createTicket(data: CreateTicketInput): GetTicketResponse
  }

  input CreateTicketInput {
    eventId: ID!
    userId: ID!
    price: String!
  }

  type GetTicketResponse {
    ticket: Ticket
  }
`
