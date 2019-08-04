/* tslint:disable */
import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
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
  userId: Scalars["ID"];
  date: Scalars["String"];
  price: Scalars["String"];
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
  ticket: Ticket;
};

export type GetTicketsArgs = {
  keys: GetTicketsKeys;
  filter?: Maybe<GetTicketsFilter>;
};

export type GetTicketsFilter = {
  date: Scalars["String"];
};

export type GetTicketsKeys = {
  eventId: Scalars["ID"];
  id?: Maybe<Scalars["ID"]>;
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
  createdAt: Scalars["String"];
  soldAt?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};
export type GetTicketsQueryVariables = {
  args: GetTicketsArgs;
};

export type GetTicketsQuery = { __typename?: "Query" } & {
  getTickets: { __typename?: "GetTicketsResponse" } & {
    tickets: Array<
      { __typename?: "Ticket" } & Pick<
        Ticket,
        "id" | "eventId" | "userId" | "price" | "date"
      >
    >;
  };
};

export const GetTicketsDocument = gql`
  query getTickets($args: GetTicketsArgs!) {
    getTickets(args: $args) {
      tickets {
        id
        eventId
        userId
        price
        date
      }
    }
  }
`;

export function useGetTicketsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetTicketsQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetTicketsQuery, GetTicketsQueryVariables>(
    GetTicketsDocument,
    baseOptions
  );
}
export type GetTicketsQueryHookResult = ReturnType<typeof useGetTicketsQuery>;
