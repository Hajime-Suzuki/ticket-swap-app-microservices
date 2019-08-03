import gql from 'graphql-tag'
import * as ReactApolloHooks from 'react-apollo-hooks'
import * as ReactApollo from 'react-apollo'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface CreateEventInput {
  name: Scalars['String']
  description: Scalars['String']
  date: Scalars['String']
  location: LocationInput
}

export interface CreateTicketInput {
  eventId: Scalars['ID']
  userId: Scalars['ID']
  price: Scalars['String']
}

export interface Event {
  __typename?: 'Event'
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  date: Scalars['String']
  location: Location
  createdAt: Scalars['String']
  updatedAt?: Maybe<Scalars['String']>
}

export interface GetEventResponse {
  __typename?: 'GetEventResponse'
  event?: Maybe<Event>
}

export interface GetEventsResponse {
  __typename?: 'GetEventsResponse'
  events: Array<Event>
}

export interface GetTicketResponse {
  __typename?: 'GetTicketResponse'
  ticket?: Maybe<Ticket>
}

export interface GetUserResponse {
  __typename?: 'GetUserResponse'
  user?: Maybe<User>
}

export interface Location {
  __typename?: 'Location'
  name: Scalars['String']
  city: Scalars['String']
  address: Scalars['String']
}

export interface LocationInput {
  name: Scalars['String']
  city: Scalars['String']
  address: Scalars['String']
}

export interface Mutation {
  __typename?: 'Mutation'
  createTicket?: Maybe<Ticket>
  createEvent?: Maybe<Event>
}

export interface MutationCreateTicketArgs {
  data?: Maybe<CreateTicketInput>
}

export interface MutationCreateEventArgs {
  data: CreateEventInput
}

export interface Query {
  __typename?: 'Query'
  getTicket?: Maybe<GetTicketResponse>
  getEvents?: Maybe<GetEventsResponse>
  getEvent?: Maybe<GetEventResponse>
  getUser?: Maybe<GetUserResponse>
}

export interface QueryGetTicketArgs {
  eventId: Scalars['ID']
  userId: Scalars['ID']
}

export interface QueryGetEventArgs {
  id: Scalars['ID']
}

export interface QueryGetUserArgs {
  id: Scalars['String']
}

export interface Ticket {
  __typename?: 'Ticket'
  eventId: Scalars['ID']
  userId: Scalars['ID']
  id: Scalars['ID']
  price: Scalars['String']
  createdAt: Scalars['String']
  soldAt?: Maybe<Scalars['String']>
}

export interface User {
  __typename?: 'User'
  id: Scalars['String']
  email: Scalars['String']
  createdAt: Scalars['String']
  updatedAt?: Maybe<Scalars['String']>
}
export interface GetEventQueryVariables {
  id: Scalars['ID']
}

export type GetEventQuery = { __typename?: 'Query' } & {
  getEvent: Maybe<
    { __typename?: 'GetEventResponse' } & {
      event: Maybe<
        { __typename?: 'Event' } & Pick<
          Event,
          'id' | 'name' | 'description' | 'date'
        > & {
            location: { __typename?: 'Location' } & Pick<
              Location,
              'name' | 'city' | 'address'
            >
          }
      >
    }
  >
}

export interface GetEventsQueryVariables {}

export type GetEventsQuery = { __typename?: 'Query' } & {
  getEvents: Maybe<
    { __typename?: 'GetEventsResponse' } & {
      events: Array<
        { __typename?: 'Event' } & Pick<
          Event,
          'id' | 'name' | 'date' | 'description'
        > & { location: { __typename?: 'Location' } & Pick<Location, 'city'> }
      >
    }
  >
}

export interface CreateEventMutationVariables {
  data: CreateEventInput
}

export type CreateEventMutation = { __typename?: 'Mutation' } & {
  createEvent: Maybe<
    { __typename?: 'Event' } & Pick<
      Event,
      'id' | 'name' | 'description' | 'date' | 'createdAt'
    > & {
        location: { __typename?: 'Location' } & Pick<
          Location,
          'name' | 'city' | 'address'
        >
      }
  >
}

export const GetEventDocument = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      event {
        id
        name
        description
        date
        location {
          name
          city
          address
        }
      }
    }
  }
`

export function useGetEventQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetEventQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    baseOptions
  )
}
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>
export const GetEventsDocument = gql`
  query getEvents {
    getEvents {
      events {
        id
        name
        date
        description
        location {
          city
        }
      }
    }
  }
`

export function useGetEventsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetEventsQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetEventsQuery, GetEventsQueryVariables>(
    GetEventsDocument,
    baseOptions
  )
}
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>
export const CreateEventDocument = gql`
  mutation createEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      id
      name
      description
      date
      location {
        name
        city
        address
      }
      createdAt
    }
  }
`
export type CreateEventMutationFn = ReactApollo.MutationFn<
  CreateEventMutation,
  CreateEventMutationVariables
>

export function useCreateEventMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CreateEventDocument, baseOptions)
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>
