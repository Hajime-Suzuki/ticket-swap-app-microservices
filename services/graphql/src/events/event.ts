import { gql } from 'apollo-server-lambda'

export const eventSchema = gql`
  type Event {
    id: String!
    name: String!
    description: String!
    date: [Date!]!
    location: Location!
    createdAt: String!
    updatedAt: String
  }

  type Location {
    name: String!
    city: String!
    address: String!
  }

  type Date {
    date: String!
    startTime: String!
    endTime: String!
  }

  extend type Query {
    getEvents: GetEventsResponse
    getEvent(id: ID!): GetEventResponse
  }
  extend type Mutation {
    createEvent(data: CreateEventInput!): Event
  }

  input CreateEventInput {
    name: String!
    description: String!
    date: [DateInput!]!
    location: LocationInput!
  }

  input DateInput {
    date: String!
    startTime: String!
    endTime: String!
  }

  input LocationInput {
    name: String!
    city: String!
    address: String!
  }

  type GetEventsResponse {
    events: [Event!]!
  }
  type GetEventResponse {
    event: Event
  }
`
