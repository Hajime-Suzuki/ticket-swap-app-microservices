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
    getTickets(args: GetTicketsArgs!): GetTicketsResponse!
  }

  type Mutation {
    createTicket(data: CreateTicketInput!): Ticket
  }

  input CreateTicketInput {
    eventId: ID!
    userId: ID!
    price: String!
  }

  input GetTicketsArgs {
    eventId: ID
    id: ID
    # need to be able to find by userId too
  }

  type GetTicketsResponse {
    tickets: [Ticket!]!
  }
`
