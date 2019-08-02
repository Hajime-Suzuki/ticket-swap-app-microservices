import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
import * as ReactApollo from "react-apollo";
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
  date: Scalars["String"];
  location: LocationInput;
};

export type CreateTicketInput = {
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  price: Scalars["String"];
};

export type Event = {
  __typename?: "Event";
  id: Scalars["String"];
  name: Scalars["String"];
  description: Scalars["String"];
  date: Scalars["String"];
  location: Location;
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};

export type GetEventResponse = {
  __typename?: "GetEventResponse";
  event?: Maybe<Event>;
};

export type GetEventsResponse = {
  __typename?: "GetEventsResponse";
  events?: Maybe<Array<Maybe<Event>>>;
};

export type GetTicketResponse = {
  __typename?: "GetTicketResponse";
  ticket?: Maybe<Ticket>;
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
  createTicket?: Maybe<Ticket>;
  createEvent?: Maybe<Event>;
};

export type MutationCreateTicketArgs = {
  data?: Maybe<CreateTicketInput>;
};

export type MutationCreateEventArgs = {
  data: CreateEventInput;
};

export type Query = {
  __typename?: "Query";
  getTicket?: Maybe<GetTicketResponse>;
  getEvent?: Maybe<GetEventResponse>;
  getUser?: Maybe<GetUserResponse>;
};

export type QueryGetTicketArgs = {
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
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
export type GetEventQueryVariables = {
  id: Scalars["ID"];
};

export type GetEventQuery = { __typename?: "Query" } & {
  getEvent: Maybe<
    { __typename?: "GetEventResponse" } & {
      event: Maybe<
        { __typename?: "Event" } & Pick<
          Event,
          "id" | "name" | "description" | "date"
        > & {
            location: { __typename?: "Location" } & Pick<
              Location,
              "name" | "city" | "address"
            >;
          }
      >;
    }
  >;
};

export type CreateEventMutationVariables = {
  data: CreateEventInput;
};

export type CreateEventMutation = { __typename?: "Mutation" } & {
  createEvent: Maybe<
    { __typename?: "Event" } & Pick<
      Event,
      "id" | "name" | "description" | "date" | "createdAt"
    > & {
        location: { __typename?: "Location" } & Pick<
          Location,
          "name" | "city" | "address"
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
        date
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
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetEventQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    baseOptions
  );
}
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
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
`;
export type CreateEventMutationFn = ReactApollo.MutationFn<
  CreateEventMutation,
  CreateEventMutationVariables
>;

export function useCreateEventMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CreateEventDocument, baseOptions);
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>;
