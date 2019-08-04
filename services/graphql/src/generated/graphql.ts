/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ICreateEventInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  dates: Array<IEventDateInput>;
  location: ILocationInput;
};

export type ICreateTicketInput = {
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  date: Scalars["String"];
  price: Scalars["String"];
};

export type IEvent = {
  __typename?: "Event";
  id: Scalars["String"];
  name: Scalars["String"];
  description: Scalars["String"];
  dates: Array<IEventDate>;
  location: ILocation;
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};

export type IEventDate = {
  __typename?: "EventDate";
  date: Scalars["String"];
  startTime: Scalars["String"];
  endTime: Scalars["String"];
};

export type IEventDateInput = {
  date: Scalars["String"];
  startTime: Scalars["String"];
  endTime: Scalars["String"];
};

export type IGetEventResponse = {
  __typename?: "GetEventResponse";
  event: IEvent;
};

export type IGetEventsResponse = {
  __typename?: "GetEventsResponse";
  events: Array<IEvent>;
};

export type IGetTicketArgs = {
  eventId: Scalars["ID"];
  id: Scalars["ID"];
};

export type IGetTicketResponse = {
  __typename?: "GetTicketResponse";
  ticket: ITicket;
};

export type IGetTicketsArgs = {
  keys: IGetTicketsKeys;
  filter?: Maybe<IGetTicketsFilter>;
};

export type IGetTicketsFilter = {
  date: Scalars["String"];
};

export type IGetTicketsKeys = {
  eventId: Scalars["ID"];
  id?: Maybe<Scalars["ID"]>;
};

export type IGetTicketsResponse = {
  __typename?: "GetTicketsResponse";
  tickets: Array<ITicket>;
};

export type IGetUserResponse = {
  __typename?: "GetUserResponse";
  user?: Maybe<IUser>;
};

export type ILocation = {
  __typename?: "Location";
  name: Scalars["String"];
  city: Scalars["String"];
  address: Scalars["String"];
};

export type ILocationInput = {
  name: Scalars["String"];
  city: Scalars["String"];
  address: Scalars["String"];
};

export type IMutation = {
  __typename?: "Mutation";
  createTicket: IGetTicketResponse;
  createEvent?: Maybe<IEvent>;
};

export type IMutationCreateTicketArgs = {
  data: ICreateTicketInput;
};

export type IMutationCreateEventArgs = {
  data: ICreateEventInput;
};

export type IQuery = {
  __typename?: "Query";
  getTickets: IGetTicketsResponse;
  getTicket: IGetTicketResponse;
  getEvents: IGetEventsResponse;
  getEvent: IGetEventResponse;
  getUser?: Maybe<IGetUserResponse>;
};

export type IQueryGetTicketsArgs = {
  args: IGetTicketsArgs;
};

export type IQueryGetTicketArgs = {
  args: IGetTicketArgs;
};

export type IQueryGetEventArgs = {
  id: Scalars["ID"];
};

export type IQueryGetUserArgs = {
  id: Scalars["String"];
};

export type ITicket = {
  __typename?: "Ticket";
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  id: Scalars["ID"];
  price: Scalars["String"];
  date: Scalars["String"];
  createdAt: Scalars["String"];
  soldAt?: Maybe<Scalars["String"]>;
};

export type IUser = {
  __typename?: "User";
  id: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  GetTicketsArgs: IGetTicketsArgs;
  GetTicketsKeys: IGetTicketsKeys;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  GetTicketsFilter: IGetTicketsFilter;
  String: ResolverTypeWrapper<Scalars["String"]>;
  GetTicketsResponse: ResolverTypeWrapper<IGetTicketsResponse>;
  Ticket: ResolverTypeWrapper<ITicket>;
  GetTicketArgs: IGetTicketArgs;
  GetTicketResponse: ResolverTypeWrapper<IGetTicketResponse>;
  GetEventsResponse: ResolverTypeWrapper<IGetEventsResponse>;
  Event: ResolverTypeWrapper<IEvent>;
  EventDate: ResolverTypeWrapper<IEventDate>;
  Location: ResolverTypeWrapper<ILocation>;
  GetEventResponse: ResolverTypeWrapper<IGetEventResponse>;
  GetUserResponse: ResolverTypeWrapper<IGetUserResponse>;
  User: ResolverTypeWrapper<IUser>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateTicketInput: ICreateTicketInput;
  CreateEventInput: ICreateEventInput;
  EventDateInput: IEventDateInput;
  LocationInput: ILocationInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  GetTicketsArgs: IGetTicketsArgs;
  GetTicketsKeys: IGetTicketsKeys;
  ID: Scalars["ID"];
  GetTicketsFilter: IGetTicketsFilter;
  String: Scalars["String"];
  GetTicketsResponse: IGetTicketsResponse;
  Ticket: ITicket;
  GetTicketArgs: IGetTicketArgs;
  GetTicketResponse: IGetTicketResponse;
  GetEventsResponse: IGetEventsResponse;
  Event: IEvent;
  EventDate: IEventDate;
  Location: ILocation;
  GetEventResponse: IGetEventResponse;
  GetUserResponse: IGetUserResponse;
  User: IUser;
  Mutation: {};
  CreateTicketInput: ICreateTicketInput;
  CreateEventInput: ICreateEventInput;
  EventDateInput: IEventDateInput;
  LocationInput: ILocationInput;
  Boolean: Scalars["Boolean"];
};

export type IAuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IEventResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Event"]
> = {
  id?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  dates?: Resolver<
    Array<IResolversTypes["EventDate"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<IResolversTypes["Location"], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type IEventDateResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["EventDate"]
> = {
  date?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  startTime?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  endTime?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IGetEventResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetEventResponse"]
> = {
  event?: Resolver<IResolversTypes["Event"], ParentType, ContextType>;
};

export type IGetEventsResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetEventsResponse"]
> = {
  events?: Resolver<Array<IResolversTypes["Event"]>, ParentType, ContextType>;
};

export type IGetTicketResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetTicketResponse"]
> = {
  ticket?: Resolver<IResolversTypes["Ticket"], ParentType, ContextType>;
};

export type IGetTicketsResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetTicketsResponse"]
> = {
  tickets?: Resolver<Array<IResolversTypes["Ticket"]>, ParentType, ContextType>;
};

export type IGetUserResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetUserResponse"]
> = {
  user?: Resolver<Maybe<IResolversTypes["User"]>, ParentType, ContextType>;
};

export type ILocationResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Location"]
> = {
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  city?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  address?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Mutation"]
> = {
  createTicket?: Resolver<
    IResolversTypes["GetTicketResponse"],
    ParentType,
    ContextType,
    IMutationCreateTicketArgs
  >;
  createEvent?: Resolver<
    Maybe<IResolversTypes["Event"]>,
    ParentType,
    ContextType,
    IMutationCreateEventArgs
  >;
};

export type IQueryResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Query"]
> = {
  getTickets?: Resolver<
    IResolversTypes["GetTicketsResponse"],
    ParentType,
    ContextType,
    IQueryGetTicketsArgs
  >;
  getTicket?: Resolver<
    IResolversTypes["GetTicketResponse"],
    ParentType,
    ContextType,
    IQueryGetTicketArgs
  >;
  getEvents?: Resolver<
    IResolversTypes["GetEventsResponse"],
    ParentType,
    ContextType
  >;
  getEvent?: Resolver<
    IResolversTypes["GetEventResponse"],
    ParentType,
    ContextType,
    IQueryGetEventArgs
  >;
  getUser?: Resolver<
    Maybe<IResolversTypes["GetUserResponse"]>,
    ParentType,
    ContextType,
    IQueryGetUserArgs
  >;
};

export type ITicketResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Ticket"]
> = {
  eventId?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  userId?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  price?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  date?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  soldAt?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
};

export type IUserResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["User"]
> = {
  id?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type IResolvers<ContextType = any> = {
  Event?: IEventResolvers<ContextType>;
  EventDate?: IEventDateResolvers<ContextType>;
  GetEventResponse?: IGetEventResponseResolvers<ContextType>;
  GetEventsResponse?: IGetEventsResponseResolvers<ContextType>;
  GetTicketResponse?: IGetTicketResponseResolvers<ContextType>;
  GetTicketsResponse?: IGetTicketsResponseResolvers<ContextType>;
  GetUserResponse?: IGetUserResponseResolvers<ContextType>;
  Location?: ILocationResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Ticket?: ITicketResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};

export type IDirectiveResolvers<ContextType = any> = {
  authenticated?: IAuthenticatedDirectiveResolver<any, any, ContextType>;
};
