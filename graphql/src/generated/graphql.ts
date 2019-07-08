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
  user: Scalars["ID"];
  price: Scalars["String"];
};

export type ICreateUserInput = {
  userName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IGetTicketResponse = {
  __typename?: "GetTicketResponse";
  ticket?: Maybe<ITicket>;
};

export type IMutation = {
  __typename?: "Mutation";
  createUser?: Maybe<IUser>;
  createTicket?: Maybe<ITicket>;
};

export type IMutationCreateUserArgs = {
  data?: Maybe<ICreateUserInput>;
};

export type IMutationCreateTicketArgs = {
  data?: Maybe<ICreateTicketInput>;
};

export type IQuery = {
  __typename?: "Query";
  user?: Maybe<IUser>;
  events?: Maybe<Scalars["String"]>;
  getTicket?: Maybe<IGetTicketResponse>;
};

export type IQueryGetTicketArgs = {
  id: Scalars["ID"];
};

export type ITicket = {
  __typename?: "Ticket";
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
  price: Scalars["String"];
  soldAt?: Maybe<Scalars["Int"]>;
  createdAt: Scalars["Int"];
};

export type IUser = {
  __typename?: "User";
  id: Scalars["ID"];
  userName: Scalars["String"];
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
  User: ResolverTypeWrapper<IUser>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  GetTicketResponse: ResolverTypeWrapper<IGetTicketResponse>;
  Ticket: ResolverTypeWrapper<ITicket>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserInput: ICreateUserInput;
  CreateTicketInput: ICreateTicketInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  User: IUser;
  ID: Scalars["ID"];
  String: Scalars["String"];
  GetTicketResponse: IGetTicketResponse;
  Ticket: ITicket;
  Int: Scalars["Int"];
  Mutation: {};
  CreateUserInput: ICreateUserInput;
  CreateTicketInput: ICreateTicketInput;
  Boolean: Scalars["Boolean"];
};

export type IGetTicketResponseResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["GetTicketResponse"]
> = {
  ticket?: Resolver<Maybe<IResolversTypes["Ticket"]>, ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Mutation"]
> = {
  createUser?: Resolver<
    Maybe<IResolversTypes["User"]>,
    ParentType,
    ContextType,
    IMutationCreateUserArgs
  >;
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
  user?: Resolver<Maybe<IResolversTypes["User"]>, ParentType, ContextType>;
  events?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  getTicket?: Resolver<
    Maybe<IResolversTypes["GetTicketResponse"]>,
    ParentType,
    ContextType,
    IQueryGetTicketArgs
  >;
};

export type ITicketResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Ticket"]
> = {
  eventId?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  userId?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  price?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  soldAt?: Resolver<Maybe<IResolversTypes["Int"]>, ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IUserResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["User"]
> = {
  id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  userName?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  GetTicketResponse?: IGetTicketResponseResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Ticket?: ITicketResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};
