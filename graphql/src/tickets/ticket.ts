import { gql } from 'apollo-server-lambda'

export const ticketSchema = gql`
  directive @authenticated on FIELD_DEFINITION

  type Ticket {
    eventId: ID!
    userId: ID!
    price: String!
    createdAt: String!
    soldAt: String
  }

  extend type Query {
    getTicket(eventId: ID!, userId: ID!): GetTicketResponse @authenticated
  }

  extend type Mutation {
    createTicket(data: CreateTicketInput): Ticket
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
