import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Context } from "./context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Byte: any;
  Currency: any;
  DID: any;
  Date: Date;
  DateTime: any;
  Duration: any;
  EmailAddress: string;
  GUID: string;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  SafeInt: any;
  Time: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

/**  Required to enable Apollo Cache Control  */
export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

/** Base type for all models in mongo. */
export type MongoBase = {
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** The ID of the object. */
  id: Scalars["ObjectID"];
  schemaVersion?: Maybe<Scalars["String"]>;
  /** Automatically generated timestamp, updated on every save. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type Mutation = {
  __typename?: "Mutation";
  /** IGNORE: Dummy field necessary for the Mutation type to be valid */
  _empty?: Maybe<Scalars["String"]>;
  createUser?: Maybe<User>;
  /** Allows the user to update their profile */
  updateUser?: Maybe<User>;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type Query = {
  __typename?: "Query";
  /** IGNORE: Dummy field necessary for the Query type to be valid */
  _empty?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type User = MongoBase & {
  __typename?: "User";
  createdAt?: Maybe<Scalars["DateTime"]>;
  email?: Maybe<Scalars["EmailAddress"]>;
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ObjectID"];
  lastName?: Maybe<Scalars["String"]>;
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id: Scalars["ObjectID"];
  lastName?: InputMaybe<Scalars["String"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

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
export type ResolversTypes = ResolversObject<{
  BigInt: ResolverTypeWrapper<Scalars["BigInt"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Byte: ResolverTypeWrapper<Scalars["Byte"]>;
  CacheControlScope: CacheControlScope;
  Currency: ResolverTypeWrapper<Scalars["Currency"]>;
  DID: ResolverTypeWrapper<Scalars["DID"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Duration: ResolverTypeWrapper<Scalars["Duration"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  GUID: ResolverTypeWrapper<Scalars["GUID"]>;
  HSL: ResolverTypeWrapper<Scalars["HSL"]>;
  HSLA: ResolverTypeWrapper<Scalars["HSLA"]>;
  HexColorCode: ResolverTypeWrapper<Scalars["HexColorCode"]>;
  Hexadecimal: ResolverTypeWrapper<Scalars["Hexadecimal"]>;
  IBAN: ResolverTypeWrapper<Scalars["IBAN"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  IPv4: ResolverTypeWrapper<Scalars["IPv4"]>;
  IPv6: ResolverTypeWrapper<Scalars["IPv6"]>;
  ISBN: ResolverTypeWrapper<Scalars["ISBN"]>;
  ISO8601Duration: ResolverTypeWrapper<Scalars["ISO8601Duration"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  JWT: ResolverTypeWrapper<Scalars["JWT"]>;
  Latitude: ResolverTypeWrapper<Scalars["Latitude"]>;
  LocalDate: ResolverTypeWrapper<Scalars["LocalDate"]>;
  LocalEndTime: ResolverTypeWrapper<Scalars["LocalEndTime"]>;
  LocalTime: ResolverTypeWrapper<Scalars["LocalTime"]>;
  Long: ResolverTypeWrapper<Scalars["Long"]>;
  Longitude: ResolverTypeWrapper<Scalars["Longitude"]>;
  MAC: ResolverTypeWrapper<Scalars["MAC"]>;
  MongoBase: ResolversTypes["User"];
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars["NegativeFloat"]>;
  NegativeInt: ResolverTypeWrapper<Scalars["NegativeInt"]>;
  NonEmptyString: ResolverTypeWrapper<Scalars["NonEmptyString"]>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars["NonNegativeFloat"]>;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars["NonPositiveFloat"]>;
  NonPositiveInt: ResolverTypeWrapper<Scalars["NonPositiveInt"]>;
  ObjectID: ResolverTypeWrapper<Scalars["ObjectID"]>;
  PhoneNumber: ResolverTypeWrapper<Scalars["PhoneNumber"]>;
  Port: ResolverTypeWrapper<Scalars["Port"]>;
  PositiveFloat: ResolverTypeWrapper<Scalars["PositiveFloat"]>;
  PositiveInt: ResolverTypeWrapper<Scalars["PositiveInt"]>;
  PostalCode: ResolverTypeWrapper<Scalars["PostalCode"]>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars["RGB"]>;
  RGBA: ResolverTypeWrapper<Scalars["RGBA"]>;
  SafeInt: ResolverTypeWrapper<Scalars["SafeInt"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Time: ResolverTypeWrapper<Scalars["Time"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  USCurrency: ResolverTypeWrapper<Scalars["USCurrency"]>;
  UUID: ResolverTypeWrapper<Scalars["UUID"]>;
  UnsignedFloat: ResolverTypeWrapper<Scalars["UnsignedFloat"]>;
  UnsignedInt: ResolverTypeWrapper<Scalars["UnsignedInt"]>;
  User: ResolverTypeWrapper<User>;
  UserUpdateInput: UserUpdateInput;
  UtcOffset: ResolverTypeWrapper<Scalars["UtcOffset"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigInt: Scalars["BigInt"];
  Boolean: Scalars["Boolean"];
  Byte: Scalars["Byte"];
  Currency: Scalars["Currency"];
  DID: Scalars["DID"];
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  Duration: Scalars["Duration"];
  EmailAddress: Scalars["EmailAddress"];
  GUID: Scalars["GUID"];
  HSL: Scalars["HSL"];
  HSLA: Scalars["HSLA"];
  HexColorCode: Scalars["HexColorCode"];
  Hexadecimal: Scalars["Hexadecimal"];
  IBAN: Scalars["IBAN"];
  ID: Scalars["ID"];
  IPv4: Scalars["IPv4"];
  IPv6: Scalars["IPv6"];
  ISBN: Scalars["ISBN"];
  ISO8601Duration: Scalars["ISO8601Duration"];
  Int: Scalars["Int"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  JWT: Scalars["JWT"];
  Latitude: Scalars["Latitude"];
  LocalDate: Scalars["LocalDate"];
  LocalEndTime: Scalars["LocalEndTime"];
  LocalTime: Scalars["LocalTime"];
  Long: Scalars["Long"];
  Longitude: Scalars["Longitude"];
  MAC: Scalars["MAC"];
  MongoBase: ResolversParentTypes["User"];
  Mutation: {};
  NegativeFloat: Scalars["NegativeFloat"];
  NegativeInt: Scalars["NegativeInt"];
  NonEmptyString: Scalars["NonEmptyString"];
  NonNegativeFloat: Scalars["NonNegativeFloat"];
  NonNegativeInt: Scalars["NonNegativeInt"];
  NonPositiveFloat: Scalars["NonPositiveFloat"];
  NonPositiveInt: Scalars["NonPositiveInt"];
  ObjectID: Scalars["ObjectID"];
  PhoneNumber: Scalars["PhoneNumber"];
  Port: Scalars["Port"];
  PositiveFloat: Scalars["PositiveFloat"];
  PositiveInt: Scalars["PositiveInt"];
  PostalCode: Scalars["PostalCode"];
  Query: {};
  RGB: Scalars["RGB"];
  RGBA: Scalars["RGBA"];
  SafeInt: Scalars["SafeInt"];
  String: Scalars["String"];
  Time: Scalars["Time"];
  Timestamp: Scalars["Timestamp"];
  URL: Scalars["URL"];
  USCurrency: Scalars["USCurrency"];
  UUID: Scalars["UUID"];
  UnsignedFloat: Scalars["UnsignedFloat"];
  UnsignedInt: Scalars["UnsignedInt"];
  User: User;
  UserUpdateInput: UserUpdateInput;
  UtcOffset: Scalars["UtcOffset"];
  Void: Scalars["Void"];
}>;

export type CacheControl22DirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars["Boolean"]>;
  maxAge?: Maybe<Scalars["Int"]>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControl22DirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = CacheControl22DirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export interface ByteScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Byte"], any> {
  name: "Byte";
}

export interface CurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Currency"], any> {
  name: "Currency";
}

export interface DidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DID"], any> {
  name: "DID";
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface DurationScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Duration"], any> {
  name: "Duration";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export interface GuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["GUID"], any> {
  name: "GUID";
}

export interface HslScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HSL"], any> {
  name: "HSL";
}

export interface HslaScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HSLA"], any> {
  name: "HSLA";
}

export interface HexColorCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HexColorCode"], any> {
  name: "HexColorCode";
}

export interface HexadecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Hexadecimal"], any> {
  name: "Hexadecimal";
}

export interface IbanScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IBAN"], any> {
  name: "IBAN";
}

export interface IPv4ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IPv4"], any> {
  name: "IPv4";
}

export interface IPv6ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IPv6"], any> {
  name: "IPv6";
}

export interface IsbnScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ISBN"], any> {
  name: "ISBN";
}

export interface Iso8601DurationScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ISO8601Duration"], any> {
  name: "ISO8601Duration";
}

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export interface JwtScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JWT"], any> {
  name: "JWT";
}

export interface LatitudeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Latitude"], any> {
  name: "Latitude";
}

export interface LocalDateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalDate"], any> {
  name: "LocalDate";
}

export interface LocalEndTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalEndTime"], any> {
  name: "LocalEndTime";
}

export interface LocalTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalTime"], any> {
  name: "LocalTime";
}

export interface LongScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Long"], any> {
  name: "Long";
}

export interface LongitudeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Longitude"], any> {
  name: "Longitude";
}

export interface MacScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["MAC"], any> {
  name: "MAC";
}

export type MongoBaseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["MongoBase"] = ResolversParentTypes["MongoBase"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"User", ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ObjectID"], ParentType, ContextType>;
  schemaVersion?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
}>;

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
}>;

export interface NegativeFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NegativeFloat"], any> {
  name: "NegativeFloat";
}

export interface NegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NegativeInt"], any> {
  name: "NegativeInt";
}

export interface NonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonEmptyString"], any> {
  name: "NonEmptyString";
}

export interface NonNegativeFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeFloat"], any> {
  name: "NonNegativeFloat";
}

export interface NonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeInt"], any> {
  name: "NonNegativeInt";
}

export interface NonPositiveFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonPositiveFloat"], any> {
  name: "NonPositiveFloat";
}

export interface NonPositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonPositiveInt"], any> {
  name: "NonPositiveInt";
}

export interface ObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ObjectID"], any> {
  name: "ObjectID";
}

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PhoneNumber"], any> {
  name: "PhoneNumber";
}

export interface PortScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Port"], any> {
  name: "Port";
}

export interface PositiveFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PositiveFloat"], any> {
  name: "PositiveFloat";
}

export interface PositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PositiveInt"], any> {
  name: "PositiveInt";
}

export interface PostalCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PostalCode"], any> {
  name: "PostalCode";
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
}>;

export interface RgbScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RGB"], any> {
  name: "RGB";
}

export interface RgbaScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RGBA"], any> {
  name: "RGBA";
}

export interface SafeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["SafeInt"], any> {
  name: "SafeInt";
}

export interface TimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
  name: "Time";
}

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export interface UsCurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["USCurrency"], any> {
  name: "USCurrency";
}

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UUID"], any> {
  name: "UUID";
}

export interface UnsignedFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedFloat"], any> {
  name: "UnsignedFloat";
}

export interface UnsignedIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedInt"], any> {
  name: "UnsignedInt";
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  createdAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<
    Maybe<ResolversTypes["EmailAddress"]>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ObjectID"], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  schemaVersion?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UtcOffsetScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UtcOffset"], any> {
  name: "UtcOffset";
}

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  MongoBase?: MongoBaseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  cacheControl22?: CacheControl22DirectiveResolver<any, any, ContextType>;
}>;
