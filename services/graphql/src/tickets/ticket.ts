import { gql } from 'apollo-server-lambda'

export const ticketSchema = gql`
  directive @authenticated on FIELD_DEFINITION

  type Ticket {
    eventId: ID!
    userId: ID!
    id: ID!
    price: String!
    createdAt: String!
    soldAt: String
  }

  type Query {
    getTicket(eventId: ID!, userId: ID!): GetTicketResponse
  }

  type Mutation {
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
