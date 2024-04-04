import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphqlContext } from '../../graphql-context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: Date;
  DateTime: any;
  DateTimeISO: any;
  DeweyDecimal: any;
  Duration: any;
  EmailAddress: string;
  GUID: string;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IP: any;
  IPCPatent: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  LCCSubclass: any;
  Latitude: any;
  LocalDate: any;
  LocalDateTime: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
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
  RoutingNumber: any;
  SafeInt: any;
  SemVer: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

export type AdditionalAmenities = MongoSubdocument & {
  __typename?: 'AdditionalAmenities';
  amenities?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AdditionalAmenitiesFilterInput = {
  amenities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ObjectID']>;
};

export type AdditionalAmenitiesInput = {
  amenities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ObjectID']>;
};

export type AdditionalAmenitiesSearchResult = {
  __typename?: 'AdditionalAmenitiesSearchResult';
  amenities?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryCodeISO3?: Maybe<Scalars['String']>;
  countrySecondarySubdivision?: Maybe<Scalars['String']>;
  countrySubdivision?: Maybe<Scalars['String']>;
  countrySubdivisionName?: Maybe<Scalars['String']>;
  countryTertiarySubdivision?: Maybe<Scalars['String']>;
  crossStreet?: Maybe<Scalars['String']>;
  extendedPostalCode?: Maybe<Scalars['String']>;
  freeformAddress?: Maybe<Scalars['String']>;
  localName?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  municipalitySubdivision?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  routeNumbers?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
  streetNameAndNumber?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  country: Scalars['String'];
  countryCode: Scalars['String'];
  countryCodeISO3: Scalars['String'];
  countrySecondarySubdivision: Scalars['String'];
  countrySubdivision: Scalars['String'];
  countrySubdivisionName: Scalars['String'];
  countryTertiarySubdivision: Scalars['String'];
  crossStreet: Scalars['String'];
  extendedPostalCode: Scalars['String'];
  freeformAddress: Scalars['String'];
  localName: Scalars['String'];
  municipality: Scalars['String'];
  municipalitySubdivision: Scalars['String'];
  postalCode: Scalars['String'];
  routeNumbers: Scalars['String'];
  streetName: Scalars['String'];
  streetNameAndNumber: Scalars['String'];
  streetNumber: Scalars['String'];
};

export type BedroomDetails = MongoSubdocument & {
  __typename?: 'BedroomDetails';
  bedDescriptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  roomName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BedroomDetailsInput = {
  bedDescriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ObjectID']>;
  roomName?: InputMaybe<Scalars['String']>;
};

export type BlobAuthHeader = {
  __typename?: 'BlobAuthHeader';
  authHeader?: Maybe<Scalars['String']>;
  blobName?: Maybe<Scalars['String']>;
  blobPath?: Maybe<Scalars['String']>;
  indexTags?: Maybe<Array<Maybe<BlobIndexTag>>>;
  metadataFields?: Maybe<Array<Maybe<BlobMetadataField>>>;
  requestDate?: Maybe<Scalars['String']>;
};

export type BlobIndexTag = {
  __typename?: 'BlobIndexTag';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type BlobMetadataField = {
  __typename?: 'BlobMetadataField';
  name: Scalars['String'];
  value: Scalars['String'];
};

/**  Required to enable Apollo Cache Control  */
export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Community = MongoBase & {
  __typename?: 'Community';
  createdAt?: Maybe<Scalars['DateTime']>;
  domain?: Maybe<Scalars['String']>;
  domainStatus?: Maybe<CommunityDomainResult>;
  files?: Maybe<Array<Maybe<FileInfo>>>;
  filesByType?: Maybe<Array<Maybe<FileInfo>>>;
  handle?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  name?: Maybe<Scalars['String']>;
  publicContentBlobUrl?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userIsAdmin?: Maybe<Scalars['Boolean']>;
  whiteLabelDomain?: Maybe<Scalars['String']>;
};

export type CommunityFilesByTypeArgs = {
  type: Scalars['String'];
};

export type CommunityBlobContentAuthHeaderResult = {
  __typename?: 'CommunityBlobContentAuthHeaderResult';
  authHeader?: Maybe<BlobAuthHeader>;
  community?: Maybe<Community>;
  status: MutationStatus;
};

export type CommunityBlobContentInput = {
  communityId: Scalars['ObjectID'];
  contentLength: Scalars['Int'];
  contentType: Scalars['String'];
};

export type CommunityBlobFileInput = {
  communityId: Scalars['ObjectID'];
  contentLength: Scalars['Int'];
  contentType: Scalars['String'];
  fileName: Scalars['String'];
};

export type CommunityCreateInput = {
  name: Scalars['String'];
};

export type CommunityDomainResult = {
  __typename?: 'CommunityDomainResult';
  verification?: Maybe<Array<Maybe<CommunityDomainVerificationDetail>>>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type CommunityDomainVerificationDetail = {
  __typename?: 'CommunityDomainVerificationDetail';
  domain?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CommunityMutationResult = MutationResult & {
  __typename?: 'CommunityMutationResult';
  community?: Maybe<Community>;
  status: MutationStatus;
};

export type CommunityPermissions = {
  __typename?: 'CommunityPermissions';
  canEditOwnMemberAccounts: Scalars['Boolean'];
  canEditOwnMemberProfile: Scalars['Boolean'];
  canManageCommunitySettings: Scalars['Boolean'];
  canManageMembers: Scalars['Boolean'];
  canManageRolesAndPermissions: Scalars['Boolean'];
  canManageSiteContent: Scalars['Boolean'];
};

export type CommunityPermissionsInput = {
  canEditOwnMemberAccounts: Scalars['Boolean'];
  canEditOwnMemberProfile: Scalars['Boolean'];
  canManageCommunitySettings: Scalars['Boolean'];
  canManageMembers: Scalars['Boolean'];
  canManageRolesAndPermissions: Scalars['Boolean'];
  canManageSiteContent: Scalars['Boolean'];
};

export type CommunityPublicFileRemoveInput = {
  communityId: Scalars['ObjectID'];
  fileName: Scalars['String'];
};

export type CommunityUpdateInput = {
  domain?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  whiteLabelDomain?: InputMaybe<Scalars['String']>;
};

export type CurrentUser = MongoBase & {
  __typename?: 'CurrentUser';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['EmailAddress']>;
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  lastName?: Maybe<Scalars['String']>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomView = MongoSubdocument & {
  __typename?: 'CustomView';
  columnsToDisplay?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  filters?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ObjectID'];
  name?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomViewInput = {
  columnsToDisplay?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ObjectID']>;
  name?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FacetDetail = {
  __typename?: 'FacetDetail';
  count?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type FileInfo = {
  __typename?: 'FileInfo';
  name: Scalars['String'];
  size: Scalars['Int'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type FilterDetail = {
  communityId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  distance?: InputMaybe<Scalars['Float']>;
  listedInfo?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  listingDetail?: InputMaybe<ListingDetailsFilterInput>;
  position?: InputMaybe<GeographyPointInput>;
  propertyType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updatedAt?: InputMaybe<Scalars['String']>;
};

export type GeographyPoint = {
  __typename?: 'GeographyPoint';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type GeographyPointInput = {
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
};

export type ListingDetails = {
  __typename?: 'ListingDetails';
  additionalAmenities?: Maybe<Array<Maybe<AdditionalAmenities>>>;
  amenities?: Maybe<Array<Maybe<Scalars['String']>>>;
  bathrooms?: Maybe<Scalars['Float']>;
  bedroomDetails?: Maybe<Array<Maybe<BedroomDetails>>>;
  bedrooms?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  floorPlan?: Maybe<Scalars['String']>;
  floorPlanImages?: Maybe<Array<Maybe<Scalars['String']>>>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  lease?: Maybe<Scalars['Float']>;
  listingAgent?: Maybe<Scalars['String']>;
  listingAgentCompany?: Maybe<Scalars['String']>;
  listingAgentCompanyAddress?: Maybe<Scalars['String']>;
  listingAgentCompanyEmail?: Maybe<Scalars['String']>;
  listingAgentCompanyPhone?: Maybe<Scalars['String']>;
  listingAgentCompanyWebsite?: Maybe<Scalars['String']>;
  listingAgentEmail?: Maybe<Scalars['String']>;
  listingAgentPhone?: Maybe<Scalars['String']>;
  listingAgentWebsite?: Maybe<Scalars['String']>;
  maxGuests?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Float']>;
  rentHigh?: Maybe<Scalars['Float']>;
  rentLow?: Maybe<Scalars['Float']>;
  squareFeet?: Maybe<Scalars['Int']>;
  video?: Maybe<Scalars['String']>;
};

export type ListingDetailsFilterInput = {
  additionalAmenities?: InputMaybe<Array<InputMaybe<AdditionalAmenitiesFilterInput>>>;
  amenities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  bathrooms?: InputMaybe<Scalars['Float']>;
  bedrooms?: InputMaybe<Scalars['Int']>;
  prices?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  squareFeets?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type ListingDetailsInput = {
  additionalAmenities?: InputMaybe<Array<InputMaybe<AdditionalAmenitiesInput>>>;
  amenities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  bathrooms?: InputMaybe<Scalars['Float']>;
  bedroomDetails?: InputMaybe<Array<InputMaybe<BedroomDetailsInput>>>;
  bedrooms?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  floorPlan?: InputMaybe<Scalars['String']>;
  floorPlanImages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lease?: InputMaybe<Scalars['Float']>;
  listingAgent?: InputMaybe<Scalars['String']>;
  listingAgentCompany?: InputMaybe<Scalars['String']>;
  listingAgentCompanyAddress?: InputMaybe<Scalars['String']>;
  listingAgentCompanyEmail?: InputMaybe<Scalars['String']>;
  listingAgentCompanyPhone?: InputMaybe<Scalars['String']>;
  listingAgentCompanyWebsite?: InputMaybe<Scalars['String']>;
  listingAgentEmail?: InputMaybe<Scalars['String']>;
  listingAgentPhone?: InputMaybe<Scalars['String']>;
  listingAgentWebsite?: InputMaybe<Scalars['String']>;
  maxGuests?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Float']>;
  rentHigh?: InputMaybe<Scalars['Float']>;
  rentLow?: InputMaybe<Scalars['Float']>;
  squareFeet?: InputMaybe<Scalars['Int']>;
  video?: InputMaybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Address>;
  position?: Maybe<Point>;
};

export type LocationInput = {
  address?: InputMaybe<AddressInput>;
  position?: InputMaybe<PointInput>;
};

export type Member = MongoBase & {
  __typename?: 'Member';
  accounts?: Maybe<Array<Maybe<MemberAccount>>>;
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars['DateTime']>;
  customViews?: Maybe<Array<Maybe<CustomView>>>;
  id: Scalars['ObjectID'];
  memberName?: Maybe<Scalars['String']>;
  profile?: Maybe<MemberProfile>;
  role?: Maybe<Role>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MemberAccount = MongoSubdocument & {
  __typename?: 'MemberAccount';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  firstName: Scalars['String'];
  id: Scalars['ObjectID'];
  lastName?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type MemberAccountAddInput = {
  account: MemberAccountCreateInput;
  memberId: Scalars['ObjectID'];
};

export type MemberAccountCreateInput = {
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  user: Scalars['ObjectID'];
};

export type MemberAccountEditInput = {
  accountId: Scalars['ObjectID'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  memberId: Scalars['ObjectID'];
};

export type MemberAccountRemoveInput = {
  accountId: Scalars['ObjectID'];
  memberId: Scalars['ObjectID'];
};

export type MemberAvatarImageAuthHeaderResult = {
  __typename?: 'MemberAvatarImageAuthHeaderResult';
  authHeader?: Maybe<BlobAuthHeader>;
  member?: Maybe<Member>;
  status: MutationStatus;
};

export type MemberAvatarImageInput = {
  contentLength?: InputMaybe<Scalars['Int']>;
  contentType?: InputMaybe<Scalars['String']>;
  fileName: Scalars['String'];
  memberId: Scalars['ObjectID'];
};

export type MemberCreateInput = {
  memberName: Scalars['String'];
};

export type MemberMutationResult = MutationResult & {
  __typename?: 'MemberMutationResult';
  member?: Maybe<Member>;
  status: MutationStatus;
};

export type MemberProfile = {
  __typename?: 'MemberProfile';
  avatarDocumentId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  interests?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  showEmail?: Maybe<Scalars['Boolean']>;
  showInterests?: Maybe<Scalars['Boolean']>;
  showLocation?: Maybe<Scalars['Boolean']>;
  showProfile?: Maybe<Scalars['Boolean']>;
  showProperties?: Maybe<Scalars['Boolean']>;
};

export type MemberProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  interests?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  showEmail?: InputMaybe<Scalars['Boolean']>;
  showInterests?: InputMaybe<Scalars['Boolean']>;
  showLocation?: InputMaybe<Scalars['Boolean']>;
  showProfile?: InputMaybe<Scalars['Boolean']>;
  showProperties?: InputMaybe<Scalars['Boolean']>;
};

export type MemberProfileUpdateInput = {
  memberId: Scalars['ObjectID'];
  profile?: InputMaybe<MemberProfileInput>;
};

export type MemberUpdateInput = {
  customViews?: InputMaybe<Array<InputMaybe<CustomViewInput>>>;
  id: Scalars['ObjectID'];
  memberName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ObjectID']>;
};

/** Base type for all models in mongo. */
export type MongoBase = {
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ObjectID'];
  schemaVersion?: Maybe<Scalars['String']>;
  /** Automatically generated timestamp, updated on every save. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Base type for all models in mongo. */
export type MongoSubdocument = {
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ObjectID'];
  /** Automatically generated timestamp, updated on every save. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type Mutation = {
  __typename?: 'Mutation';
  /** IGNORE: Dummy field necessary for the Mutation type to be valid */
  _empty?: Maybe<Scalars['String']>;
  communityCreate?: Maybe<CommunityMutationResult>;
  communityPublicContentCreateAuthHeader: CommunityBlobContentAuthHeaderResult;
  communityPublicFileCreateAuthHeader: CommunityBlobContentAuthHeaderResult;
  communityPublicFileRemove: CommunityMutationResult;
  communityUpdate: CommunityMutationResult;
  memberAccountAdd: MemberMutationResult;
  memberAccountEdit: MemberMutationResult;
  memberAccountRemove: MemberMutationResult;
  memberCreate: MemberMutationResult;
  memberProfileAvatarCreateAuthHeader: MemberAvatarImageAuthHeaderResult;
  memberProfileAvatarRemove: MemberMutationResult;
  memberProfileUpdate: MemberMutationResult;
  memberUpdate: MemberMutationResult;
  propertyAdd: PropertyMutationResult;
  propertyAssignOwner: PropertyMutationResult;
  propertyDelete: PropertyMutationResult;
  propertyFloorPlanImageCreateAuthHeader: PropertyBlobFileAuthHeaderResult;
  propertyListingImageCreateAuthHeader: PropertyBlobFileAuthHeaderResult;
  propertyListingImageRemove: PropertyMutationResult;
  propertyRemoveOwner: PropertyMutationResult;
  propertyUpdate: PropertyMutationResult;
  roleAdd: RoleMutationResult;
  roleDeleteAndReassign: RoleMutationResult;
  roleUpdate: RoleMutationResult;
  serviceCreate: ServiceMutationResult;
  serviceTicketAddPhoto: ServiceTicketPhotoAuthHeaderResult;
  serviceTicketAddUpdateActivity: ServiceTicketMutationResult;
  serviceTicketAssign: ServiceTicketMutationResult;
  serviceTicketChangeStatus: ServiceTicketMutationResult;
  serviceTicketCreate: ServiceTicketMutationResult;
  serviceTicketDelete: ServiceTicketMutationResult;
  serviceTicketRemovePhoto: ServiceTicketMutationResult;
  serviceTicketSubmit: ServiceTicketMutationResult;
  serviceTicketUpdate: ServiceTicketMutationResult;
  serviceUpdate: ServiceMutationResult;
  userCreate: UserMutationResult;
  /** Allows the user to update their profile */
  userUpdate: UserMutationResult;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationCommunityCreateArgs = {
  input: CommunityCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationCommunityPublicContentCreateAuthHeaderArgs = {
  input: CommunityBlobContentInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationCommunityPublicFileCreateAuthHeaderArgs = {
  input: CommunityBlobFileInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationCommunityPublicFileRemoveArgs = {
  input: CommunityPublicFileRemoveInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationCommunityUpdateArgs = {
  input: CommunityUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberAccountAddArgs = {
  input: MemberAccountAddInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberAccountEditArgs = {
  input: MemberAccountEditInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberAccountRemoveArgs = {
  input: MemberAccountRemoveInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberCreateArgs = {
  input: MemberCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberProfileAvatarCreateAuthHeaderArgs = {
  input: MemberAvatarImageInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberProfileAvatarRemoveArgs = {
  memberId: Scalars['ObjectID'];
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberProfileUpdateArgs = {
  input: MemberProfileUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberUpdateArgs = {
  input: MemberUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyAddArgs = {
  input: PropertyAddInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyAssignOwnerArgs = {
  input: PropertyAssignOwnerInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyDeleteArgs = {
  input: PropertyDeleteInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyFloorPlanImageCreateAuthHeaderArgs = {
  input: PropertyBlobFileInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyListingImageCreateAuthHeaderArgs = {
  input: PropertyBlobFileInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyListingImageRemoveArgs = {
  input: PropertyRemoveImageInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyRemoveOwnerArgs = {
  input: PropertyRemoveOwnerInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationPropertyUpdateArgs = {
  input: PropertyUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationRoleAddArgs = {
  input: RoleAddInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationRoleDeleteAndReassignArgs = {
  input: RoleDeleteAndReassignInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationRoleUpdateArgs = {
  input: RoleUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceCreateArgs = {
  input: ServiceCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketAddPhotoArgs = {
  input: ServiceTicketAddPhotoInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketAddUpdateActivityArgs = {
  input: ServiceTicketAddUpdateActivityInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketAssignArgs = {
  input: ServiceTicketAssignInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketChangeStatusArgs = {
  input: ServiceTicketChangeStatusInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketCreateArgs = {
  input: ServiceTicketCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketDeleteArgs = {
  input: ServiceTicketDeleteInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketRemovePhotoArgs = {
  input: ServiceTicketRemovePhotoInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketSubmitArgs = {
  input: ServiceTicketSubmitInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceTicketUpdateArgs = {
  input: ServiceTicketUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationServiceUpdateArgs = {
  input: ServiceUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};

export type MutationResult = {
  status: MutationStatus;
};

export type MutationStatus = {
  __typename?: 'MutationStatus';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PermissionsInput = {
  communityPermissions: CommunityPermissionsInput;
  propertyPermissions: PropertyPermissionsInput;
  serviceTicketPermissions: ServiceTicketPermissionsInput;
};

export type Point = {
  __typename?: 'Point';
  coordinates?: Maybe<Array<Maybe<Scalars['Float']>>>;
  type?: Maybe<Scalars['String']>;
};

export type PointInput = {
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type PropertiesSearchInput = {
  options?: InputMaybe<PropertiesSearchOptions>;
  searchString?: InputMaybe<Scalars['String']>;
};

export type PropertiesSearchOptions = {
  facets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  filter?: InputMaybe<FilterDetail>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skip?: InputMaybe<Scalars['Int']>;
  top?: InputMaybe<Scalars['Int']>;
};

export type Property = MongoBase & {
  __typename?: 'Property';
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  listedForLease: Scalars['Boolean'];
  listedForRent: Scalars['Boolean'];
  listedForSale: Scalars['Boolean'];
  listedInDirectory: Scalars['Boolean'];
  listingDetail?: Maybe<ListingDetails>;
  location?: Maybe<Location>;
  mapSASToken?: Maybe<Scalars['String']>;
  owner?: Maybe<Member>;
  propertyName: Scalars['String'];
  propertyType?: Maybe<Scalars['String']>;
  schemaVersion?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PropertyAddInput = {
  propertyName: Scalars['String'];
};

export type PropertyAssignOwnerInput = {
  id: Scalars['ObjectID'];
  ownerId: Scalars['ObjectID'];
};

export type PropertyBlobFileAuthHeaderResult = {
  __typename?: 'PropertyBlobFileAuthHeaderResult';
  authHeader?: Maybe<BlobAuthHeader>;
  property?: Maybe<Property>;
  status: MutationStatus;
};

export type PropertyBlobFileInput = {
  contentLength: Scalars['Int'];
  contentType: Scalars['String'];
  fileName: Scalars['String'];
  propertyId: Scalars['ObjectID'];
};

export type PropertyDeleteInput = {
  id: Scalars['ObjectID'];
};

export type PropertyMutationResult = MutationResult & {
  __typename?: 'PropertyMutationResult';
  property?: Maybe<Property>;
  status: MutationStatus;
};

export type PropertyOwnerInput = {
  id?: InputMaybe<Scalars['ObjectID']>;
};

export type PropertyPermissions = {
  __typename?: 'PropertyPermissions';
  canEditOwnProperty: Scalars['Boolean'];
  canManageProperties: Scalars['Boolean'];
};

export type PropertyPermissionsInput = {
  canEditOwnProperty: Scalars['Boolean'];
  canManageProperties: Scalars['Boolean'];
};

export type PropertyRemoveImageInput = {
  blobName: Scalars['String'];
  memberId: Scalars['ObjectID'];
  propertyId: Scalars['ObjectID'];
};

export type PropertyRemoveOwnerInput = {
  id: Scalars['ObjectID'];
};

export type PropertyResult = {
  __typename?: 'PropertyResult';
  additionalAmenities?: Maybe<Array<Maybe<AdditionalAmenitiesSearchResult>>>;
  address?: Maybe<Address>;
  amenities?: Maybe<Array<Maybe<Scalars['String']>>>;
  bathrooms?: Maybe<Scalars['Float']>;
  bedrooms?: Maybe<Scalars['Int']>;
  communityId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  listedForLease?: Maybe<Scalars['Boolean']>;
  listedForRent?: Maybe<Scalars['Boolean']>;
  listedForSale?: Maybe<Scalars['Boolean']>;
  listingAgentCompany?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  position?: Maybe<GeographyPoint>;
  price?: Maybe<Scalars['Float']>;
  squareFeet?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PropertySearchFacets = {
  __typename?: 'PropertySearchFacets';
  additionalAmenitiesAmenities?: Maybe<Array<Maybe<FacetDetail>>>;
  additionalAmenitiesCategory?: Maybe<Array<Maybe<FacetDetail>>>;
  amenities?: Maybe<Array<Maybe<FacetDetail>>>;
  bathrooms?: Maybe<Array<Maybe<FacetDetail>>>;
  bedrooms?: Maybe<Array<Maybe<FacetDetail>>>;
  createdAt?: Maybe<Array<Maybe<FacetDetail>>>;
  listedForLease?: Maybe<Array<Maybe<FacetDetail>>>;
  listedForRent?: Maybe<Array<Maybe<FacetDetail>>>;
  listedForSale?: Maybe<Array<Maybe<FacetDetail>>>;
  tags?: Maybe<Array<Maybe<FacetDetail>>>;
  type?: Maybe<Array<Maybe<FacetDetail>>>;
  updatedAt?: Maybe<Array<Maybe<FacetDetail>>>;
};

export type PropertySearchResult = {
  __typename?: 'PropertySearchResult';
  count?: Maybe<Scalars['Int']>;
  facets?: Maybe<PropertySearchFacets>;
  propertyResults?: Maybe<Array<Maybe<PropertyResult>>>;
};

export type PropertyUpdateInput = {
  id: Scalars['ObjectID'];
  listedForLease?: InputMaybe<Scalars['Boolean']>;
  listedForRent?: InputMaybe<Scalars['Boolean']>;
  listedForSale?: InputMaybe<Scalars['Boolean']>;
  listedInDirectory?: InputMaybe<Scalars['Boolean']>;
  listingDetail?: InputMaybe<ListingDetailsInput>;
  location?: InputMaybe<LocationInput>;
  owner?: InputMaybe<PropertyOwnerInput>;
  propertyName?: InputMaybe<Scalars['String']>;
  propertyType?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type Query = {
  __typename?: 'Query';
  /** IGNORE: Dummy field necessary for the Query type to be valid */
  _empty?: Maybe<Scalars['String']>;
  communities?: Maybe<Array<Maybe<Community>>>;
  community?: Maybe<Community>;
  communityByDomain?: Maybe<Community>;
  communityByHandle?: Maybe<Community>;
  communityById?: Maybe<Community>;
  getAllPropertyTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  getMapSasToken?: Maybe<Scalars['String']>;
  member?: Maybe<Member>;
  memberForCurrentUser?: Maybe<Member>;
  memberForUser?: Maybe<Member>;
  members?: Maybe<Array<Maybe<Member>>>;
  membersAssignableToTickets?: Maybe<Array<Maybe<Member>>>;
  membersByCommunityId?: Maybe<Array<Maybe<Member>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  propertiesByCommunityId?: Maybe<Array<Maybe<Property>>>;
  propertiesForCurrentUserByCommunityId?: Maybe<Array<Maybe<Property>>>;
  propertiesSearch?: Maybe<PropertySearchResult>;
  property?: Maybe<Property>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  rolesByCommunityId?: Maybe<Array<Maybe<Role>>>;
  serverDate?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  serviceTicket?: Maybe<ServiceTicket>;
  serviceTicketsAssignedToCurrentUser?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsByCommunityId?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsClosedByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByCommunity?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsSearch?: Maybe<ServiceTicketsSearchResult>;
  servicesByCommunityId?: Maybe<Array<Maybe<Service>>>;
  user?: Maybe<User>;
  userCurrent?: Maybe<CurrentUser>;
  users?: Maybe<Array<Maybe<User>>>;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryCommunityByDomainArgs = {
  domain: Scalars['String'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryCommunityByHandleArgs = {
  handle: Scalars['String'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryCommunityByIdArgs = {
  id: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMemberArgs = {
  id: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMemberForCurrentUserArgs = {
  communityId: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMemberForUserArgs = {
  userId: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMembersByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertiesByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertiesForCurrentUserByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertiesSearchArgs = {
  input: PropertiesSearchInput;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertyArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryRoleArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryRolesByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsSearchArgs = {
  input: ServiceTicketsSearchInput;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServicesByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryUserArgs = {
  id: Scalars['ObjectID'];
};

export type Role = MongoBase & {
  __typename?: 'Role';
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  isDefault: Scalars['Boolean'];
  permissions: RolePermissions;
  roleName: Scalars['String'];
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RoleAddInput = {
  permissions: PermissionsInput;
  roleName: Scalars['String'];
};

export type RoleDeleteAndReassignInput = {
  roleToDelete: Scalars['ObjectID'];
  roleToReassignTo: Scalars['ObjectID'];
};

export type RoleMutationResult = MutationResult & {
  __typename?: 'RoleMutationResult';
  role?: Maybe<Role>;
  status: MutationStatus;
};

export type RolePermissions = {
  __typename?: 'RolePermissions';
  communityPermissions: CommunityPermissions;
  propertyPermissions: PropertyPermissions;
  serviceTicketPermissions: ServiceTicketPermissions;
};

export type RoleUpdateInput = {
  id: Scalars['ObjectID'];
  permissions: PermissionsInput;
  roleName: Scalars['String'];
};

export type Service = MongoBase & {
  __typename?: 'Service';
  community: Community;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ObjectID'];
  isActive: Scalars['Boolean'];
  schemaVersion?: Maybe<Scalars['String']>;
  serviceName: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceCreateInput = {
  description: Scalars['String'];
  serviceName: Scalars['String'];
};

export type ServiceMutationResult = MutationResult & {
  __typename?: 'ServiceMutationResult';
  service?: Maybe<Service>;
  status: MutationStatus;
};

export type ServiceTicket = MongoBase & {
  __typename?: 'ServiceTicket';
  activityLog?: Maybe<Array<Maybe<ServiceTicketActivityDetail>>>;
  assignedTo?: Maybe<Member>;
  community: Community;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ObjectID'];
  photos?: Maybe<Array<Maybe<ServiceTicketPhoto>>>;
  priority: Scalars['Int'];
  property?: Maybe<Property>;
  requestor: Member;
  schemaVersion?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  status: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceTicketActivityDetail = MongoSubdocument & {
  __typename?: 'ServiceTicketActivityDetail';
  activityBy: Member;
  activityDescription: Scalars['String'];
  activityType: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceTicketAddPhotoInput = {
  contentLength: Scalars['String'];
  contentType: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketAddUpdateActivityInput = {
  activityDescription: Scalars['String'];
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketAssignInput = {
  assignedToId?: InputMaybe<Scalars['ObjectID']>;
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketChangeStatusInput = {
  activityDescription?: InputMaybe<Scalars['String']>;
  serviceTicketId: Scalars['ObjectID'];
  status: Scalars['String'];
};

export type ServiceTicketCreateInput = {
  description: Scalars['String'];
  propertyId: Scalars['ObjectID'];
  requestorId?: InputMaybe<Scalars['ObjectID']>;
  serviceId?: InputMaybe<Scalars['ObjectID']>;
  title: Scalars['String'];
};

export type ServiceTicketDeleteInput = {
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketMutationResult = MutationResult & {
  __typename?: 'ServiceTicketMutationResult';
  serviceTicket?: Maybe<ServiceTicket>;
  status: MutationStatus;
};

export type ServiceTicketPermissions = {
  __typename?: 'ServiceTicketPermissions';
  canAssignTickets: Scalars['Boolean'];
  canCreateTickets: Scalars['Boolean'];
  canManageTickets: Scalars['Boolean'];
  canWorkOnTickets: Scalars['Boolean'];
};

export type ServiceTicketPermissionsInput = {
  canAssignTickets: Scalars['Boolean'];
  canCreateTickets: Scalars['Boolean'];
  canManageTickets: Scalars['Boolean'];
  canWorkOnTickets: Scalars['Boolean'];
};

export type ServiceTicketPhoto = MongoSubdocument & {
  __typename?: 'ServiceTicketPhoto';
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  documentId: Scalars['String'];
  id: Scalars['ObjectID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceTicketPhotoAuthHeaderResult = MutationResult & {
  __typename?: 'ServiceTicketPhotoAuthHeaderResult';
  authHeader?: Maybe<BlobAuthHeader>;
  serviceTicket?: Maybe<ServiceTicket>;
  status: MutationStatus;
};

export type ServiceTicketRemovePhotoInput = {
  photoId: Scalars['ObjectID'];
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketSubmitInput = {
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketUpdateInput = {
  description: Scalars['String'];
  priority: Scalars['Int'];
  propertyId?: InputMaybe<Scalars['ObjectID']>;
  serviceId?: InputMaybe<Scalars['ObjectID']>;
  serviceTicketId: Scalars['ObjectID'];
  title: Scalars['String'];
};

export type ServiceTicketsResult = {
  __typename?: 'ServiceTicketsResult';
  assignedTo?: Maybe<Scalars['String']>;
  assignedToId?: Maybe<Scalars['String']>;
  communityId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  propertyId?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  requestorId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceTicketsSearchFacets = {
  __typename?: 'ServiceTicketsSearchFacets';
  assignedTo?: Maybe<Array<Maybe<FacetDetail>>>;
  assignedToId?: Maybe<Array<Maybe<FacetDetail>>>;
  priority?: Maybe<Array<Maybe<FacetDetail>>>;
  requestor?: Maybe<Array<Maybe<FacetDetail>>>;
  requestorId?: Maybe<Array<Maybe<FacetDetail>>>;
  status?: Maybe<Array<Maybe<FacetDetail>>>;
};

export type ServiceTicketsSearchFilterDetail = {
  assignedToId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  priority?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  requestorId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ServiceTicketsSearchInput = {
  options?: InputMaybe<ServiceTicketsSearchOptions>;
  searchString?: InputMaybe<Scalars['String']>;
};

export type ServiceTicketsSearchOptions = {
  facets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  filter?: InputMaybe<ServiceTicketsSearchFilterDetail>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skip?: InputMaybe<Scalars['Int']>;
  top?: InputMaybe<Scalars['Int']>;
};

export type ServiceTicketsSearchResult = {
  __typename?: 'ServiceTicketsSearchResult';
  count?: Maybe<Scalars['Int']>;
  facets?: Maybe<ServiceTicketsSearchFacets>;
  serviceTicketsResults?: Maybe<Array<Maybe<ServiceTicketsResult>>>;
};

export type ServiceUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  serviceName?: InputMaybe<Scalars['String']>;
};

export type User = MongoBase & {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['EmailAddress']>;
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  lastName?: Maybe<Scalars['String']>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMutationResult = MutationResult & {
  __typename?: 'UserMutationResult';
  status: MutationStatus;
  user?: Maybe<User>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  lastName?: InputMaybe<Scalars['String']>;
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

export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']>;
  AdditionalAmenities: ResolverTypeWrapper<AdditionalAmenities>;
  AdditionalAmenitiesFilterInput: AdditionalAmenitiesFilterInput;
  AdditionalAmenitiesInput: AdditionalAmenitiesInput;
  AdditionalAmenitiesSearchResult: ResolverTypeWrapper<AdditionalAmenitiesSearchResult>;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  BedroomDetails: ResolverTypeWrapper<BedroomDetails>;
  BedroomDetailsInput: BedroomDetailsInput;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlobAuthHeader: ResolverTypeWrapper<BlobAuthHeader>;
  BlobIndexTag: ResolverTypeWrapper<BlobIndexTag>;
  BlobMetadataField: ResolverTypeWrapper<BlobMetadataField>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CacheControlScope: CacheControlScope;
  Community: ResolverTypeWrapper<Community>;
  CommunityBlobContentAuthHeaderResult: ResolverTypeWrapper<CommunityBlobContentAuthHeaderResult>;
  CommunityBlobContentInput: CommunityBlobContentInput;
  CommunityBlobFileInput: CommunityBlobFileInput;
  CommunityCreateInput: CommunityCreateInput;
  CommunityDomainResult: ResolverTypeWrapper<CommunityDomainResult>;
  CommunityDomainVerificationDetail: ResolverTypeWrapper<CommunityDomainVerificationDetail>;
  CommunityMutationResult: ResolverTypeWrapper<CommunityMutationResult>;
  CommunityPermissions: ResolverTypeWrapper<CommunityPermissions>;
  CommunityPermissionsInput: CommunityPermissionsInput;
  CommunityPublicFileRemoveInput: CommunityPublicFileRemoveInput;
  CommunityUpdateInput: CommunityUpdateInput;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  CurrentUser: ResolverTypeWrapper<CurrentUser>;
  CustomView: ResolverTypeWrapper<CustomView>;
  CustomViewInput: CustomViewInput;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']>;
  DeweyDecimal: ResolverTypeWrapper<Scalars['DeweyDecimal']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  FacetDetail: ResolverTypeWrapper<FacetDetail>;
  FileInfo: ResolverTypeWrapper<FileInfo>;
  FilterDetail: FilterDetail;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  GeographyPoint: ResolverTypeWrapper<GeographyPoint>;
  GeographyPointInput: GeographyPointInput;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IP: ResolverTypeWrapper<Scalars['IP']>;
  IPCPatent: ResolverTypeWrapper<Scalars['IPCPatent']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  LCCSubclass: ResolverTypeWrapper<Scalars['LCCSubclass']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  ListingDetails: ResolverTypeWrapper<ListingDetails>;
  ListingDetailsFilterInput: ListingDetailsFilterInput;
  ListingDetailsInput: ListingDetailsInput;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalDateTime: ResolverTypeWrapper<Scalars['LocalDateTime']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']>;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Member: ResolverTypeWrapper<Member>;
  MemberAccount: ResolverTypeWrapper<MemberAccount>;
  MemberAccountAddInput: MemberAccountAddInput;
  MemberAccountCreateInput: MemberAccountCreateInput;
  MemberAccountEditInput: MemberAccountEditInput;
  MemberAccountRemoveInput: MemberAccountRemoveInput;
  MemberAvatarImageAuthHeaderResult: ResolverTypeWrapper<MemberAvatarImageAuthHeaderResult>;
  MemberAvatarImageInput: MemberAvatarImageInput;
  MemberCreateInput: MemberCreateInput;
  MemberMutationResult: ResolverTypeWrapper<MemberMutationResult>;
  MemberProfile: ResolverTypeWrapper<MemberProfile>;
  MemberProfileInput: MemberProfileInput;
  MemberProfileUpdateInput: MemberProfileUpdateInput;
  MemberUpdateInput: MemberUpdateInput;
  MongoBase:
    | ResolversTypes['Community']
    | ResolversTypes['CurrentUser']
    | ResolversTypes['Member']
    | ResolversTypes['Property']
    | ResolversTypes['Role']
    | ResolversTypes['Service']
    | ResolversTypes['ServiceTicket']
    | ResolversTypes['User'];
  MongoSubdocument:
    | ResolversTypes['AdditionalAmenities']
    | ResolversTypes['BedroomDetails']
    | ResolversTypes['CustomView']
    | ResolversTypes['MemberAccount']
    | ResolversTypes['ServiceTicketActivityDetail']
    | ResolversTypes['ServiceTicketPhoto'];
  Mutation: ResolverTypeWrapper<{}>;
  MutationResult:
    | ResolversTypes['CommunityMutationResult']
    | ResolversTypes['MemberMutationResult']
    | ResolversTypes['PropertyMutationResult']
    | ResolversTypes['RoleMutationResult']
    | ResolversTypes['ServiceMutationResult']
    | ResolversTypes['ServiceTicketMutationResult']
    | ResolversTypes['ServiceTicketPhotoAuthHeaderResult']
    | ResolversTypes['UserMutationResult'];
  MutationStatus: ResolverTypeWrapper<MutationStatus>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PermissionsInput: PermissionsInput;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Point: ResolverTypeWrapper<Point>;
  PointInput: PointInput;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  PropertiesSearchInput: PropertiesSearchInput;
  PropertiesSearchOptions: PropertiesSearchOptions;
  Property: ResolverTypeWrapper<Property>;
  PropertyAddInput: PropertyAddInput;
  PropertyAssignOwnerInput: PropertyAssignOwnerInput;
  PropertyBlobFileAuthHeaderResult: ResolverTypeWrapper<PropertyBlobFileAuthHeaderResult>;
  PropertyBlobFileInput: PropertyBlobFileInput;
  PropertyDeleteInput: PropertyDeleteInput;
  PropertyMutationResult: ResolverTypeWrapper<PropertyMutationResult>;
  PropertyOwnerInput: PropertyOwnerInput;
  PropertyPermissions: ResolverTypeWrapper<PropertyPermissions>;
  PropertyPermissionsInput: PropertyPermissionsInput;
  PropertyRemoveImageInput: PropertyRemoveImageInput;
  PropertyRemoveOwnerInput: PropertyRemoveOwnerInput;
  PropertyResult: ResolverTypeWrapper<PropertyResult>;
  PropertySearchFacets: ResolverTypeWrapper<PropertySearchFacets>;
  PropertySearchResult: ResolverTypeWrapper<PropertySearchResult>;
  PropertyUpdateInput: PropertyUpdateInput;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  Role: ResolverTypeWrapper<Role>;
  RoleAddInput: RoleAddInput;
  RoleDeleteAndReassignInput: RoleDeleteAndReassignInput;
  RoleMutationResult: ResolverTypeWrapper<RoleMutationResult>;
  RolePermissions: ResolverTypeWrapper<RolePermissions>;
  RoleUpdateInput: RoleUpdateInput;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']>;
  Service: ResolverTypeWrapper<Service>;
  ServiceCreateInput: ServiceCreateInput;
  ServiceMutationResult: ResolverTypeWrapper<ServiceMutationResult>;
  ServiceTicket: ResolverTypeWrapper<ServiceTicket>;
  ServiceTicketActivityDetail: ResolverTypeWrapper<ServiceTicketActivityDetail>;
  ServiceTicketAddPhotoInput: ServiceTicketAddPhotoInput;
  ServiceTicketAddUpdateActivityInput: ServiceTicketAddUpdateActivityInput;
  ServiceTicketAssignInput: ServiceTicketAssignInput;
  ServiceTicketChangeStatusInput: ServiceTicketChangeStatusInput;
  ServiceTicketCreateInput: ServiceTicketCreateInput;
  ServiceTicketDeleteInput: ServiceTicketDeleteInput;
  ServiceTicketMutationResult: ResolverTypeWrapper<ServiceTicketMutationResult>;
  ServiceTicketPermissions: ResolverTypeWrapper<ServiceTicketPermissions>;
  ServiceTicketPermissionsInput: ServiceTicketPermissionsInput;
  ServiceTicketPhoto: ResolverTypeWrapper<ServiceTicketPhoto>;
  ServiceTicketPhotoAuthHeaderResult: ResolverTypeWrapper<ServiceTicketPhotoAuthHeaderResult>;
  ServiceTicketRemovePhotoInput: ServiceTicketRemovePhotoInput;
  ServiceTicketSubmitInput: ServiceTicketSubmitInput;
  ServiceTicketUpdateInput: ServiceTicketUpdateInput;
  ServiceTicketsResult: ResolverTypeWrapper<ServiceTicketsResult>;
  ServiceTicketsSearchFacets: ResolverTypeWrapper<ServiceTicketsSearchFacets>;
  ServiceTicketsSearchFilterDetail: ServiceTicketsSearchFilterDetail;
  ServiceTicketsSearchInput: ServiceTicketsSearchInput;
  ServiceTicketsSearchOptions: ServiceTicketsSearchOptions;
  ServiceTicketsSearchResult: ResolverTypeWrapper<ServiceTicketsSearchResult>;
  ServiceUpdateInput: ServiceUpdateInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  User: ResolverTypeWrapper<User>;
  UserMutationResult: ResolverTypeWrapper<UserMutationResult>;
  UserUpdateInput: UserUpdateInput;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccountNumber: Scalars['AccountNumber'];
  AdditionalAmenities: AdditionalAmenities;
  AdditionalAmenitiesFilterInput: AdditionalAmenitiesFilterInput;
  AdditionalAmenitiesInput: AdditionalAmenitiesInput;
  AdditionalAmenitiesSearchResult: AdditionalAmenitiesSearchResult;
  Address: Address;
  AddressInput: AddressInput;
  BedroomDetails: BedroomDetails;
  BedroomDetailsInput: BedroomDetailsInput;
  BigInt: Scalars['BigInt'];
  BlobAuthHeader: BlobAuthHeader;
  BlobIndexTag: BlobIndexTag;
  BlobMetadataField: BlobMetadataField;
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  Community: Community;
  CommunityBlobContentAuthHeaderResult: CommunityBlobContentAuthHeaderResult;
  CommunityBlobContentInput: CommunityBlobContentInput;
  CommunityBlobFileInput: CommunityBlobFileInput;
  CommunityCreateInput: CommunityCreateInput;
  CommunityDomainResult: CommunityDomainResult;
  CommunityDomainVerificationDetail: CommunityDomainVerificationDetail;
  CommunityMutationResult: CommunityMutationResult;
  CommunityPermissions: CommunityPermissions;
  CommunityPermissionsInput: CommunityPermissionsInput;
  CommunityPublicFileRemoveInput: CommunityPublicFileRemoveInput;
  CommunityUpdateInput: CommunityUpdateInput;
  CountryCode: Scalars['CountryCode'];
  Cuid: Scalars['Cuid'];
  Currency: Scalars['Currency'];
  CurrentUser: CurrentUser;
  CustomView: CustomView;
  CustomViewInput: CustomViewInput;
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  DateTimeISO: Scalars['DateTimeISO'];
  DeweyDecimal: Scalars['DeweyDecimal'];
  Duration: Scalars['Duration'];
  EmailAddress: Scalars['EmailAddress'];
  FacetDetail: FacetDetail;
  FileInfo: FileInfo;
  FilterDetail: FilterDetail;
  Float: Scalars['Float'];
  GUID: Scalars['GUID'];
  GeographyPoint: GeographyPoint;
  GeographyPointInput: GeographyPointInput;
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  ID: Scalars['ID'];
  IP: Scalars['IP'];
  IPCPatent: Scalars['IPCPatent'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  LCCSubclass: Scalars['LCCSubclass'];
  Latitude: Scalars['Latitude'];
  ListingDetails: ListingDetails;
  ListingDetailsFilterInput: ListingDetailsFilterInput;
  ListingDetailsInput: ListingDetailsInput;
  LocalDate: Scalars['LocalDate'];
  LocalDateTime: Scalars['LocalDateTime'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Locale: Scalars['Locale'];
  Location: Location;
  LocationInput: LocationInput;
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Member: Member;
  MemberAccount: MemberAccount;
  MemberAccountAddInput: MemberAccountAddInput;
  MemberAccountCreateInput: MemberAccountCreateInput;
  MemberAccountEditInput: MemberAccountEditInput;
  MemberAccountRemoveInput: MemberAccountRemoveInput;
  MemberAvatarImageAuthHeaderResult: MemberAvatarImageAuthHeaderResult;
  MemberAvatarImageInput: MemberAvatarImageInput;
  MemberCreateInput: MemberCreateInput;
  MemberMutationResult: MemberMutationResult;
  MemberProfile: MemberProfile;
  MemberProfileInput: MemberProfileInput;
  MemberProfileUpdateInput: MemberProfileUpdateInput;
  MemberUpdateInput: MemberUpdateInput;
  MongoBase:
    | ResolversParentTypes['Community']
    | ResolversParentTypes['CurrentUser']
    | ResolversParentTypes['Member']
    | ResolversParentTypes['Property']
    | ResolversParentTypes['Role']
    | ResolversParentTypes['Service']
    | ResolversParentTypes['ServiceTicket']
    | ResolversParentTypes['User'];
  MongoSubdocument:
    | ResolversParentTypes['AdditionalAmenities']
    | ResolversParentTypes['BedroomDetails']
    | ResolversParentTypes['CustomView']
    | ResolversParentTypes['MemberAccount']
    | ResolversParentTypes['ServiceTicketActivityDetail']
    | ResolversParentTypes['ServiceTicketPhoto'];
  Mutation: {};
  MutationResult:
    | ResolversParentTypes['CommunityMutationResult']
    | ResolversParentTypes['MemberMutationResult']
    | ResolversParentTypes['PropertyMutationResult']
    | ResolversParentTypes['RoleMutationResult']
    | ResolversParentTypes['ServiceMutationResult']
    | ResolversParentTypes['ServiceTicketMutationResult']
    | ResolversParentTypes['ServiceTicketPhotoAuthHeaderResult']
    | ResolversParentTypes['UserMutationResult'];
  MutationStatus: MutationStatus;
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  PermissionsInput: PermissionsInput;
  PhoneNumber: Scalars['PhoneNumber'];
  Point: Point;
  PointInput: PointInput;
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  PropertiesSearchInput: PropertiesSearchInput;
  PropertiesSearchOptions: PropertiesSearchOptions;
  Property: Property;
  PropertyAddInput: PropertyAddInput;
  PropertyAssignOwnerInput: PropertyAssignOwnerInput;
  PropertyBlobFileAuthHeaderResult: PropertyBlobFileAuthHeaderResult;
  PropertyBlobFileInput: PropertyBlobFileInput;
  PropertyDeleteInput: PropertyDeleteInput;
  PropertyMutationResult: PropertyMutationResult;
  PropertyOwnerInput: PropertyOwnerInput;
  PropertyPermissions: PropertyPermissions;
  PropertyPermissionsInput: PropertyPermissionsInput;
  PropertyRemoveImageInput: PropertyRemoveImageInput;
  PropertyRemoveOwnerInput: PropertyRemoveOwnerInput;
  PropertyResult: PropertyResult;
  PropertySearchFacets: PropertySearchFacets;
  PropertySearchResult: PropertySearchResult;
  PropertyUpdateInput: PropertyUpdateInput;
  Query: {};
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  Role: Role;
  RoleAddInput: RoleAddInput;
  RoleDeleteAndReassignInput: RoleDeleteAndReassignInput;
  RoleMutationResult: RoleMutationResult;
  RolePermissions: RolePermissions;
  RoleUpdateInput: RoleUpdateInput;
  RoutingNumber: Scalars['RoutingNumber'];
  SafeInt: Scalars['SafeInt'];
  SemVer: Scalars['SemVer'];
  Service: Service;
  ServiceCreateInput: ServiceCreateInput;
  ServiceMutationResult: ServiceMutationResult;
  ServiceTicket: ServiceTicket;
  ServiceTicketActivityDetail: ServiceTicketActivityDetail;
  ServiceTicketAddPhotoInput: ServiceTicketAddPhotoInput;
  ServiceTicketAddUpdateActivityInput: ServiceTicketAddUpdateActivityInput;
  ServiceTicketAssignInput: ServiceTicketAssignInput;
  ServiceTicketChangeStatusInput: ServiceTicketChangeStatusInput;
  ServiceTicketCreateInput: ServiceTicketCreateInput;
  ServiceTicketDeleteInput: ServiceTicketDeleteInput;
  ServiceTicketMutationResult: ServiceTicketMutationResult;
  ServiceTicketPermissions: ServiceTicketPermissions;
  ServiceTicketPermissionsInput: ServiceTicketPermissionsInput;
  ServiceTicketPhoto: ServiceTicketPhoto;
  ServiceTicketPhotoAuthHeaderResult: ServiceTicketPhotoAuthHeaderResult;
  ServiceTicketRemovePhotoInput: ServiceTicketRemovePhotoInput;
  ServiceTicketSubmitInput: ServiceTicketSubmitInput;
  ServiceTicketUpdateInput: ServiceTicketUpdateInput;
  ServiceTicketsResult: ServiceTicketsResult;
  ServiceTicketsSearchFacets: ServiceTicketsSearchFacets;
  ServiceTicketsSearchFilterDetail: ServiceTicketsSearchFilterDetail;
  ServiceTicketsSearchInput: ServiceTicketsSearchInput;
  ServiceTicketsSearchOptions: ServiceTicketsSearchOptions;
  ServiceTicketsSearchResult: ServiceTicketsSearchResult;
  ServiceUpdateInput: ServiceUpdateInput;
  String: Scalars['String'];
  Time: Scalars['Time'];
  TimeZone: Scalars['TimeZone'];
  Timestamp: Scalars['Timestamp'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  User: User;
  UserMutationResult: UserMutationResult;
  UserUpdateInput: UserUpdateInput;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
}>;

export type CacheControl22DirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']>;
  maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControl22DirectiveResolver<Result, Parent, ContextType = GraphqlContext, Args = CacheControl22DirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>;

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AdditionalAmenitiesResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['AdditionalAmenities'] = ResolversParentTypes['AdditionalAmenities'],
> = ResolversObject<{
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdditionalAmenitiesSearchResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['AdditionalAmenitiesSearchResult'] = ResolversParentTypes['AdditionalAmenitiesSearchResult'],
> = ResolversObject<{
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddressResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCodeISO3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countrySecondarySubdivision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countrySubdivision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countrySubdivisionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryTertiarySubdivision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crossStreet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extendedPostalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  freeformAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  localName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  municipality?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  municipalitySubdivision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  routeNumbers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetNameAndNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BedroomDetailsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['BedroomDetails'] = ResolversParentTypes['BedroomDetails'],
> = ResolversObject<{
  bedDescriptions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  roomName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlobAuthHeaderResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['BlobAuthHeader'] = ResolversParentTypes['BlobAuthHeader'],
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blobName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blobPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  indexTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['BlobIndexTag']>>>, ParentType, ContextType>;
  metadataFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['BlobMetadataField']>>>, ParentType, ContextType>;
  requestDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlobIndexTagResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['BlobIndexTag'] = ResolversParentTypes['BlobIndexTag'],
> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlobMetadataFieldResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['BlobMetadataField'] = ResolversParentTypes['BlobMetadataField'],
> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type CommunityResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domainStatus?: Resolver<Maybe<ResolversTypes['CommunityDomainResult']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['FileInfo']>>>, ParentType, ContextType>;
  filesByType?: Resolver<Maybe<Array<Maybe<ResolversTypes['FileInfo']>>>, ParentType, ContextType, RequireFields<CommunityFilesByTypeArgs, 'type'>>;
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicContentBlobUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userIsAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  whiteLabelDomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityBlobContentAuthHeaderResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['CommunityBlobContentAuthHeaderResult'] = ResolversParentTypes['CommunityBlobContentAuthHeaderResult'],
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityDomainResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['CommunityDomainResult'] = ResolversParentTypes['CommunityDomainResult'],
> = ResolversObject<{
  verification?: Resolver<Maybe<Array<Maybe<ResolversTypes['CommunityDomainVerificationDetail']>>>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityDomainVerificationDetailResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['CommunityDomainVerificationDetail'] = ResolversParentTypes['CommunityDomainVerificationDetail'],
> = ResolversObject<{
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['CommunityMutationResult'] = ResolversParentTypes['CommunityMutationResult'],
> = ResolversObject<{
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityPermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['CommunityPermissions'] = ResolversParentTypes['CommunityPermissions'],
> = ResolversObject<{
  canEditOwnMemberAccounts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canEditOwnMemberProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageCommunitySettings?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageMembers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageRolesAndPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageSiteContent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export type CurrentUserResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser'],
> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomViewResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CustomView'] = ResolversParentTypes['CustomView']> = ResolversObject<{
  columnsToDisplay?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  filters?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortOrder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export interface DeweyDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DeweyDecimal'], any> {
  name: 'DeweyDecimal';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type FacetDetailResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['FacetDetail'] = ResolversParentTypes['FacetDetail'],
> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FileInfoResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['FileInfo'] = ResolversParentTypes['FileInfo']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export type GeographyPointResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['GeographyPoint'] = ResolversParentTypes['GeographyPoint'],
> = ResolversObject<{
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
}

export interface IpcPatentScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPCPatent'], any> {
  name: 'IPCPatent';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LccSubclassScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LCCSubclass'], any> {
  name: 'LCCSubclass';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export type ListingDetailsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ListingDetails'] = ResolversParentTypes['ListingDetails'],
> = ResolversObject<{
  additionalAmenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['AdditionalAmenities']>>>, ParentType, ContextType>;
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  bathrooms?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bedroomDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['BedroomDetails']>>>, ParentType, ContextType>;
  bedrooms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  floorPlan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  floorPlanImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  lease?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  listingAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentCompany?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentCompanyAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentCompanyEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentCompanyPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentCompanyWebsite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listingAgentWebsite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxGuests?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rentHigh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rentLow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  squareFeet?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDateTime'], any> {
  name: 'LocalDateTime';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export type LocationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Point']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MemberResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['MemberAccount']>>>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  customViews?: Resolver<Maybe<Array<Maybe<ResolversTypes['CustomView']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  memberName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['MemberProfile']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberAccountResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MemberAccount'] = ResolversParentTypes['MemberAccount'],
> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberAvatarImageAuthHeaderResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MemberAvatarImageAuthHeaderResult'] = ResolversParentTypes['MemberAvatarImageAuthHeaderResult'],
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MemberMutationResult'] = ResolversParentTypes['MemberMutationResult'],
> = ResolversObject<{
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberProfileResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MemberProfile'] = ResolversParentTypes['MemberProfile'],
> = ResolversObject<{
  avatarDocumentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interests?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showInterests?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showLocation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showProfile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showProperties?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MongoBaseResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['MongoBase'] = ResolversParentTypes['MongoBase']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Community' | 'CurrentUser' | 'Member' | 'Property' | 'Role' | 'Service' | 'ServiceTicket' | 'User', ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;

export type MongoSubdocumentResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MongoSubdocument'] = ResolversParentTypes['MongoSubdocument'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'AdditionalAmenities' | 'BedroomDetails' | 'CustomView' | 'MemberAccount' | 'ServiceTicketActivityDetail' | 'ServiceTicketPhoto',
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  communityCreate?: Resolver<Maybe<ResolversTypes['CommunityMutationResult']>, ParentType, ContextType, RequireFields<MutationCommunityCreateArgs, 'input'>>;
  communityPublicContentCreateAuthHeader?: Resolver<
    ResolversTypes['CommunityBlobContentAuthHeaderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCommunityPublicContentCreateAuthHeaderArgs, 'input'>
  >;
  communityPublicFileCreateAuthHeader?: Resolver<
    ResolversTypes['CommunityBlobContentAuthHeaderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCommunityPublicFileCreateAuthHeaderArgs, 'input'>
  >;
  communityPublicFileRemove?: Resolver<ResolversTypes['CommunityMutationResult'], ParentType, ContextType, RequireFields<MutationCommunityPublicFileRemoveArgs, 'input'>>;
  communityUpdate?: Resolver<ResolversTypes['CommunityMutationResult'], ParentType, ContextType, RequireFields<MutationCommunityUpdateArgs, 'input'>>;
  memberAccountAdd?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberAccountAddArgs, 'input'>>;
  memberAccountEdit?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberAccountEditArgs, 'input'>>;
  memberAccountRemove?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberAccountRemoveArgs, 'input'>>;
  memberCreate?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberCreateArgs, 'input'>>;
  memberProfileAvatarCreateAuthHeader?: Resolver<
    ResolversTypes['MemberAvatarImageAuthHeaderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationMemberProfileAvatarCreateAuthHeaderArgs, 'input'>
  >;
  memberProfileAvatarRemove?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberProfileAvatarRemoveArgs, 'memberId'>>;
  memberProfileUpdate?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberProfileUpdateArgs, 'input'>>;
  memberUpdate?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberUpdateArgs, 'input'>>;
  propertyAdd?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyAddArgs, 'input'>>;
  propertyAssignOwner?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyAssignOwnerArgs, 'input'>>;
  propertyDelete?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyDeleteArgs, 'input'>>;
  propertyFloorPlanImageCreateAuthHeader?: Resolver<
    ResolversTypes['PropertyBlobFileAuthHeaderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationPropertyFloorPlanImageCreateAuthHeaderArgs, 'input'>
  >;
  propertyListingImageCreateAuthHeader?: Resolver<
    ResolversTypes['PropertyBlobFileAuthHeaderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationPropertyListingImageCreateAuthHeaderArgs, 'input'>
  >;
  propertyListingImageRemove?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyListingImageRemoveArgs, 'input'>>;
  propertyRemoveOwner?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyRemoveOwnerArgs, 'input'>>;
  propertyUpdate?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyUpdateArgs, 'input'>>;
  roleAdd?: Resolver<ResolversTypes['RoleMutationResult'], ParentType, ContextType, RequireFields<MutationRoleAddArgs, 'input'>>;
  roleDeleteAndReassign?: Resolver<ResolversTypes['RoleMutationResult'], ParentType, ContextType, RequireFields<MutationRoleDeleteAndReassignArgs, 'input'>>;
  roleUpdate?: Resolver<ResolversTypes['RoleMutationResult'], ParentType, ContextType, RequireFields<MutationRoleUpdateArgs, 'input'>>;
  serviceCreate?: Resolver<ResolversTypes['ServiceMutationResult'], ParentType, ContextType, RequireFields<MutationServiceCreateArgs, 'input'>>;
  serviceTicketAddPhoto?: Resolver<ResolversTypes['ServiceTicketPhotoAuthHeaderResult'], ParentType, ContextType, RequireFields<MutationServiceTicketAddPhotoArgs, 'input'>>;
  serviceTicketAddUpdateActivity?: Resolver<
    ResolversTypes['ServiceTicketMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationServiceTicketAddUpdateActivityArgs, 'input'>
  >;
  serviceTicketAssign?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketAssignArgs, 'input'>>;
  serviceTicketChangeStatus?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketChangeStatusArgs, 'input'>>;
  serviceTicketCreate?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketCreateArgs, 'input'>>;
  serviceTicketDelete?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketDeleteArgs, 'input'>>;
  serviceTicketRemovePhoto?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketRemovePhotoArgs, 'input'>>;
  serviceTicketSubmit?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketSubmitArgs, 'input'>>;
  serviceTicketUpdate?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketUpdateArgs, 'input'>>;
  serviceUpdate?: Resolver<ResolversTypes['ServiceMutationResult'], ParentType, ContextType, RequireFields<MutationServiceUpdateArgs, 'input'>>;
  userCreate?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType>;
  userUpdate?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationUserUpdateArgs, 'input'>>;
}>;

export type MutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MutationResult'] = ResolversParentTypes['MutationResult'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | 'CommunityMutationResult'
    | 'MemberMutationResult'
    | 'PropertyMutationResult'
    | 'RoleMutationResult'
    | 'ServiceMutationResult'
    | 'ServiceTicketMutationResult'
    | 'ServiceTicketPhotoAuthHeaderResult'
    | 'UserMutationResult',
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
}>;

export type MutationStatusResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['MutationStatus'] = ResolversParentTypes['MutationStatus'],
> = ResolversObject<{
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type PointResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Point'] = ResolversParentTypes['Point']> = ResolversObject<{
  coordinates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Float']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type PropertyResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = ResolversObject<{
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  listedForLease?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  listedForRent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  listedForSale?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  listedInDirectory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  listingDetail?: Resolver<Maybe<ResolversTypes['ListingDetails']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  mapSASToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  propertyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyBlobFileAuthHeaderResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PropertyBlobFileAuthHeaderResult'] = ResolversParentTypes['PropertyBlobFileAuthHeaderResult'],
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PropertyMutationResult'] = ResolversParentTypes['PropertyMutationResult'],
> = ResolversObject<{
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyPermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PropertyPermissions'] = ResolversParentTypes['PropertyPermissions'],
> = ResolversObject<{
  canEditOwnProperty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageProperties?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PropertyResult'] = ResolversParentTypes['PropertyResult'],
> = ResolversObject<{
  additionalAmenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['AdditionalAmenitiesSearchResult']>>>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  bathrooms?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bedrooms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  communityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  listedForLease?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  listedForRent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  listedForSale?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  listingAgentCompany?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['GeographyPoint']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  squareFeet?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertySearchFacetsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PropertySearchFacets'] = ResolversParentTypes['PropertySearchFacets'],
> = ResolversObject<{
  additionalAmenitiesAmenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  additionalAmenitiesCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  bathrooms?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  bedrooms?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  listedForLease?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  listedForRent?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  listedForSale?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertySearchResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PropertySearchResult'] = ResolversParentTypes['PropertySearchResult'],
> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  facets?: Resolver<Maybe<ResolversTypes['PropertySearchFacets']>, ParentType, ContextType>;
  propertyResults?: Resolver<Maybe<Array<Maybe<ResolversTypes['PropertyResult']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  communities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Community']>>>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  communityByDomain?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityByDomainArgs, 'domain'>>;
  communityByHandle?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityByHandleArgs, 'handle'>>;
  communityById?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityByIdArgs, 'id'>>;
  getAllPropertyTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  getMapSasToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberArgs, 'id'>>;
  memberForCurrentUser?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberForCurrentUserArgs, 'communityId'>>;
  memberForUser?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberForUserArgs, 'userId'>>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  membersAssignableToTickets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  membersByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType, RequireFields<QueryMembersByCommunityIdArgs, 'communityId'>>;
  properties?: Resolver<Maybe<Array<Maybe<ResolversTypes['Property']>>>, ParentType, ContextType>;
  propertiesByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Property']>>>, ParentType, ContextType, RequireFields<QueryPropertiesByCommunityIdArgs, 'communityId'>>;
  propertiesForCurrentUserByCommunityId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Property']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryPropertiesForCurrentUserByCommunityIdArgs, 'communityId'>
  >;
  propertiesSearch?: Resolver<Maybe<ResolversTypes['PropertySearchResult']>, ParentType, ContextType, RequireFields<QueryPropertiesSearchArgs, 'input'>>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QueryPropertyArgs, 'id'>>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  rolesByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType, RequireFields<QueryRolesByCommunityIdArgs, 'communityId'>>;
  serverDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType, RequireFields<QueryServiceArgs, 'id'>>;
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType, RequireFields<QueryServiceTicketArgs, 'id'>>;
  serviceTicketsAssignedToCurrentUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsByCommunityId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryServiceTicketsByCommunityIdArgs, 'communityId'>
  >;
  serviceTicketsClosedByRequestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsOpenByCommunity?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsOpenByRequestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsSearch?: Resolver<Maybe<ResolversTypes['ServiceTicketsSearchResult']>, ParentType, ContextType, RequireFields<QueryServiceTicketsSearchArgs, 'input'>>;
  servicesByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Service']>>>, ParentType, ContextType, RequireFields<QueryServicesByCommunityIdArgs, 'communityId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userCurrent?: Resolver<Maybe<ResolversTypes['CurrentUser']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export type RoleResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  permissions?: Resolver<ResolversTypes['RolePermissions'], ParentType, ContextType>;
  roleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['RoleMutationResult'] = ResolversParentTypes['RoleMutationResult'],
> = ResolversObject<{
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RolePermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['RolePermissions'] = ResolversParentTypes['RolePermissions'],
> = ResolversObject<{
  communityPermissions?: Resolver<ResolversTypes['CommunityPermissions'], ParentType, ContextType>;
  propertyPermissions?: Resolver<ResolversTypes['PropertyPermissions'], ParentType, ContextType>;
  serviceTicketPermissions?: Resolver<ResolversTypes['ServiceTicketPermissions'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

export type ServiceResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Service'] = ResolversParentTypes['Service']> = ResolversObject<{
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serviceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceMutationResult'] = ResolversParentTypes['ServiceMutationResult'],
> = ResolversObject<{
  service?: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicket'] = ResolversParentTypes['ServiceTicket'],
> = ResolversObject<{
  activityLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketActivityDetail']>>>, ParentType, ContextType>;
  assignedTo?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketPhoto']>>>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  requestor?: Resolver<ResolversTypes['Member'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketActivityDetailResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketActivityDetail'] = ResolversParentTypes['ServiceTicketActivityDetail'],
> = ResolversObject<{
  activityBy?: Resolver<ResolversTypes['Member'], ParentType, ContextType>;
  activityDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketMutationResult'] = ResolversParentTypes['ServiceTicketMutationResult'],
> = ResolversObject<{
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketPermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketPermissions'] = ResolversParentTypes['ServiceTicketPermissions'],
> = ResolversObject<{
  canAssignTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canCreateTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canWorkOnTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketPhotoResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketPhoto'] = ResolversParentTypes['ServiceTicketPhoto'],
> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketPhotoAuthHeaderResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketPhotoAuthHeaderResult'] = ResolversParentTypes['ServiceTicketPhotoAuthHeaderResult'],
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketsResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketsResult'] = ResolversParentTypes['ServiceTicketsResult'],
> = ResolversObject<{
  assignedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assignedToId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  communityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  propertyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketsSearchFacetsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketsSearchFacets'] = ResolversParentTypes['ServiceTicketsSearchFacets'],
> = ResolversObject<{
  assignedTo?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  assignedToId?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  priority?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  requestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  requestorId?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketsSearchResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketsSearchResult'] = ResolversParentTypes['ServiceTicketsSearchResult'],
> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  facets?: Resolver<Maybe<ResolversTypes['ServiceTicketsSearchFacets']>, ParentType, ContextType>;
  serviceTicketsResults?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketsResult']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['UserMutationResult'] = ResolversParentTypes['UserMutationResult'],
> = ResolversObject<{
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  AccountNumber?: GraphQLScalarType;
  AdditionalAmenities?: AdditionalAmenitiesResolvers<ContextType>;
  AdditionalAmenitiesSearchResult?: AdditionalAmenitiesSearchResultResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  BedroomDetails?: BedroomDetailsResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BlobAuthHeader?: BlobAuthHeaderResolvers<ContextType>;
  BlobIndexTag?: BlobIndexTagResolvers<ContextType>;
  BlobMetadataField?: BlobMetadataFieldResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  Community?: CommunityResolvers<ContextType>;
  CommunityBlobContentAuthHeaderResult?: CommunityBlobContentAuthHeaderResultResolvers<ContextType>;
  CommunityDomainResult?: CommunityDomainResultResolvers<ContextType>;
  CommunityDomainVerificationDetail?: CommunityDomainVerificationDetailResolvers<ContextType>;
  CommunityMutationResult?: CommunityMutationResultResolvers<ContextType>;
  CommunityPermissions?: CommunityPermissionsResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  CurrentUser?: CurrentUserResolvers<ContextType>;
  CustomView?: CustomViewResolvers<ContextType>;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DateTimeISO?: GraphQLScalarType;
  DeweyDecimal?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  FacetDetail?: FacetDetailResolvers<ContextType>;
  FileInfo?: FileInfoResolvers<ContextType>;
  GUID?: GraphQLScalarType;
  GeographyPoint?: GeographyPointResolvers<ContextType>;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPCPatent?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  LCCSubclass?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  ListingDetails?: ListingDetailsResolvers<ContextType>;
  LocalDate?: GraphQLScalarType;
  LocalDateTime?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Location?: LocationResolvers<ContextType>;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  MemberAccount?: MemberAccountResolvers<ContextType>;
  MemberAvatarImageAuthHeaderResult?: MemberAvatarImageAuthHeaderResultResolvers<ContextType>;
  MemberMutationResult?: MemberMutationResultResolvers<ContextType>;
  MemberProfile?: MemberProfileResolvers<ContextType>;
  MongoBase?: MongoBaseResolvers<ContextType>;
  MongoSubdocument?: MongoSubdocumentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResult?: MutationResultResolvers<ContextType>;
  MutationStatus?: MutationStatusResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Point?: PointResolvers<ContextType>;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Property?: PropertyResolvers<ContextType>;
  PropertyBlobFileAuthHeaderResult?: PropertyBlobFileAuthHeaderResultResolvers<ContextType>;
  PropertyMutationResult?: PropertyMutationResultResolvers<ContextType>;
  PropertyPermissions?: PropertyPermissionsResolvers<ContextType>;
  PropertyResult?: PropertyResultResolvers<ContextType>;
  PropertySearchFacets?: PropertySearchFacetsResolvers<ContextType>;
  PropertySearchResult?: PropertySearchResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  Role?: RoleResolvers<ContextType>;
  RoleMutationResult?: RoleMutationResultResolvers<ContextType>;
  RolePermissions?: RolePermissionsResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  Service?: ServiceResolvers<ContextType>;
  ServiceMutationResult?: ServiceMutationResultResolvers<ContextType>;
  ServiceTicket?: ServiceTicketResolvers<ContextType>;
  ServiceTicketActivityDetail?: ServiceTicketActivityDetailResolvers<ContextType>;
  ServiceTicketMutationResult?: ServiceTicketMutationResultResolvers<ContextType>;
  ServiceTicketPermissions?: ServiceTicketPermissionsResolvers<ContextType>;
  ServiceTicketPhoto?: ServiceTicketPhotoResolvers<ContextType>;
  ServiceTicketPhotoAuthHeaderResult?: ServiceTicketPhotoAuthHeaderResultResolvers<ContextType>;
  ServiceTicketsResult?: ServiceTicketsResultResolvers<ContextType>;
  ServiceTicketsSearchFacets?: ServiceTicketsSearchFacetsResolvers<ContextType>;
  ServiceTicketsSearchResult?: ServiceTicketsSearchResultResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserMutationResult?: UserMutationResultResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = GraphqlContext> = ResolversObject<{
  cacheControl22?: CacheControl22DirectiveResolver<any, any, ContextType>;
}>;
