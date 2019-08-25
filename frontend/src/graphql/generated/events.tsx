/* tslint:disable */
import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateEventInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  dates: Array<EventDateInput>;
  location: LocationInput;
};

export type CreateTicketInput = {
  eventId: Scalars["ID"];
  date: Scalars["String"];
  price: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type Event = {
  __typename?: "Event";
  id: Scalars["String"];
  name: Scalars["String"];
  description: Scalars["String"];
  dates: Array<EventDate>;
  location: Location;
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};

export type EventDate = {
  __typename?: "EventDate";
  date: Scalars["String"];
  startTime: Scalars["String"];
  endTime: Scalars["String"];
};

export type EventDateInput = {
  date: Scalars["String"];
  startTime: Scalars["String"];
  endTime: Scalars["String"];
};

export type GetEventResponse = {
  __typename?: "GetEventResponse";
  event: Event;
};

export type GetEventsResponse = {
  __typename?: "GetEventsResponse";
  events: Array<Event>;
};

export type GetTicketArgs = {
  eventId: Scalars["ID"];
  id: Scalars["ID"];
};

export type GetTicketResponse = {
  __typename?: "GetTicketResponse";
  ticket?: Maybe<Ticket>;
};

export type GetTicketsArgs = {
  keys: GetTicketsKeys;
  filter?: Maybe<GetTicketsFilter>;
};

export type GetTicketsFilter = {
  date: Scalars["String"];
};

export type GetTicketsKeys = {
  eventId?: Maybe<Scalars["ID"]>;
  id?: Maybe<Scalars["ID"]>;
  userId?: Maybe<Scalars["ID"]>;
};

export type GetTicketsResponse = {
  __typename?: "GetTicketsResponse";
  tickets: Array<Ticket>;
};

export type GetUserResponse = {
  __typename?: "GetUserResponse";
  user?: Maybe<User>;
};

export type Gsi1Keys = {
  userId: Scalars["ID"];
};

export type Location = {
  __typename?: "Location";
  name: Scalars["String"];
  city: Scalars["String"];
  address: Scalars["String"];
};

export type LocationInput = {
  name: Scalars["String"];
  city: Scalars["String"];
  address: Scalars["String"];
};

export type MainKeys = {
  eventId: Scalars["ID"];
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTicket: GetTicketResponse;
  updateTicket: Ticket;
  createEvent?: Maybe<Event>;
};

export type MutationCreateTicketArgs = {
  data: CreateTicketInput;
};

export type MutationUpdateTicketArgs = {
  keys: MainKeys;
  data: UpdateTicketArgs;
};

export type MutationCreateEventArgs = {
  data: CreateEventInput;
};

export type Query = {
  __typename?: "Query";
  getTickets: GetTicketsResponse;
  getTicket: GetTicketResponse;
  getEvents: GetEventsResponse;
  getEvent: GetEventResponse;
  getUser?: Maybe<GetUserResponse>;
};

export type QueryGetTicketsArgs = {
  args: GetTicketsArgs;
};

export type QueryGetTicketArgs = {
  args: GetTicketArgs;
};

export type QueryGetEventArgs = {
  id: Scalars["ID"];
};

export type QueryGetUserArgs = {
  id: Scalars["String"];
};

export type Ticket = {
  __typename?: "Ticket";
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  id: Scalars["ID"];
  price: Scalars["String"];
  date: Scalars["String"];
  username: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  soldAt?: Maybe<Scalars["String"]>;
  eventName: Scalars["String"];
};

export type UpdateTicketArgs = {
  price: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};
export type GetEventQueryVariables = {
  id: Scalars["ID"];
};

export type GetEventQuery = { __typename?: "Query" } & {
  getEvent: { __typename?: "GetEventResponse" } & {
    event: { __typename?: "Event" } & Pick<
      Event,
      "id" | "name" | "description"
    > & {
        dates: Array<
          { __typename?: "EventDate" } & Pick<
            EventDate,
            "date" | "startTime" | "endTime"
          >
        >;
        location: { __typename?: "Location" } & Pick<
          Location,
          "name" | "city" | "address"
        >;
      };
  };
};

export type GetEventsQueryVariables = {};

export type GetEventsQuery = { __typename?: "Query" } & {
  getEvents: { __typename?: "GetEventsResponse" } & {
    events: Array<
      { __typename?: "Event" } & Pick<Event, "id" | "name" | "description"> & {
          dates: Array<
            { __typename?: "EventDate" } & Pick<
              EventDate,
              "date" | "startTime" | "endTime"
            >
          >;
          location: { __typename?: "Location" } & Pick<Location, "city">;
        }
    >;
  };
};

export type CreateEventMutationVariables = {
  data: CreateEventInput;
};

export type CreateEventMutation = { __typename?: "Mutation" } & {
  createEvent: Maybe<
    { __typename?: "Event" } & Pick<
      Event,
      "id" | "name" | "description" | "createdAt"
    > & {
        location: { __typename?: "Location" } & Pick<
          Location,
          "name" | "city" | "address"
        >;
        dates: Array<
          { __typename?: "EventDate" } & Pick<
            EventDate,
            "date" | "startTime" | "endTime"
          >
        >;
      }
  >;
};

export const GetEventDocument = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      event {
        id
        name
        description
        dates {
          date
          startTime
          endTime
        }
        location {
          name
          city
          address
        }
      }
    }
  }
`;

export function useGetEventQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetEventQuery,
    GetEventQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    baseOptions
  );
}
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventQueryResult = ApolloReactCommon.QueryResult<
  GetEventQuery,
  GetEventQueryVariables
>;
export const GetEventsDocument = gql`
  query getEvents {
    getEvents {
      events {
        id
        name
        dates {
          date
          startTime
          endTime
        }
        description
        location {
          city
        }
      }
    }
  }
`;

export function useGetEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetEventsQuery,
    GetEventsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetEventsQuery, GetEventsQueryVariables>(
    GetEventsDocument,
    baseOptions
  );
}
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsQueryResult = ApolloReactCommon.QueryResult<
  GetEventsQuery,
  GetEventsQueryVariables
>;
export const CreateEventDocument = gql`
  mutation createEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      id
      name
      description
      location {
        name
        city
        address
      }
      dates {
        date
        startTime
        endTime
      }
      createdAt
    }
  }
`;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>;

export function useCreateEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CreateEventDocument, baseOptions);
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>;
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<
  CreateEventMutation
>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>;
