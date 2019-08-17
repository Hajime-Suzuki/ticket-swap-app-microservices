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

export type Mutation = {
  __typename?: "Mutation";
  createTicket: GetTicketResponse;
  createEvent?: Maybe<Event>;
};

export type MutationCreateTicketArgs = {
  data: CreateTicketInput;
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
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};
export type GetTicketsQueryVariables = {
  keys: GetTicketsKeys;
  filter?: Maybe<GetTicketsFilter>;
};

export type GetTicketsQuery = { __typename?: "Query" } & {
  getTickets: { __typename?: "GetTicketsResponse" } & {
    tickets: Array<
      { __typename?: "Ticket" } & Pick<
        Ticket,
        "id" | "eventId" | "userId" | "price" | "date" | "username"
      >
    >;
  };
};

export type GetTicketQueryVariables = {
  eventId: Scalars["ID"];
  ticketId: Scalars["ID"];
};

export type GetTicketQuery = { __typename?: "Query" } & {
  getTicket: { __typename?: "GetTicketResponse" } & {
    ticket: Maybe<
      { __typename?: "Ticket" } & Pick<
        Ticket,
        "id" | "price" | "date" | "userId" | "username" | "description"
      >
    >;
  };
};

export type CreateTicketMutationVariables = {
  data: CreateTicketInput;
};

export type CreateTicketMutation = { __typename?: "Mutation" } & {
  createTicket: { __typename?: "GetTicketResponse" } & {
    ticket: Maybe<{ __typename?: "Ticket" } & Pick<Ticket, "price">>;
  };
};

export const GetTicketsDocument = gql`
  query getTickets($keys: GetTicketsKeys!, $filter: GetTicketsFilter) {
    getTickets(args: { keys: $keys, filter: $filter }) {
      tickets {
        id
        eventId
        userId
        price
        date
        username
      }
    }
  }
`;

export function useGetTicketsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetTicketsQuery,
    GetTicketsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetTicketsQuery, GetTicketsQueryVariables>(
    GetTicketsDocument,
    baseOptions
  );
}
export type GetTicketsQueryHookResult = ReturnType<typeof useGetTicketsQuery>;
export type GetTicketsQueryResult = ApolloReactCommon.QueryResult<
  GetTicketsQuery,
  GetTicketsQueryVariables
>;
export const GetTicketDocument = gql`
  query getTicket($eventId: ID!, $ticketId: ID!) {
    getTicket(args: { eventId: $eventId, id: $ticketId }) {
      ticket {
        id
        price
        date
        userId
        username
        description
      }
    }
  }
`;

export function useGetTicketQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetTicketQuery,
    GetTicketQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetTicketQuery, GetTicketQueryVariables>(
    GetTicketDocument,
    baseOptions
  );
}
export type GetTicketQueryHookResult = ReturnType<typeof useGetTicketQuery>;
export type GetTicketQueryResult = ApolloReactCommon.QueryResult<
  GetTicketQuery,
  GetTicketQueryVariables
>;
export const CreateTicketDocument = gql`
  mutation createTicket($data: CreateTicketInput!) {
    createTicket(data: $data) {
      ticket {
        price
      }
    }
  }
`;
export type CreateTicketMutationFn = ApolloReactCommon.MutationFunction<
  CreateTicketMutation,
  CreateTicketMutationVariables
>;

export function useCreateTicketMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTicketMutation,
    CreateTicketMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateTicketMutation,
    CreateTicketMutationVariables
  >(CreateTicketDocument, baseOptions);
}
export type CreateTicketMutationHookResult = ReturnType<
  typeof useCreateTicketMutation
>;
export type CreateTicketMutationResult = ApolloReactCommon.MutationResult<
  CreateTicketMutation
>;
export type CreateTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTicketMutation,
  CreateTicketMutationVariables
>;
