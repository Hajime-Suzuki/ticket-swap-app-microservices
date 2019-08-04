import { gql } from 'apollo-server-lambda'

export const eventSchema = gql`
  type Event {
    id: String!
    name: String!
    description: String!
    dates: [EventDate!]!
    location: Location!
    createdAt: String!
    updatedAt: String
  }

  type Location {
    name: String!
    city: String!
    address: String!
  }

  type EventDate {
    date: String!
    startTime: String!
    endTime: String!
  }

  extend type Query {
    getEvents: GetEventsResponse!
    getEvent(id: ID!): GetEventResponse!
  }
  extend type Mutation {
    createEvent(data: CreateEventInput!): Event
  }

  input CreateEventInput {
    name: String!
    description: String!
    dates: [EventDateInput!]!
    location: LocationInput!
  }

  input EventDateInput {
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
    event: Event!
  }
`
