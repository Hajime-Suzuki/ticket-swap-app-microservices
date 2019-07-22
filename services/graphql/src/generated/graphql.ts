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

export type ICreateTicketInput = {
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  price: Scalars["String"];
};

export type IGetTicketResponse = {
  __typename?: "GetTicketResponse";
  ticket?: Maybe<ITicket>;
};

export type IGetUserResponse = {
  __typename?: "GetUserResponse";
  user?: Maybe<IUser>;
};

export type IMutation = {
  __typename?: "Mutation";
  createTicket?: Maybe<ITicket>;
};

export type IMutationCreateTicketArgs = {
  data?: Maybe<ICreateTicketInput>;
};

export type IQuery = {
  __typename?: "Query";
  getTicket?: Maybe<IGetTicketResponse>;
  events?: Maybe<Scalars["String"]>;
  getUser?: Maybe<IGetUserResponse>;
};

export type IQueryGetTicketArgs = {
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
};

export type IQueryGetUserArgs = {
  id: Scalars["String"];
};

export type ITicket = {
  __typename?: "Ticket";
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  price: Scalars["String"];
  createdAt: Scalars["String"];
  soldAt?: Maybe<Scalars["String"]>;
};

export type IUser = {
  __typename?: "User";
  /** id is sub from cognito */
  id?: Maybe<Scalars["ID"]>;
  /** email is hash key of DynamoDB */
  email: Scalars["String"];
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
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  GetTicketResponse: ResolverTypeWrapper<IGetTicketResponse>;
  Ticket: ResolverTypeWrapper<ITicket>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  GetUserResponse: ResolverTypeWrapper<IGetUserResponse>;
  User: ResolverTypeWrapper<IUser>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateTicketInput: ICreateTicketInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  ID: Scalars["ID"];
  GetTicketResponse: IGetTicketResponse;
  Ticket: ITicket;
  String: Scalars["String"];
  GetUserResponse: IGetUserResponse;
  User: IUser;
  Mutation: {};
  CreateTicketInput: ICreateTicketInput;
  Boolean: Scalars["Boolean"];
};

export type IAuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IGetTicketResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetTicketResponse"]
> = {
  ticket?: Resolver<Maybe<IResolversTypes["Ticket"]>, ParentType, ContextType>;
};

export type IGetUserResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetUserResponse"]
> = {
  user?: Resolver<Maybe<IResolversTypes["User"]>, ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Mutation"]
> = {
  createTicket?: Resolver<
    Maybe<IResolversTypes["Ticket"]>,
    ParentType,
    ContextType,
    IMutationCreateTicketArgs
  >;
};

export type IQueryResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Query"]
> = {
  getTicket?: Resolver<
    Maybe<IResolversTypes["GetTicketResponse"]>,
    ParentType,
    ContextType,
    IQueryGetTicketArgs
  >;
  events?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
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
  price?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  soldAt?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
};

export type IUserResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["User"]
> = {
  id?: Resolver<Maybe<IResolversTypes["ID"]>, ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  GetTicketResponse?: IGetTicketResponseResolvers<ContextType>;
  GetUserResponse?: IGetUserResponseResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Ticket?: ITicketResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};

export type IDirectiveResolvers<ContextType = any> = {
  authenticated?: IAuthenticatedDirectiveResolver<any, any, ContextType>;
};
