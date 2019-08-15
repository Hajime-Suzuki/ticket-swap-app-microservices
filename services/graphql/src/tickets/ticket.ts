import { gql } from 'apollo-server-lambda'

export const ticketSchema = gql`
  directive @authenticated on FIELD_DEFINITION

  type Ticket {
    eventId: ID!
    userId: ID!
    id: ID!
    price: String!
    date: String!
    username: String!
    description: String
    createdAt: String!
    soldAt: String
  }

  type Query {
    getTickets(args: GetTicketsArgs!): GetTicketsResponse!
    getTicket(args: GetTicketArgs!): GetTicketResponse!
  }

  type Mutation {
    createTicket(data: CreateTicketInput!): GetTicketResponse! @authenticated
  }

  input CreateTicketInput {
    eventId: ID!
    date: String!
    price: String!
    description: String
  }

  input GetTicketsArgs {
    keys: GetTicketsKeys!
    filter: GetTicketsFilter
  }

  input GetTicketsKeys {
    eventId: ID!
    id: ID
    # need to be able to find by userId too
  }

  input GetTicketsFilter {
    date: String!
  }

  input GetTicketArgs {
    eventId: ID!
    id: ID!
  }

  type GetTicketsResponse {
    tickets: [Ticket!]!
  }

  type GetTicketResponse {
    ticket: Ticket
  }
`
