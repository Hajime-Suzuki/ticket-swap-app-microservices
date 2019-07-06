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

export enum ICacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type ICreateUserInput = {
  userName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutation = {
  __typename?: "Mutation";
  createUser?: Maybe<IUser>;
};

export type IMutationCreateUserArgs = {
  data?: Maybe<ICreateUserInput>;
};

export type IQuery = {
  __typename?: "Query";
  user?: Maybe<IUser>;
  events?: Maybe<Scalars["String"]>;
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
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserInput: ICreateUserInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CacheControlScope: ICacheControlScope;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  User: IUser;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Mutation: {};
  CreateUserInput: ICreateUserInput;
  Boolean: Scalars["Boolean"];
  CacheControlScope: ICacheControlScope;
  Int: Scalars["Int"];
};

export type ICacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars["Int"]>>;
    scope?: Maybe<Maybe<ICacheControlScope>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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
};

export type IQueryResolvers<
  ContextType = any,
  ParentType = IResolversParentTypes["Query"]
> = {
  user?: Resolver<Maybe<IResolversTypes["User"]>, ParentType, ContextType>;
  events?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
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
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};

export type IDirectiveResolvers<ContextType = any> = {
  cacheControl?: ICacheControlDirectiveResolver<any, any, ContextType>;
};
