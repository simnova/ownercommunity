import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  Date: any;
  DateTime: any;
  Duration: any;
  EmailAddress: any;
  GUID: any;
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

export type AdditionalAmenities = {
  __typename?: 'AdditionalAmenities';
  amenities?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
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

export type BedroomDetails = {
  __typename?: 'BedroomDetails';
  bedDescriptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ObjectID'];
  roomName?: Maybe<Scalars['String']>;
};

export type BedroomDetailsInput = {
  bedDescriptions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ObjectID']>;
  roomName?: InputMaybe<Scalars['String']>;
};

export type BlobAuthHeader = {
  __typename?: 'BlobAuthHeader';
  authHeader?: Maybe<Scalars['String']>;
  blobContainer?: Maybe<Scalars['String']>;
  blobName?: Maybe<Scalars['String']>;
  requestDate?: Maybe<Scalars['String']>;
};

/**  Required to enable Apollo Cache Control  */
export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Community = MongoBase & {
  __typename?: 'Community';
  createdAt?: Maybe<Scalars['DateTime']>;
  domain?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Maybe<FileInfo>>>;
  filesByType?: Maybe<Array<Maybe<FileInfo>>>;
  handle?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  name?: Maybe<Scalars['String']>;
  publicContentBlobUrl?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
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

export type CommunityMutationResult = {
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
  distance?: InputMaybe<Scalars['Float']>;
  listedInfo?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  listingDetail?: InputMaybe<ListingDetailsFilterInput>;
  position?: InputMaybe<GeographyPointInput>;
  propertyType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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

export type Location = MongoBase & {
  __typename?: 'Location';
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  position?: Maybe<Point>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LocationInput = {
  address?: InputMaybe<AddressInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ObjectID']>;
  position?: InputMaybe<PointInput>;
  schemaVersion?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type Member = MongoBase & {
  __typename?: 'Member';
  accounts?: Maybe<Array<Maybe<MemberAccount>>>;
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  memberName?: Maybe<Scalars['String']>;
  profile?: Maybe<MemberProfile>;
  role?: Maybe<Role>;
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MemberAccount = MongoEmbeddedBase & {
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
  id: Scalars['ObjectID'];
  memberName: Scalars['String'];
  role: Scalars['ObjectID'];
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
export type MongoEmbeddedBase = {
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
  propertyRemoveOwner: PropertyMutationResult;
  propertyUpdate: PropertyMutationResult;
  roleAdd: RoleMutationResult;
  roleDeleteAndReassign: RoleMutationResult;
  roleUpdate: RoleMutationResult;
  serviceTicketAddPhoto: ServiceTicketPhotoAuthHeaderResult;
  serviceTicketAddUpdateActivity: ServiceTicketMutationResult;
  serviceTicketAssign: ServiceTicketMutationResult;
  serviceTicketChangeStatus: ServiceTicketMutationResult;
  serviceTicketCreate: ServiceTicketMutationResult;
  serviceTicketDelete: ServiceTicketMutationResult;
  serviceTicketRemovePhoto: ServiceTicketMutationResult;
  serviceTicketSubmit: ServiceTicketMutationResult;
  serviceTicketUpdate: ServiceTicketMutationResult;
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

export type Point = MongoBase & {
  __typename?: 'Point';
  coordinates?: Maybe<Array<Maybe<Scalars['Float']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  schemaVersion?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PointInput = {
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ObjectID']>;
  schemaVersion?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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
  propertyId: Scalars['ObjectID'];
};

export type PropertyDeleteInput = {
  id: Scalars['ObjectID'];
};

export type PropertyMutationResult = {
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
  listedForLease?: Maybe<Array<Maybe<FacetDetail>>>;
  listedForRent?: Maybe<Array<Maybe<FacetDetail>>>;
  listedForSale?: Maybe<Array<Maybe<FacetDetail>>>;
  type?: Maybe<Array<Maybe<FacetDetail>>>;
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
  serviceTicket?: Maybe<ServiceTicket>;
  serviceTicketsAssignedToCurrentUser?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsByCommunityId?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsClosedByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByCommunity?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
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
export type QueryServiceTicketArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsByCommunityIdArgs = {
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

export type RoleMutationResult = {
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
  status: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceTicketActivityDetail = MongoEmbeddedBase & {
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
  propertyId?: InputMaybe<Scalars['ObjectID']>;
  requestorId?: InputMaybe<Scalars['ObjectID']>;
  title: Scalars['String'];
};

export type ServiceTicketDeleteInput = {
  serviceTicketId: Scalars['ObjectID'];
};

export type ServiceTicketMutationResult = {
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

export type ServiceTicketPhoto = MongoEmbeddedBase & {
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
  serviceTicketId: Scalars['ObjectID'];
  title: Scalars['String'];
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

export type CommunityCreateContainerMutationCommunityCreateMutationVariables = Exact<{
  input: CommunityCreateInput;
}>;

export type CommunityCreateContainerMutationCommunityCreateMutation = {
  __typename?: 'Mutation';
  communityCreate?: {
    __typename?: 'CommunityMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    community?: {
      __typename?: 'Community';
      name?: string | null;
      domain?: string | null;
      whiteLabelDomain?: string | null;
      handle?: string | null;
      publicContentBlobUrl?: string | null;
      id: any;
      schemaVersion?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  } | null;
};

export type CommunityCreateContainerMutationCommunityCreateFieldsFragment = {
  __typename?: 'CommunityMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  community?: {
    __typename?: 'Community';
    name?: string | null;
    domain?: string | null;
    whiteLabelDomain?: string | null;
    handle?: string | null;
    publicContentBlobUrl?: string | null;
    id: any;
    schemaVersion?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type CommunityListContainerCommunitiesQueryQueryVariables = Exact<{ [key: string]: never }>;

export type CommunityListContainerCommunitiesQueryQuery = {
  __typename?: 'Query';
  communities?: Array<{
    __typename?: 'Community';
    name?: string | null;
    domain?: string | null;
    whiteLabelDomain?: string | null;
    handle?: string | null;
    publicContentBlobUrl?: string | null;
    id: any;
    schemaVersion?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type CommunityListContainerCommunitiesFieldsFragment = {
  __typename?: 'Community';
  name?: string | null;
  domain?: string | null;
  whiteLabelDomain?: string | null;
  handle?: string | null;
  publicContentBlobUrl?: string | null;
  id: any;
  schemaVersion?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminCommunityDetailContainerCommunityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminCommunityDetailContainerCommunityQuery = {
  __typename?: 'Query';
  communityById?: {
    __typename?: 'Community';
    name?: string | null;
    domain?: string | null;
    whiteLabelDomain?: string | null;
    handle?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminCommunityDetailContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  name?: string | null;
  domain?: string | null;
  whiteLabelDomain?: string | null;
  handle?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminCommunityMenuContainerCommunitiesQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminCommunityMenuContainerCommunitiesQueryQuery = {
  __typename?: 'Query';
  communities?: Array<{
    __typename?: 'Community';
    name?: string | null;
    domain?: string | null;
    whiteLabelDomain?: string | null;
    handle?: string | null;
    publicContentBlobUrl?: string | null;
    id: any;
    schemaVersion?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type AdminCommunityMenuContainerCommunitiesFieldsFragment = {
  __typename?: 'Community';
  name?: string | null;
  domain?: string | null;
  whiteLabelDomain?: string | null;
  handle?: string | null;
  publicContentBlobUrl?: string | null;
  id: any;
  schemaVersion?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminMembersAccountsAddContainerMemberAccountAddMutationVariables = Exact<{
  input: MemberAccountAddInput;
}>;

export type AdminMembersAccountsAddContainerMemberAccountAddMutation = {
  __typename?: 'Mutation';
  memberAccountAdd: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      memberName?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  };
};

export type AdminMembersAccountsAddContainerMemberForUserQueryVariables = Exact<{
  userId: Scalars['ObjectID'];
}>;

export type AdminMembersAccountsAddContainerMemberForUserQuery = {
  __typename?: 'Query';
  memberForUser?: {
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminMembersAccountsAddContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminMembersAccountsAddContainerMemberFragment = {
  __typename?: 'Member';
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminMembersAccountsEditContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminMembersAccountsEditContainerMemberQuery = {
  __typename?: 'Query';
  member?: {
    __typename?: 'Member';
    id: any;
    accounts?: Array<{
      __typename?: 'MemberAccount';
      firstName: string;
      lastName?: string | null;
      statusCode?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      user?: { __typename?: 'User'; id: any; email?: any | null } | null;
    } | null> | null;
  } | null;
};

export type AdminMembersAccountsEditContainerMemberAccountEditMutationVariables = Exact<{
  input: MemberAccountEditInput;
}>;

export type AdminMembersAccountsEditContainerMemberAccountEditMutation = {
  __typename?: 'Mutation';
  memberAccountEdit: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      accounts?: Array<{
        __typename?: 'MemberAccount';
        firstName: string;
        lastName?: string | null;
        statusCode?: string | null;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        user?: { __typename?: 'User'; id: any; email?: any | null } | null;
      } | null> | null;
    } | null;
  };
};

export type AdminMembersAccountsEditContainerMemberAccountRemoveMutationVariables = Exact<{
  input: MemberAccountRemoveInput;
}>;

export type AdminMembersAccountsEditContainerMemberAccountRemoveMutation = {
  __typename?: 'Mutation';
  memberAccountRemove: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      accounts?: Array<{
        __typename?: 'MemberAccount';
        firstName: string;
        lastName?: string | null;
        statusCode?: string | null;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        user?: { __typename?: 'User'; id: any; email?: any | null } | null;
      } | null> | null;
    } | null;
  };
};

export type AdminMembersAccountsEditContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    id: any;
    accounts?: Array<{
      __typename?: 'MemberAccount';
      firstName: string;
      lastName?: string | null;
      statusCode?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      user?: { __typename?: 'User'; id: any; email?: any | null } | null;
    } | null> | null;
  } | null;
};

export type AdminMembersAccountEditContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  accounts?: Array<{
    __typename?: 'MemberAccount';
    firstName: string;
    lastName?: string | null;
    statusCode?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    user?: { __typename?: 'User'; id: any; email?: any | null } | null;
  } | null> | null;
};

export type AdminMembersAccountsListContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminMembersAccountsListContainerMemberQuery = {
  __typename?: 'Query';
  member?: {
    __typename?: 'Member';
    id: any;
    accounts?: Array<{
      __typename?: 'MemberAccount';
      firstName: string;
      lastName?: string | null;
      statusCode?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      user?: { __typename?: 'User'; id: any; email?: any | null } | null;
    } | null> | null;
  } | null;
};

export type AdminMembersAccountsListContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  accounts?: Array<{
    __typename?: 'MemberAccount';
    firstName: string;
    lastName?: string | null;
    statusCode?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    user?: { __typename?: 'User'; id: any; email?: any | null } | null;
  } | null> | null;
};

export type AdminMembersCreateContainerMemberCreateMutationVariables = Exact<{
  input: MemberCreateInput;
}>;

export type AdminMembersCreateContainerMemberCreateMutation = {
  __typename?: 'Mutation';
  memberCreate: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      memberName?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  };
};

export type AdminMembersCreateContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminMembersCreateContainerMemberFragment = {
  __typename?: 'Member';
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminMembersDetailContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminMembersDetailContainerMemberQuery = {
  __typename?: 'Query';
  member?: {
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: 'Role'; id: any; roleName: string } | null;
  } | null;
};

export type AdminMembersDetailContainerRolesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminMembersDetailContainerRolesQuery = {
  __typename?: 'Query';
  rolesByCommunityId?: Array<{
    __typename?: 'Role';
    roleName: string;
    isDefault: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type AdminMembersDetailContainerMemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
}>;

export type AdminMembersDetailContainerMemberUpdateMutation = {
  __typename?: 'Mutation';
  memberUpdate: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      memberName?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      role?: { __typename?: 'Role'; id: any; roleName: string } | null;
    } | null;
  };
};

export type AdminMembersDetailContainerMutationFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: 'Role'; id: any; roleName: string } | null;
  } | null;
};

export type AdminMembersDetailContainerMemberFieldsFragment = {
  __typename?: 'Member';
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  role?: { __typename?: 'Role'; id: any; roleName: string } | null;
};

export type AdminMembersDetailContainerRolesFieldsFragment = {
  __typename?: 'Role';
  roleName: string;
  isDefault: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminMembersListContainerMembersQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminMembersListContainerMembersQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: 'Role'; roleName: string } | null;
  } | null> | null;
};

export type AdminMembersListContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  role?: { __typename?: 'Role'; roleName: string } | null;
};

export type AdminMembersProfileContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminMembersProfileContainerMemberQuery = {
  __typename?: 'Query';
  member?: {
    __typename?: 'Member';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    profile?: {
      __typename?: 'MemberProfile';
      name?: string | null;
      email?: string | null;
      bio?: string | null;
      avatarDocumentId?: string | null;
      interests?: Array<string | null> | null;
      showInterests?: boolean | null;
      showEmail?: boolean | null;
      showLocation?: boolean | null;
      showProfile?: boolean | null;
      showProperties?: boolean | null;
    } | null;
  } | null;
};

export type AdminMembersProfileContainerMemberUpdateMutationVariables = Exact<{
  input: MemberProfileUpdateInput;
}>;

export type AdminMembersProfileContainerMemberUpdateMutation = {
  __typename?: 'Mutation';
  memberProfileUpdate: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      profile?: {
        __typename?: 'MemberProfile';
        name?: string | null;
        email?: string | null;
        bio?: string | null;
        avatarDocumentId?: string | null;
        interests?: Array<string | null> | null;
        showInterests?: boolean | null;
        showEmail?: boolean | null;
        showLocation?: boolean | null;
        showProfile?: boolean | null;
        showProperties?: boolean | null;
      } | null;
    } | null;
  };
};

export type AdminMembersProfileContainerMutationFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    profile?: {
      __typename?: 'MemberProfile';
      name?: string | null;
      email?: string | null;
      bio?: string | null;
      avatarDocumentId?: string | null;
      interests?: Array<string | null> | null;
      showInterests?: boolean | null;
      showEmail?: boolean | null;
      showLocation?: boolean | null;
      showProfile?: boolean | null;
      showProperties?: boolean | null;
    } | null;
  } | null;
};

export type AdminMembersProfileContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  profile?: {
    __typename?: 'MemberProfile';
    name?: string | null;
    email?: string | null;
    bio?: string | null;
    avatarDocumentId?: string | null;
    interests?: Array<string | null> | null;
    showInterests?: boolean | null;
    showEmail?: boolean | null;
    showLocation?: boolean | null;
    showProfile?: boolean | null;
    showProperties?: boolean | null;
  } | null;
};

export type AdminPhotoUploadContainerContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminPhotoUploadContainerContainerMemberQuery = {
  __typename?: 'Query';
  member?: {
    __typename?: 'Member';
    id: any;
    profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
  } | null;
};

export type AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutationVariables = Exact<{
  input: MemberAvatarImageInput;
}>;

export type AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  memberProfileAvatarCreateAuthHeader: {
    __typename?: 'MemberAvatarImageAuthHeaderResult';
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobName?: string | null;
      blobContainer?: string | null;
      requestDate?: string | null;
    } | null;
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
    } | null;
  };
};

export type AdminPhotoUploadContainerMemberProfileAvatarRemoveMutationVariables = Exact<{
  memberId: Scalars['ObjectID'];
}>;

export type AdminPhotoUploadContainerMemberProfileAvatarRemoveMutation = {
  __typename?: 'Mutation';
  memberProfileAvatarRemove: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
    } | null;
  };
};

export type AdminPhotoUploadContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    id: any;
    profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
  } | null;
};

export type AdminPhotoUploadContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
};

export type AdminPropertiesAddContainerPropertyAddMutationVariables = Exact<{
  input: PropertyAddInput;
}>;

export type AdminPropertiesAddContainerPropertyAddMutation = {
  __typename?: 'Mutation';
  propertyAdd: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      propertyName: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  };
};

export type AdminPropertiesAddContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: {
    __typename?: 'Property';
    propertyName: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminPropertiesAddContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  propertyName: string;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminPropertiesDetailContainerPropertyQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type AdminPropertiesDetailContainerPropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    listedForSale: boolean;
    listedForRent: boolean;
    listedForLease: boolean;
    listedInDirectory: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
  } | null;
};

export type AdminPropertiesDetailContainerMembersQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminPropertiesDetailContainerMembersQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type AdminPropertiesDetailContainerPropertyUpdateMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type AdminPropertiesDetailContainerPropertyUpdateMutation = {
  __typename?: 'Mutation';
  propertyUpdate: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      propertyName: string;
      propertyType?: string | null;
      listedForSale: boolean;
      listedForRent: boolean;
      listedForLease: boolean;
      listedInDirectory: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    } | null;
  };
};

export type AdminPropertiesDetailContainerPropertyDeleteMutationVariables = Exact<{
  input: PropertyDeleteInput;
}>;

export type AdminPropertiesDetailContainerPropertyDeleteMutation = {
  __typename?: 'Mutation';
  propertyDelete: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      propertyName: string;
      propertyType?: string | null;
      listedForSale: boolean;
      listedForRent: boolean;
      listedForLease: boolean;
      listedInDirectory: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    } | null;
  };
};

export type AdminPropertiesDetailContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: {
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    listedForSale: boolean;
    listedForRent: boolean;
    listedForLease: boolean;
    listedInDirectory: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
  } | null;
};

export type AdminPropertiesDetailContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  propertyName: string;
  propertyType?: string | null;
  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
};

export type AdminPropertiesDetailContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminPropertiesListContainerPropertiesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminPropertiesListContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesByCommunityId?: Array<{
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    owner?: { __typename?: 'Member'; memberName?: string | null } | null;
  } | null> | null;
};

export type AdminPropertiesListContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  propertyName: string;
  propertyType?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  owner?: { __typename?: 'Member'; memberName?: string | null } | null;
};

export type AdminRolesDeleteContainerRolesQueryVariables = Exact<{ [key: string]: never }>;

export type AdminRolesDeleteContainerRolesQuery = {
  __typename?: 'Query';
  roles?: Array<{
    __typename?: 'Role';
    roleName: string;
    isDefault: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type AdminRolesDeleteContainerRoleDeleteAndReassignMutationVariables = Exact<{
  input: RoleDeleteAndReassignInput;
}>;

export type AdminRolesDeleteContainerRoleDeleteAndReassignMutation = {
  __typename?: 'Mutation';
  roleDeleteAndReassign: {
    __typename?: 'RoleMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    role?: {
      __typename?: 'Role';
      roleName: string;
      isDefault: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  };
};

export type AdminRolesDeleteContainerRoleMutationResultFieldsFragment = {
  __typename?: 'RoleMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  role?: {
    __typename?: 'Role';
    roleName: string;
    isDefault: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminRolesDeleteContainerRolesFieldsFragment = {
  __typename?: 'Role';
  roleName: string;
  isDefault: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminRolesDetailContainerRoleQueryVariables = Exact<{
  Id: Scalars['ObjectID'];
}>;

export type AdminRolesDetailContainerRoleQuery = {
  __typename?: 'Query';
  role?: {
    __typename?: 'Role';
    roleName: string;
    isDefault: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    permissions: {
      __typename?: 'RolePermissions';
      serviceTicketPermissions: {
        __typename?: 'ServiceTicketPermissions';
        canCreateTickets: boolean;
        canManageTickets: boolean;
        canAssignTickets: boolean;
        canWorkOnTickets: boolean;
      };
      communityPermissions: {
        __typename?: 'CommunityPermissions';
        canManageRolesAndPermissions: boolean;
        canManageCommunitySettings: boolean;
        canManageSiteContent: boolean;
        canManageMembers: boolean;
        canEditOwnMemberProfile: boolean;
        canEditOwnMemberAccounts: boolean;
      };
      propertyPermissions: {
        __typename?: 'PropertyPermissions';
        canManageProperties: boolean;
        canEditOwnProperty: boolean;
      };
    };
  } | null;
};

export type AdminRolesDetailContainerRoleAddMutationVariables = Exact<{
  input: RoleAddInput;
}>;

export type AdminRolesDetailContainerRoleAddMutation = {
  __typename?: 'Mutation';
  roleAdd: {
    __typename?: 'RoleMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    role?: {
      __typename?: 'Role';
      roleName: string;
      isDefault: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      permissions: {
        __typename?: 'RolePermissions';
        serviceTicketPermissions: {
          __typename?: 'ServiceTicketPermissions';
          canCreateTickets: boolean;
          canManageTickets: boolean;
          canAssignTickets: boolean;
          canWorkOnTickets: boolean;
        };
        communityPermissions: {
          __typename?: 'CommunityPermissions';
          canManageRolesAndPermissions: boolean;
          canManageCommunitySettings: boolean;
          canManageSiteContent: boolean;
          canManageMembers: boolean;
          canEditOwnMemberProfile: boolean;
          canEditOwnMemberAccounts: boolean;
        };
        propertyPermissions: {
          __typename?: 'PropertyPermissions';
          canManageProperties: boolean;
          canEditOwnProperty: boolean;
        };
      };
    } | null;
  };
};

export type AdminRolesDetailContainerRoleUpdateMutationVariables = Exact<{
  input: RoleUpdateInput;
}>;

export type AdminRolesDetailContainerRoleUpdateMutation = {
  __typename?: 'Mutation';
  roleUpdate: {
    __typename?: 'RoleMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    role?: {
      __typename?: 'Role';
      roleName: string;
      isDefault: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      permissions: {
        __typename?: 'RolePermissions';
        serviceTicketPermissions: {
          __typename?: 'ServiceTicketPermissions';
          canCreateTickets: boolean;
          canManageTickets: boolean;
          canAssignTickets: boolean;
          canWorkOnTickets: boolean;
        };
        communityPermissions: {
          __typename?: 'CommunityPermissions';
          canManageRolesAndPermissions: boolean;
          canManageCommunitySettings: boolean;
          canManageSiteContent: boolean;
          canManageMembers: boolean;
          canEditOwnMemberProfile: boolean;
          canEditOwnMemberAccounts: boolean;
        };
        propertyPermissions: {
          __typename?: 'PropertyPermissions';
          canManageProperties: boolean;
          canEditOwnProperty: boolean;
        };
      };
    } | null;
  };
};

export type AdminRolesDetailContainerRoleMutationResultFieldsFragment = {
  __typename?: 'RoleMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  role?: {
    __typename?: 'Role';
    roleName: string;
    isDefault: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    permissions: {
      __typename?: 'RolePermissions';
      serviceTicketPermissions: {
        __typename?: 'ServiceTicketPermissions';
        canCreateTickets: boolean;
        canManageTickets: boolean;
        canAssignTickets: boolean;
        canWorkOnTickets: boolean;
      };
      communityPermissions: {
        __typename?: 'CommunityPermissions';
        canManageRolesAndPermissions: boolean;
        canManageCommunitySettings: boolean;
        canManageSiteContent: boolean;
        canManageMembers: boolean;
        canEditOwnMemberProfile: boolean;
        canEditOwnMemberAccounts: boolean;
      };
      propertyPermissions: {
        __typename?: 'PropertyPermissions';
        canManageProperties: boolean;
        canEditOwnProperty: boolean;
      };
    };
  } | null;
};

export type AdminRolesDetailContainerRoleFieldsFragment = {
  __typename?: 'Role';
  roleName: string;
  isDefault: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  permissions: {
    __typename?: 'RolePermissions';
    serviceTicketPermissions: {
      __typename?: 'ServiceTicketPermissions';
      canCreateTickets: boolean;
      canManageTickets: boolean;
      canAssignTickets: boolean;
      canWorkOnTickets: boolean;
    };
    communityPermissions: {
      __typename?: 'CommunityPermissions';
      canManageRolesAndPermissions: boolean;
      canManageCommunitySettings: boolean;
      canManageSiteContent: boolean;
      canManageMembers: boolean;
      canEditOwnMemberProfile: boolean;
      canEditOwnMemberAccounts: boolean;
    };
    propertyPermissions: {
      __typename?: 'PropertyPermissions';
      canManageProperties: boolean;
      canEditOwnProperty: boolean;
    };
  };
};

export type AdminRolesListContainerRolesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminRolesListContainerRolesQuery = {
  __typename?: 'Query';
  rolesByCommunityId?: Array<{
    __typename?: 'Role';
    roleName: string;
    isDefault: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type AdminRolesListContainerRolesFieldsFragment = {
  __typename?: 'Role';
  roleName: string;
  isDefault: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminServiceTicketsCreateContainerMembersQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminServiceTicketsCreateContainerMembersQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
  } | null> | null;
};

export type AdminServiceTicketsCreateContainerPropertiesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminServiceTicketsCreateContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesByCommunityId?: Array<{
    __typename?: 'Property';
    id: any;
    propertyName: string;
  } | null> | null;
};

export type AdminServiceTicketsCreateContainerServiceTicketCreateMutationVariables = Exact<{
  input: ServiceTicketCreateInput;
}>;

export type AdminServiceTicketsCreateContainerServiceTicketCreateMutation = {
  __typename?: 'Mutation';
  serviceTicketCreate: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null;
  };
};

export type AdminServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragment = {
  __typename?: 'ServiceTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    title: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
  } | null;
};

export type AdminServiceTicketsCreateContainerServiceTicketFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  status: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
  requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
};

export type AdminServiceTicketsCreateContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
};

export type AdminServiceTicketsCreateContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  propertyName: string;
};

export type AdminServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminServiceTicketsDetailContainerMembersAssignableToTicketsQuery = {
  __typename?: 'Query';
  membersAssignableToTickets?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
  } | null> | null;
};

export type AdminServiceTicketsDetailContainerPropertiesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminServiceTicketsDetailContainerPropertiesQuery = {
  __typename?: 'Query';
  properties?: Array<{ __typename?: 'Property'; id: any; propertyName: string } | null> | null;
};

export type AdminServiceTicketsDetailContainerServiceTicketQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type AdminServiceTicketsDetailContainerServiceTicketQuery = {
  __typename?: 'Query';
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    title: string;
    description: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    photos?: Array<{
      __typename?: 'ServiceTicketPhoto';
      documentId: string;
      description: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null> | null;
  } | null;
};

export type AdminServiceTicketsDetailContainerServiceTicketUpdateMutationVariables = Exact<{
  input: ServiceTicketUpdateInput;
}>;

export type AdminServiceTicketsDetailContainerServiceTicketUpdateMutation = {
  __typename?: 'Mutation';
  serviceTicketUpdate: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketsDetailContainerServiceTicketChangeStatusMutationVariables = Exact<{
  input: ServiceTicketChangeStatusInput;
}>;

export type AdminServiceTicketsDetailContainerServiceTicketChangeStatusMutation = {
  __typename?: 'Mutation';
  serviceTicketChangeStatus: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketsDetailContainerServiceAssignMutationVariables = Exact<{
  input: ServiceTicketAssignInput;
}>;

export type AdminServiceTicketsDetailContainerServiceAssignMutation = {
  __typename?: 'Mutation';
  serviceTicketAssign: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketsDetailContainerAddUpdateActivityMutationVariables = Exact<{
  input: ServiceTicketAddUpdateActivityInput;
}>;

export type AdminServiceTicketsDetailContainerAddUpdateActivityMutation = {
  __typename?: 'Mutation';
  serviceTicketAddUpdateActivity: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketDetailContainerServiceTicketDeleteMutationVariables = Exact<{
  input: ServiceTicketDeleteInput;
}>;

export type AdminServiceTicketDetailContainerServiceTicketDeleteMutation = {
  __typename?: 'Mutation';
  serviceTicketDelete: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragment = {
  __typename?: 'ServiceTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    title: string;
    description: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    photos?: Array<{
      __typename?: 'ServiceTicketPhoto';
      documentId: string;
      description: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null> | null;
  } | null;
};

export type AdminServiceTicketsDetailContainerServiceTicketFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  description: string;
  status: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
  requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
  assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
  photos?: Array<{
    __typename?: 'ServiceTicketPhoto';
    documentId: string;
    description: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
  activityLog?: Array<{
    __typename?: 'ServiceTicketActivityDetail';
    activityType: string;
    activityDescription: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
  } | null> | null;
};

export type AdminServiceTicketsDetailContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
};

export type AdminServiceTicketsDetailContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  propertyName: string;
};

export type AdminServiceTicketsListContainerServiceTicketsOpenByCommunityQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminServiceTicketsListContainerServiceTicketsOpenByCommunityQuery = {
  __typename?: 'Query';
  serviceTicketsByCommunityId?: Array<{
    __typename?: 'ServiceTicket';
    title: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    requestor: { __typename?: 'Member'; memberName?: string | null };
    assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
  } | null> | null;
};

export type AdminServiceTicketsListContainerServiceTicketsOpenByCommunityFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  requestor: { __typename?: 'Member'; memberName?: string | null };
  assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
};

export type AdminSettingsGeneralContainerCommunityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminSettingsGeneralContainerCommunityQuery = {
  __typename?: 'Query';
  communityById?: {
    __typename?: 'Community';
    name?: string | null;
    domain?: string | null;
    whiteLabelDomain?: string | null;
    handle?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminSettingsGeneralContainerCommunityUpdateMutationVariables = Exact<{
  input: CommunityUpdateInput;
}>;

export type AdminSettingsGeneralContainerCommunityUpdateMutation = {
  __typename?: 'Mutation';
  communityUpdate: {
    __typename?: 'CommunityMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    community?: {
      __typename?: 'Community';
      name?: string | null;
      domain?: string | null;
      whiteLabelDomain?: string | null;
      handle?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  };
};

export type AdminSettingsGeneralContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  name?: string | null;
  domain?: string | null;
  whiteLabelDomain?: string | null;
  handle?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutationVariables =
  Exact<{
    input: CommunityBlobContentInput;
  }>;

export type AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  communityPublicContentCreateAuthHeader: {
    __typename?: 'CommunityBlobContentAuthHeaderResult';
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobName?: string | null;
      blobContainer?: string | null;
      requestDate?: string | null;
    } | null;
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    community?: {
      __typename?: 'Community';
      name?: string | null;
      publicContentBlobUrl?: string | null;
      id: any;
      schemaVersion?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null;
  };
};

export type AdminSiteEditorContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  name?: string | null;
  publicContentBlobUrl?: string | null;
  id: any;
  schemaVersion?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminSiteEditorFilesListContainerCommunityByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminSiteEditorFilesListContainerCommunityByIdQuery = {
  __typename?: 'Query';
  communityById?: {
    __typename?: 'Community';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    files?: Array<{
      __typename?: 'FileInfo';
      name: string;
      size: number;
      type: string;
      url: string;
    } | null> | null;
  } | null;
};

export type AdminSiteEditorFilesListContainerCommunityPublicFileRemoveMutationVariables = Exact<{
  input: CommunityPublicFileRemoveInput;
}>;

export type AdminSiteEditorFilesListContainerCommunityPublicFileRemoveMutation = {
  __typename?: 'Mutation';
  communityPublicFileRemove: {
    __typename?: 'CommunityMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    community?: {
      __typename?: 'Community';
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      files?: Array<{
        __typename?: 'FileInfo';
        name: string;
        size: number;
        type: string;
        url: string;
      } | null> | null;
    } | null;
  };
};

export type AdminSiteEditorFilesListContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  files?: Array<{
    __typename?: 'FileInfo';
    name: string;
    size: number;
    type: string;
    url: string;
  } | null> | null;
};

export type AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutationVariables =
  Exact<{
    input: CommunityBlobFileInput;
  }>;

export type AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  communityPublicFileCreateAuthHeader: {
    __typename?: 'CommunityBlobContentAuthHeaderResult';
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobName?: string | null;
      blobContainer?: string | null;
      requestDate?: string | null;
    } | null;
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    community?: {
      __typename?: 'Community';
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      files?: Array<{
        __typename?: 'FileInfo';
        name: string;
        size: number;
        type: string;
        url: string;
      } | null> | null;
    } | null;
  };
};

export type AdminSiteEditorFilesUploadContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  files?: Array<{
    __typename?: 'FileInfo';
    name: string;
    size: number;
    type: string;
    url: string;
  } | null> | null;
};

export type MemberPropertyByPropertyIdQueryVariables = Exact<{
  propertyId: Scalars['ObjectID'];
}>;

export type MemberPropertyByPropertyIdQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    listedForLease: boolean;
    listedForRent: boolean;
    listedForSale: boolean;
    propertyName: string;
    propertyType?: string | null;
    owner?: { __typename?: 'Member'; memberName?: string | null } | null;
    location?: {
      __typename?: 'Location';
      address?: {
        __typename?: 'Address';
        streetName?: string | null;
        streetNumber?: string | null;
        freeformAddress?: string | null;
      } | null;
    } | null;
    listingDetail?: {
      __typename?: 'ListingDetails';
      amenities?: Array<string | null> | null;
      bathrooms?: number | null;
      bedrooms?: number | null;
      description?: string | null;
      floorPlan?: string | null;
      floorPlanImages?: Array<string | null> | null;
      images?: Array<string | null> | null;
      lease?: number | null;
      listingAgent?: string | null;
      listingAgentCompany?: string | null;
      listingAgentCompanyAddress?: string | null;
      listingAgentCompanyEmail?: string | null;
      listingAgentCompanyPhone?: string | null;
      listingAgentCompanyWebsite?: string | null;
      listingAgentEmail?: string | null;
      listingAgentPhone?: string | null;
      listingAgentWebsite?: string | null;
      maxGuests?: number | null;
      price?: number | null;
      rentHigh?: number | null;
      rentLow?: number | null;
      squareFeet?: number | null;
      video?: string | null;
      additionalAmenities?: Array<{
        __typename?: 'AdditionalAmenities';
        category?: string | null;
        amenities?: Array<string | null> | null;
      } | null> | null;
      bedroomDetails?: Array<{
        __typename?: 'BedroomDetails';
        roomName?: string | null;
        bedDescriptions?: Array<string | null> | null;
      } | null> | null;
    } | null;
  } | null;
};

export type PropertyDetailsByPropertyIdFieldsFragment = {
  __typename?: 'Property';
  listedForLease: boolean;
  listedForRent: boolean;
  listedForSale: boolean;
  propertyName: string;
  propertyType?: string | null;
  owner?: { __typename?: 'Member'; memberName?: string | null } | null;
  location?: {
    __typename?: 'Location';
    address?: {
      __typename?: 'Address';
      streetName?: string | null;
      streetNumber?: string | null;
      freeformAddress?: string | null;
    } | null;
  } | null;
  listingDetail?: {
    __typename?: 'ListingDetails';
    amenities?: Array<string | null> | null;
    bathrooms?: number | null;
    bedrooms?: number | null;
    description?: string | null;
    floorPlan?: string | null;
    floorPlanImages?: Array<string | null> | null;
    images?: Array<string | null> | null;
    lease?: number | null;
    listingAgent?: string | null;
    listingAgentCompany?: string | null;
    listingAgentCompanyAddress?: string | null;
    listingAgentCompanyEmail?: string | null;
    listingAgentCompanyPhone?: string | null;
    listingAgentCompanyWebsite?: string | null;
    listingAgentEmail?: string | null;
    listingAgentPhone?: string | null;
    listingAgentWebsite?: string | null;
    maxGuests?: number | null;
    price?: number | null;
    rentHigh?: number | null;
    rentLow?: number | null;
    squareFeet?: number | null;
    video?: string | null;
    additionalAmenities?: Array<{
      __typename?: 'AdditionalAmenities';
      category?: string | null;
      amenities?: Array<string | null> | null;
    } | null> | null;
    bedroomDetails?: Array<{
      __typename?: 'BedroomDetails';
      roomName?: string | null;
      bedDescriptions?: Array<string | null> | null;
    } | null> | null;
  } | null;
};

export type MemberPropertiesByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MemberPropertiesByCommunityIdQuery = {
  __typename?: 'Query';
  propertiesByCommunityId?: Array<{
    __typename?: 'Property';
    listedForLease: boolean;
    listedForRent: boolean;
    listedForSale: boolean;
    listedInDirectory: boolean;
    propertyName: string;
    propertyType?: string | null;
    id: any;
    owner?: { __typename?: 'Member'; memberName?: string | null } | null;
    listingDetail?: {
      __typename?: 'ListingDetails';
      bathrooms?: number | null;
      bedrooms?: number | null;
      squareFeet?: number | null;
    } | null;
    location?: {
      __typename?: 'Location';
      address?: {
        __typename?: 'Address';
        streetNumber?: string | null;
        streetName?: string | null;
      } | null;
    } | null;
  } | null> | null;
};

export type PropertyInformationFieldsFragment = {
  __typename?: 'Property';
  listedForLease: boolean;
  listedForRent: boolean;
  listedForSale: boolean;
  listedInDirectory: boolean;
  propertyName: string;
  propertyType?: string | null;
  id: any;
  owner?: { __typename?: 'Member'; memberName?: string | null } | null;
  listingDetail?: {
    __typename?: 'ListingDetails';
    bathrooms?: number | null;
    bedrooms?: number | null;
    squareFeet?: number | null;
  } | null;
  location?: {
    __typename?: 'Location';
    address?: {
      __typename?: 'Address';
      streetNumber?: string | null;
      streetName?: string | null;
    } | null;
  } | null;
};

export type CurrentMemberProfileByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ObjectID'];
}>;

export type CurrentMemberProfileByCommunityIdQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: {
    __typename?: 'Member';
    id: any;
    profile?: {
      __typename?: 'MemberProfile';
      avatarDocumentId?: string | null;
      bio?: string | null;
      email?: string | null;
      interests?: Array<string | null> | null;
      name?: string | null;
      showEmail?: boolean | null;
      showInterests?: boolean | null;
      showLocation?: boolean | null;
      showProfile?: boolean | null;
      showProperties?: boolean | null;
    } | null;
  } | null;
};

export type MembersProfileContainerMemberUpdateMutationVariables = Exact<{
  input: MemberProfileUpdateInput;
}>;

export type MembersProfileContainerMemberUpdateMutation = {
  __typename?: 'Mutation';
  memberProfileUpdate: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      profile?: {
        __typename?: 'MemberProfile';
        avatarDocumentId?: string | null;
        bio?: string | null;
        email?: string | null;
        interests?: Array<string | null> | null;
        name?: string | null;
        showEmail?: boolean | null;
        showInterests?: boolean | null;
        showLocation?: boolean | null;
        showProfile?: boolean | null;
        showProperties?: boolean | null;
      } | null;
    } | null;
  };
};

export type MembersProfileContainerMutationFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    id: any;
    profile?: {
      __typename?: 'MemberProfile';
      avatarDocumentId?: string | null;
      bio?: string | null;
      email?: string | null;
      interests?: Array<string | null> | null;
      name?: string | null;
      showEmail?: boolean | null;
      showInterests?: boolean | null;
      showLocation?: boolean | null;
      showProfile?: boolean | null;
      showProperties?: boolean | null;
    } | null;
  } | null;
};

export type CurrentMemberProfileByCommunityIdFieldsFragment = {
  __typename?: 'Member';
  id: any;
  profile?: {
    __typename?: 'MemberProfile';
    avatarDocumentId?: string | null;
    bio?: string | null;
    email?: string | null;
    interests?: Array<string | null> | null;
    name?: string | null;
    showEmail?: boolean | null;
    showInterests?: boolean | null;
    showLocation?: boolean | null;
    showProfile?: boolean | null;
    showProperties?: boolean | null;
  } | null;
};

export type MemberSiteNeighborsListContainerQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MemberSiteNeighborsListContainerQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
    accounts?: Array<{
      __typename?: 'MemberAccount';
      user?: { __typename?: 'User'; id: any; firstName?: string | null } | null;
    } | null> | null;
    profile?: {
      __typename?: 'MemberProfile';
      name?: string | null;
      email?: string | null;
      bio?: string | null;
      avatarDocumentId?: string | null;
      interests?: Array<string | null> | null;
      showInterests?: boolean | null;
      showEmail?: boolean | null;
      showProfile?: boolean | null;
      showLocation?: boolean | null;
      showProperties?: boolean | null;
    } | null;
  } | null> | null;
};

export type MemberSiteNeighborsListContainerFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  accounts?: Array<{
    __typename?: 'MemberAccount';
    user?: { __typename?: 'User'; id: any; firstName?: string | null } | null;
  } | null> | null;
  profile?: {
    __typename?: 'MemberProfile';
    name?: string | null;
    email?: string | null;
    bio?: string | null;
    avatarDocumentId?: string | null;
    interests?: Array<string | null> | null;
    showInterests?: boolean | null;
    showEmail?: boolean | null;
    showProfile?: boolean | null;
    showLocation?: boolean | null;
    showProperties?: boolean | null;
  } | null;
};

export type MemberSiteNeighborsListCurrentMemberIdQueryVariables = Exact<{
  communityId: Scalars['ObjectID'];
}>;

export type MemberSiteNeighborsListCurrentMemberIdQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: { __typename?: 'Member'; id: any } | null;
};

export type MemberPhotoUploadContainerContainerMemberQueryVariables = Exact<{
  communityId: Scalars['ObjectID'];
}>;

export type MemberPhotoUploadContainerContainerMemberQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: {
    __typename?: 'Member';
    id: any;
    profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
  } | null;
};

export type MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutationVariables = Exact<{
  input: MemberAvatarImageInput;
}>;

export type MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  memberProfileAvatarCreateAuthHeader: {
    __typename?: 'MemberAvatarImageAuthHeaderResult';
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobName?: string | null;
      blobContainer?: string | null;
      requestDate?: string | null;
    } | null;
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
    } | null;
  };
};

export type MemberPhotoUploadContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
};

export type MembersPropertiesDetailContainerPropertyQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersPropertiesDetailContainerPropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    listedForSale: boolean;
    listedForRent: boolean;
    listedForLease: boolean;
    listedInDirectory: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
  } | null;
};

export type MembersPropertiesDetailContainerMembersQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MembersPropertiesDetailContainerMembersQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type MembersPropertiesDetailContainerPropertyUpdateMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type MembersPropertiesDetailContainerPropertyUpdateMutation = {
  __typename?: 'Mutation';
  propertyUpdate: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      propertyName: string;
      propertyType?: string | null;
      listedForSale: boolean;
      listedForRent: boolean;
      listedForLease: boolean;
      listedInDirectory: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    } | null;
  };
};

export type MembersPropertiesDetailContainerPropertyDeleteMutationVariables = Exact<{
  input: PropertyDeleteInput;
}>;

export type MembersPropertiesDetailContainerPropertyDeleteMutation = {
  __typename?: 'Mutation';
  propertyDelete: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      propertyName: string;
      propertyType?: string | null;
      listedForSale: boolean;
      listedForRent: boolean;
      listedForLease: boolean;
      listedInDirectory: boolean;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    } | null;
  };
};

export type MembersPropertiesDetailContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: {
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    listedForSale: boolean;
    listedForRent: boolean;
    listedForLease: boolean;
    listedInDirectory: boolean;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
  } | null;
};

export type MembersPropertiesDetailContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  propertyName: string;
  propertyType?: string | null;
  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  owner?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
};

export type MembersPropertiesDetailContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutationVariables =
  Exact<{
    input: PropertyBlobFileInput;
  }>;

export type MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutation =
  {
    __typename?: 'Mutation';
    propertyFloorPlanImageCreateAuthHeader: {
      __typename?: 'PropertyBlobFileAuthHeaderResult';
      authHeader?: {
        __typename?: 'BlobAuthHeader';
        authHeader?: string | null;
        blobName?: string | null;
        blobContainer?: string | null;
        requestDate?: string | null;
      } | null;
      status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
      property?: {
        __typename?: 'Property';
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        listingDetail?: {
          __typename?: 'ListingDetails';
          floorPlanImages?: Array<string | null> | null;
        } | null;
      } | null;
    };
  };

export type MembersPropertiesFloorPlanImageUploadContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  listingDetail?: {
    __typename?: 'ListingDetails';
    floorPlanImages?: Array<string | null> | null;
  } | null;
};

export type MembersPropertiesListContainerPropertiesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MembersPropertiesListContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesForCurrentUserByCommunityId?: Array<{
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    owner?: { __typename?: 'Member'; memberName?: string | null } | null;
  } | null> | null;
};

export type MembersPropertiesListContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  propertyName: string;
  propertyType?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  owner?: { __typename?: 'Member'; memberName?: string | null } | null;
};

export type MemberPropertiesListSearchContainerPropertiesQueryVariables = Exact<{
  input: PropertiesSearchInput;
}>;

export type MemberPropertiesListSearchContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesSearch?: {
    __typename?: 'PropertySearchResult';
    count?: number | null;
    propertyResults?: Array<{
      __typename?: 'PropertyResult';
      communityId?: string | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
      bedrooms?: number | null;
      amenities?: Array<string | null> | null;
      price?: number | null;
      bathrooms?: number | null;
      squareFeet?: number | null;
      images?: Array<string | null> | null;
      listingAgentCompany?: string | null;
      listedForSale?: boolean | null;
      listedForRent?: boolean | null;
      listedForLease?: boolean | null;
      updatedAt?: any | null;
      additionalAmenities?: Array<{
        __typename?: 'AdditionalAmenitiesSearchResult';
        category?: string | null;
        amenities?: Array<string | null> | null;
      } | null> | null;
      position?: {
        __typename?: 'GeographyPoint';
        latitude?: number | null;
        longitude?: number | null;
      } | null;
      address?: {
        __typename?: 'Address';
        streetNumber?: string | null;
        streetName?: string | null;
        municipality?: string | null;
        municipalitySubdivision?: string | null;
        localName?: string | null;
        countrySecondarySubdivision?: string | null;
        countryTertiarySubdivision?: string | null;
        countrySubdivision?: string | null;
        countrySubdivisionName?: string | null;
        postalCode?: string | null;
        extendedPostalCode?: string | null;
        countryCode?: string | null;
        country?: string | null;
        countryCodeISO3?: string | null;
        freeformAddress?: string | null;
        streetNameAndNumber?: string | null;
        routeNumbers?: string | null;
        crossStreet?: string | null;
      } | null;
    } | null> | null;
    facets?: {
      __typename?: 'PropertySearchFacets';
      type?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      amenities?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      additionalAmenitiesCategory?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      additionalAmenitiesAmenities?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      listedForSale?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      listedForRent?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      listedForLease?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      bedrooms?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
      bathrooms?: Array<{
        __typename?: 'FacetDetail';
        value?: string | null;
        count?: number | null;
      } | null> | null;
    } | null;
  } | null;
};

export type MemberPropertiesListSearchContainerMapSasTokenQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MemberPropertiesListSearchContainerMapSasTokenQuery = {
  __typename?: 'Query';
  getMapSasToken?: string | null;
};

export type MemberPropertiesListSearchContainerPropertyFieldsFragment = {
  __typename?: 'PropertySearchResult';
  count?: number | null;
  propertyResults?: Array<{
    __typename?: 'PropertyResult';
    communityId?: string | null;
    id?: string | null;
    name?: string | null;
    type?: string | null;
    bedrooms?: number | null;
    amenities?: Array<string | null> | null;
    price?: number | null;
    bathrooms?: number | null;
    squareFeet?: number | null;
    images?: Array<string | null> | null;
    listingAgentCompany?: string | null;
    listedForSale?: boolean | null;
    listedForRent?: boolean | null;
    listedForLease?: boolean | null;
    updatedAt?: any | null;
    additionalAmenities?: Array<{
      __typename?: 'AdditionalAmenitiesSearchResult';
      category?: string | null;
      amenities?: Array<string | null> | null;
    } | null> | null;
    position?: {
      __typename?: 'GeographyPoint';
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    address?: {
      __typename?: 'Address';
      streetNumber?: string | null;
      streetName?: string | null;
      municipality?: string | null;
      municipalitySubdivision?: string | null;
      localName?: string | null;
      countrySecondarySubdivision?: string | null;
      countryTertiarySubdivision?: string | null;
      countrySubdivision?: string | null;
      countrySubdivisionName?: string | null;
      postalCode?: string | null;
      extendedPostalCode?: string | null;
      countryCode?: string | null;
      country?: string | null;
      countryCodeISO3?: string | null;
      freeformAddress?: string | null;
      streetNameAndNumber?: string | null;
      routeNumbers?: string | null;
      crossStreet?: string | null;
    } | null;
  } | null> | null;
  facets?: {
    __typename?: 'PropertySearchFacets';
    type?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    amenities?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    additionalAmenitiesCategory?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    additionalAmenitiesAmenities?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    listedForSale?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    listedForRent?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    listedForLease?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    bedrooms?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
    bathrooms?: Array<{
      __typename?: 'FacetDetail';
      value?: string | null;
      count?: number | null;
    } | null> | null;
  } | null;
};

export type MembersPropertiesListSearchContainerPropertyResultFieldsFragment = {
  __typename?: 'PropertyResult';
  communityId?: string | null;
  id?: string | null;
  name?: string | null;
  type?: string | null;
  bedrooms?: number | null;
  amenities?: Array<string | null> | null;
  price?: number | null;
  bathrooms?: number | null;
  squareFeet?: number | null;
  images?: Array<string | null> | null;
  listingAgentCompany?: string | null;
  listedForSale?: boolean | null;
  listedForRent?: boolean | null;
  listedForLease?: boolean | null;
  updatedAt?: any | null;
  additionalAmenities?: Array<{
    __typename?: 'AdditionalAmenitiesSearchResult';
    category?: string | null;
    amenities?: Array<string | null> | null;
  } | null> | null;
  position?: {
    __typename?: 'GeographyPoint';
    latitude?: number | null;
    longitude?: number | null;
  } | null;
  address?: {
    __typename?: 'Address';
    streetNumber?: string | null;
    streetName?: string | null;
    municipality?: string | null;
    municipalitySubdivision?: string | null;
    localName?: string | null;
    countrySecondarySubdivision?: string | null;
    countryTertiarySubdivision?: string | null;
    countrySubdivision?: string | null;
    countrySubdivisionName?: string | null;
    postalCode?: string | null;
    extendedPostalCode?: string | null;
    countryCode?: string | null;
    country?: string | null;
    countryCodeISO3?: string | null;
    freeformAddress?: string | null;
    streetNameAndNumber?: string | null;
    routeNumbers?: string | null;
    crossStreet?: string | null;
  } | null;
};

export type MembersPropertiesListingContainerPropertyQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersPropertiesListingContainerPropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    listingDetail?: {
      __typename?: 'ListingDetails';
      price?: number | null;
      rentHigh?: number | null;
      rentLow?: number | null;
      lease?: number | null;
      maxGuests?: number | null;
      bedrooms?: number | null;
      bathrooms?: number | null;
      squareFeet?: number | null;
      description?: string | null;
      amenities?: Array<string | null> | null;
      images?: Array<string | null> | null;
      video?: string | null;
      floorPlan?: string | null;
      floorPlanImages?: Array<string | null> | null;
      listingAgent?: string | null;
      listingAgentPhone?: string | null;
      listingAgentEmail?: string | null;
      listingAgentWebsite?: string | null;
      listingAgentCompany?: string | null;
      listingAgentCompanyPhone?: string | null;
      listingAgentCompanyEmail?: string | null;
      listingAgentCompanyWebsite?: string | null;
      listingAgentCompanyAddress?: string | null;
      bedroomDetails?: Array<{
        __typename?: 'BedroomDetails';
        id: any;
        bedDescriptions?: Array<string | null> | null;
        roomName?: string | null;
      } | null> | null;
      additionalAmenities?: Array<{
        __typename?: 'AdditionalAmenities';
        id: any;
        category?: string | null;
        amenities?: Array<string | null> | null;
      } | null> | null;
    } | null;
  } | null;
};

export type MembersPropertiesListingContainerPropertyUpdateMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type MembersPropertiesListingContainerPropertyUpdateMutation = {
  __typename?: 'Mutation';
  propertyUpdate: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      propertyName: string;
      propertyType?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      listingDetail?: {
        __typename?: 'ListingDetails';
        price?: number | null;
        rentHigh?: number | null;
        rentLow?: number | null;
        lease?: number | null;
        maxGuests?: number | null;
        bedrooms?: number | null;
        bathrooms?: number | null;
        squareFeet?: number | null;
        description?: string | null;
        amenities?: Array<string | null> | null;
        images?: Array<string | null> | null;
        video?: string | null;
        floorPlan?: string | null;
        floorPlanImages?: Array<string | null> | null;
        listingAgent?: string | null;
        listingAgentPhone?: string | null;
        listingAgentEmail?: string | null;
        listingAgentWebsite?: string | null;
        listingAgentCompany?: string | null;
        listingAgentCompanyPhone?: string | null;
        listingAgentCompanyEmail?: string | null;
        listingAgentCompanyWebsite?: string | null;
        listingAgentCompanyAddress?: string | null;
        bedroomDetails?: Array<{
          __typename?: 'BedroomDetails';
          id: any;
          bedDescriptions?: Array<string | null> | null;
          roomName?: string | null;
        } | null> | null;
        additionalAmenities?: Array<{
          __typename?: 'AdditionalAmenities';
          id: any;
          category?: string | null;
          amenities?: Array<string | null> | null;
        } | null> | null;
      } | null;
    } | null;
  };
};

export type MembersPropertiesListingContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: {
    __typename?: 'Property';
    propertyName: string;
    propertyType?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    listingDetail?: {
      __typename?: 'ListingDetails';
      price?: number | null;
      rentHigh?: number | null;
      rentLow?: number | null;
      lease?: number | null;
      maxGuests?: number | null;
      bedrooms?: number | null;
      bathrooms?: number | null;
      squareFeet?: number | null;
      description?: string | null;
      amenities?: Array<string | null> | null;
      images?: Array<string | null> | null;
      video?: string | null;
      floorPlan?: string | null;
      floorPlanImages?: Array<string | null> | null;
      listingAgent?: string | null;
      listingAgentPhone?: string | null;
      listingAgentEmail?: string | null;
      listingAgentWebsite?: string | null;
      listingAgentCompany?: string | null;
      listingAgentCompanyPhone?: string | null;
      listingAgentCompanyEmail?: string | null;
      listingAgentCompanyWebsite?: string | null;
      listingAgentCompanyAddress?: string | null;
      bedroomDetails?: Array<{
        __typename?: 'BedroomDetails';
        id: any;
        bedDescriptions?: Array<string | null> | null;
        roomName?: string | null;
      } | null> | null;
      additionalAmenities?: Array<{
        __typename?: 'AdditionalAmenities';
        id: any;
        category?: string | null;
        amenities?: Array<string | null> | null;
      } | null> | null;
    } | null;
  } | null;
};

export type MembersPropertiesListingContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  propertyName: string;
  propertyType?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  listingDetail?: {
    __typename?: 'ListingDetails';
    price?: number | null;
    rentHigh?: number | null;
    rentLow?: number | null;
    lease?: number | null;
    maxGuests?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    squareFeet?: number | null;
    description?: string | null;
    amenities?: Array<string | null> | null;
    images?: Array<string | null> | null;
    video?: string | null;
    floorPlan?: string | null;
    floorPlanImages?: Array<string | null> | null;
    listingAgent?: string | null;
    listingAgentPhone?: string | null;
    listingAgentEmail?: string | null;
    listingAgentWebsite?: string | null;
    listingAgentCompany?: string | null;
    listingAgentCompanyPhone?: string | null;
    listingAgentCompanyEmail?: string | null;
    listingAgentCompanyWebsite?: string | null;
    listingAgentCompanyAddress?: string | null;
    bedroomDetails?: Array<{
      __typename?: 'BedroomDetails';
      id: any;
      bedDescriptions?: Array<string | null> | null;
      roomName?: string | null;
    } | null> | null;
    additionalAmenities?: Array<{
      __typename?: 'AdditionalAmenities';
      id: any;
      category?: string | null;
      amenities?: Array<string | null> | null;
    } | null> | null;
  } | null;
};

export type MembersPropertiesListingContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutationVariables =
  Exact<{
    input: PropertyBlobFileInput;
  }>;

export type MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutation =
  {
    __typename?: 'Mutation';
    propertyListingImageCreateAuthHeader: {
      __typename?: 'PropertyBlobFileAuthHeaderResult';
      authHeader?: {
        __typename?: 'BlobAuthHeader';
        authHeader?: string | null;
        blobName?: string | null;
        blobContainer?: string | null;
        requestDate?: string | null;
      } | null;
      status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
      property?: {
        __typename?: 'Property';
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        listingDetail?: {
          __typename?: 'ListingDetails';
          images?: Array<string | null> | null;
        } | null;
      } | null;
    };
  };

export type MembersPropertiesListingImageUploadContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  listingDetail?: { __typename?: 'ListingDetails'; images?: Array<string | null> | null } | null;
};

export type PropertiesLocationContainerPropertyQueryVariables = Exact<{
  propertyId: Scalars['ObjectID'];
}>;

export type PropertiesLocationContainerPropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    mapSASToken?: string | null;
    id: any;
    location?: {
      __typename?: 'Location';
      address?: {
        __typename?: 'Address';
        country?: string | null;
        countryCode?: string | null;
        countryCodeISO3?: string | null;
        countrySecondarySubdivision?: string | null;
        countrySubdivision?: string | null;
        countrySubdivisionName?: string | null;
        countryTertiarySubdivision?: string | null;
        extendedPostalCode?: string | null;
        freeformAddress?: string | null;
        municipality?: string | null;
        municipalitySubdivision?: string | null;
        crossStreet?: string | null;
        localName?: string | null;
        postalCode?: string | null;
        streetName?: string | null;
        streetNumber?: string | null;
        routeNumbers?: string | null;
        streetNameAndNumber?: string | null;
      } | null;
      position?: { __typename?: 'Point'; coordinates?: Array<number | null> | null } | null;
    } | null;
  } | null;
};

export type AddressLocationUpdateContainerMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type AddressLocationUpdateContainerMutation = {
  __typename?: 'Mutation';
  propertyUpdate: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: {
      __typename?: 'Property';
      id: any;
      location?: {
        __typename?: 'Location';
        address?: {
          __typename?: 'Address';
          country?: string | null;
          countryCode?: string | null;
          countryCodeISO3?: string | null;
          countrySecondarySubdivision?: string | null;
          countrySubdivision?: string | null;
          countrySubdivisionName?: string | null;
          countryTertiarySubdivision?: string | null;
          extendedPostalCode?: string | null;
          freeformAddress?: string | null;
          municipality?: string | null;
          municipalitySubdivision?: string | null;
          crossStreet?: string | null;
          localName?: string | null;
          postalCode?: string | null;
          streetName?: string | null;
          streetNumber?: string | null;
          routeNumbers?: string | null;
          streetNameAndNumber?: string | null;
        } | null;
        position?: { __typename?: 'Point'; coordinates?: Array<number | null> | null } | null;
      } | null;
    } | null;
  };
};

export type AddressLocationContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: {
    __typename?: 'Property';
    id: any;
    location?: {
      __typename?: 'Location';
      address?: {
        __typename?: 'Address';
        country?: string | null;
        countryCode?: string | null;
        countryCodeISO3?: string | null;
        countrySecondarySubdivision?: string | null;
        countrySubdivision?: string | null;
        countrySubdivisionName?: string | null;
        countryTertiarySubdivision?: string | null;
        extendedPostalCode?: string | null;
        freeformAddress?: string | null;
        municipality?: string | null;
        municipalitySubdivision?: string | null;
        crossStreet?: string | null;
        localName?: string | null;
        postalCode?: string | null;
        streetName?: string | null;
        streetNumber?: string | null;
        routeNumbers?: string | null;
        streetNameAndNumber?: string | null;
      } | null;
      position?: { __typename?: 'Point'; coordinates?: Array<number | null> | null } | null;
    } | null;
  } | null;
};

export type AddressLocationContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  location?: {
    __typename?: 'Location';
    address?: {
      __typename?: 'Address';
      country?: string | null;
      countryCode?: string | null;
      countryCodeISO3?: string | null;
      countrySecondarySubdivision?: string | null;
      countrySubdivision?: string | null;
      countrySubdivisionName?: string | null;
      countryTertiarySubdivision?: string | null;
      extendedPostalCode?: string | null;
      freeformAddress?: string | null;
      municipality?: string | null;
      municipalitySubdivision?: string | null;
      crossStreet?: string | null;
      localName?: string | null;
      postalCode?: string | null;
      streetName?: string | null;
      streetNumber?: string | null;
      routeNumbers?: string | null;
      streetNameAndNumber?: string | null;
    } | null;
    position?: { __typename?: 'Point'; coordinates?: Array<number | null> | null } | null;
  } | null;
};

export type MembersServiceTicketsCreateContainerMembersQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MembersServiceTicketsCreateContainerMembersQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
  } | null> | null;
};

export type MembersServiceTicketsCreateContainerPropertiesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MembersServiceTicketsCreateContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesForCurrentUserByCommunityId?: Array<{
    __typename?: 'Property';
    id: any;
    propertyName: string;
  } | null> | null;
};

export type MembersServiceTicketsCreateContainerServiceTicketCreateMutationVariables = Exact<{
  input: ServiceTicketCreateInput;
}>;

export type MembersServiceTicketsCreateContainerServiceTicketCreateMutation = {
  __typename?: 'Mutation';
  serviceTicketCreate: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null;
  };
};

export type MembersServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragment = {
  __typename?: 'ServiceTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    title: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
  } | null;
};

export type MembersServiceTicketsCreateContainerServiceTicketFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  status: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
  requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
};

export type MembersServiceTicketsCreateContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
};

export type MembersServiceTicketsCreateContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  propertyName: string;
};

export type MembersServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MembersServiceTicketsDetailContainerMembersAssignableToTicketsQuery = {
  __typename?: 'Query';
  membersAssignableToTickets?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
  } | null> | null;
};

export type MembersServiceTicketsDetailContainerPropertiesQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MembersServiceTicketsDetailContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesForCurrentUserByCommunityId?: Array<{
    __typename?: 'Property';
    id: any;
    propertyName: string;
  } | null> | null;
};

export type MembersServiceTicketsDetailContainerServiceTicketQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersServiceTicketsDetailContainerServiceTicketQuery = {
  __typename?: 'Query';
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    title: string;
    description: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    photos?: Array<{
      __typename?: 'ServiceTicketPhoto';
      documentId: string;
      description: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null> | null;
  } | null;
};

export type MembersServiceTicketsDetailContainerServiceTicketUpdateMutationVariables = Exact<{
  input: ServiceTicketUpdateInput;
}>;

export type MembersServiceTicketsDetailContainerServiceTicketUpdateMutation = {
  __typename?: 'Mutation';
  serviceTicketUpdate: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type MembersServiceTicketsDetailContainerServiceTicketChangeStatusMutationVariables = Exact<{
  input: ServiceTicketChangeStatusInput;
}>;

export type MembersServiceTicketsDetailContainerServiceTicketChangeStatusMutation = {
  __typename?: 'Mutation';
  serviceTicketChangeStatus: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type MembersServiceTicketsDetailContainerServiceAssignMutationVariables = Exact<{
  input: ServiceTicketAssignInput;
}>;

export type MembersServiceTicketsDetailContainerServiceAssignMutation = {
  __typename?: 'Mutation';
  serviceTicketAssign: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type MembersServiceTicketsDetailContainerAddUpdateActivityMutationVariables = Exact<{
  input: ServiceTicketAddUpdateActivityInput;
}>;

export type MembersServiceTicketsDetailContainerAddUpdateActivityMutation = {
  __typename?: 'Mutation';
  serviceTicketAddUpdateActivity: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type MembersServiceTicketDetailContainerServiceTicketDeleteMutationVariables = Exact<{
  input: ServiceTicketDeleteInput;
}>;

export type MembersServiceTicketDetailContainerServiceTicketDeleteMutation = {
  __typename?: 'Mutation';
  serviceTicketDelete: {
    __typename?: 'ServiceTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
      assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
      photos?: Array<{
        __typename?: 'ServiceTicketPhoto';
        documentId: string;
        description: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
    } | null;
  };
};

export type MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragment = {
  __typename?: 'ServiceTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    title: string;
    description: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
    photos?: Array<{
      __typename?: 'ServiceTicketPhoto';
      documentId: string;
      description: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null> | null;
  } | null;
};

export type MembersServiceTicketsDetailContainerServiceTicketFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  description: string;
  status: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
  requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
  assignedTo?: { __typename?: 'Member'; id: any; memberName?: string | null } | null;
  photos?: Array<{
    __typename?: 'ServiceTicketPhoto';
    documentId: string;
    description: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
  activityLog?: Array<{
    __typename?: 'ServiceTicketActivityDetail';
    activityType: string;
    activityDescription: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
  } | null> | null;
};

export type MembersServiceTicketsDetailContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
};

export type MembersServiceTicketsDetailContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  propertyName: string;
};

export type MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQuery = {
  __typename?: 'Query';
  serviceTicketsOpenByRequestor?: Array<{
    __typename?: 'ServiceTicket';
    title: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    requestor: { __typename?: 'Member'; memberName?: string | null };
    assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
  } | null> | null;
};

export type MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  requestor: { __typename?: 'Member'; memberName?: string | null };
  assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
};

export type MemberSiteCurrentMemberHasAdminRoleQueryVariables = Exact<{
  communityId: Scalars['ObjectID'];
}>;

export type MemberSiteCurrentMemberHasAdminRoleQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: {
    __typename?: 'Member';
    role?: { __typename?: 'Role'; roleName: string } | null;
  } | null;
};

export type AdminCommunitiesDropdownContainerCommunityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminCommunitiesDropdownContainerCommunityQuery = {
  __typename?: 'Query';
  communityById?: {
    __typename?: 'Community';
    name?: string | null;
    domain?: string | null;
    whiteLabelDomain?: string | null;
    handle?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type AdminCommunitiesDropdownContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  name?: string | null;
  domain?: string | null;
  whiteLabelDomain?: string | null;
  handle?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type LoggedInUserContainerUserCurrentQueryQueryVariables = Exact<{ [key: string]: never }>;

export type LoggedInUserContainerUserCurrentQueryQuery = {
  __typename?: 'Query';
  userCurrent?: {
    __typename: 'CurrentUser';
    id: any;
    externalId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

export type LoggedInUserContainerUserCurrentFieldsFragment = {
  __typename: 'CurrentUser';
  id: any;
  externalId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export const CommunityCreateContainerMutationCommunityCreateFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityCreateContainerMutationCommunityCreateFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommunityMutationResult' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicContentBlobUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'schemaVersion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  CommunityCreateContainerMutationCommunityCreateFieldsFragment,
  unknown
>;
export const CommunityListContainerCommunitiesFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerCommunitiesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publicContentBlobUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'schemaVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommunityListContainerCommunitiesFieldsFragment, unknown>;
export const AdminCommunityDetailContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminCommunityDetailContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminCommunityDetailContainerCommunityFieldsFragment, unknown>;
export const AdminCommunityMenuContainerCommunitiesFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminCommunityMenuContainerCommunitiesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publicContentBlobUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'schemaVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminCommunityMenuContainerCommunitiesFieldsFragment, unknown>;
export const AdminMembersAccountsAddContainerMemberFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMember' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsAddContainerMemberFragment, unknown>;
export const AdminMembersAccountsAddContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMember' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountsAddContainerMemberFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsAddContainerMemberMutationResultFieldsFragment,
  unknown
>;
export const AdminMembersAccountEditContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'statusCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountEditContainerMembersFieldsFragment, unknown>;
export const AdminMembersAccountsEditContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsEditContainerMemberMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMembersFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountEditContainerMembersFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsEditContainerMemberMutationResultFieldsFragment,
  unknown
>;
export const AdminMembersAccountsListContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'statusCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsListContainerMembersFieldsFragment, unknown>;
export const AdminMembersCreateContainerMemberFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersCreateContainerMember' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersCreateContainerMemberFragment, unknown>;
export const AdminMembersCreateContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersCreateContainerMemberMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersCreateContainerMember' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersCreateContainerMemberFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersCreateContainerMemberMutationResultFieldsFragment,
  unknown
>;
export const AdminMembersDetailContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersDetailContainerMemberFieldsFragment, unknown>;
export const AdminMembersDetailContainerMutationFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerMutationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersDetailContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<AdminMembersDetailContainerMutationFieldsFragment, unknown>;
export const AdminMembersDetailContainerRolesFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerRolesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefault' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersDetailContainerRolesFieldsFragment, unknown>;
export const AdminMembersListContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersListContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'roleName' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersListContainerMembersFieldsFragment, unknown>;
export const AdminMembersProfileContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersProfileContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'interests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showInterests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showLocation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showProfile' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showProperties' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersProfileContainerMemberFieldsFragment, unknown>;
export const AdminMembersProfileContainerMutationFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersProfileContainerMutationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersProfileContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersProfileContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<AdminMembersProfileContainerMutationFieldsFragment, unknown>;
export const AdminPhotoUploadContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPhotoUploadContainerMemberFieldsFragment, unknown>;
export const AdminPhotoUploadContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPhotoUploadContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<AdminPhotoUploadContainerMemberMutationResultFieldsFragment, unknown>;
export const AdminPropertiesAddContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesAddContainerPropertyFieldsFragment, unknown>;
export const AdminPropertiesAddContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesAddContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesAddContainerPropertyMutationResultFieldsFragment,
  unknown
>;
export const AdminPropertiesDetailContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForSale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForRent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForLease' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedInDirectory' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesDetailContainerPropertyFieldsFragment, unknown>;
export const AdminPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerPropertyMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPropertiesDetailContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesDetailContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesDetailContainerPropertyMutationResultFieldsFragment,
  unknown
>;
export const AdminPropertiesDetailContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesDetailContainerMembersFieldsFragment, unknown>;
export const AdminPropertiesListContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminPropertiesListContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesListContainerPropertyFieldsFragment, unknown>;
export const AdminRolesDeleteContainerRolesFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRolesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefault' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminRolesDeleteContainerRolesFieldsFragment, unknown>;
export const AdminRolesDeleteContainerRoleMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDeleteContainerRolesFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDeleteContainerRolesFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<AdminRolesDeleteContainerRoleMutationResultFieldsFragment, unknown>;
export const AdminRolesDetailContainerRoleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefault' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'serviceTicketPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'communityPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'canManageRolesAndPermissions' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'canManageCommunitySettings' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageSiteContent' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageMembers' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canEditOwnMemberProfile' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canEditOwnMemberAccounts' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'propertyPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageProperties' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canEditOwnProperty' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminRolesDetailContainerRoleFieldsFragment, unknown>;
export const AdminRolesDetailContainerRoleMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDetailContainerRoleFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<AdminRolesDetailContainerRoleMutationResultFieldsFragment, unknown>;
export const AdminRolesListContainerRolesFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesListContainerRolesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefault' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminRolesListContainerRolesFieldsFragment, unknown>;
export const AdminServiceTicketsCreateContainerServiceTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsCreateContainerServiceTicketFieldsFragment,
  unknown
>;
export const AdminServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'AdminServiceTicketsCreateContainerServiceTicketMutationResultFields'
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ServiceTicketMutationResult' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsCreateContainerServiceTicketFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsCreateContainerServiceTicketFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragment,
  unknown
>;
export const AdminServiceTicketsCreateContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerMemberFieldsFragment, unknown>;
export const AdminServiceTicketsCreateContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerPropertyFieldsFragment, unknown>;
export const AdminServiceTicketsDetailContainerServiceTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'photos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activityLog' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'activityType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'activityDescription' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'activityBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketFieldsFragment,
  unknown
>;
export const AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields'
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ServiceTicketMutationResult' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragment,
  unknown
>;
export const AdminServiceTicketsDetailContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerMemberFieldsFragment, unknown>;
export const AdminServiceTicketsDetailContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerPropertyFieldsFragment, unknown>;
export const AdminServiceTicketsListContainerServiceTicketsOpenByCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'AdminServiceTicketsListContainerServiceTicketsOpenByCommunityFields'
      },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsListContainerServiceTicketsOpenByCommunityFieldsFragment,
  unknown
>;
export const AdminSettingsGeneralContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSettingsGeneralContainerCommunityFieldsFragment, unknown>;
export const AdminSiteEditorContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publicContentBlobUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'schemaVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorContainerCommunityFieldsFragment, unknown>;
export const AdminSiteEditorFilesListContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'files' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorFilesListContainerCommunityFieldsFragment, unknown>;
export const AdminSiteEditorFilesUploadContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'files' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorFilesUploadContainerCommunityFieldsFragment, unknown>;
export const PropertyDetailsByPropertyIdFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PropertyDetailsByPropertyIdFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'listedForLease' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForRent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForSale' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'streetName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'streetNumber' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'freeformAddress' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'additionalAmenities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bedroomDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'roomName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedDescriptions' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'floorPlan' } },
                { kind: 'Field', name: { kind: 'Name', value: 'floorPlanImages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lease' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompany' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyPhone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyWebsite' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentPhone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentWebsite' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxGuests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rentHigh' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rentLow' } },
                { kind: 'Field', name: { kind: 'Name', value: 'squareFeet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'video' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<PropertyDetailsByPropertyIdFieldsFragment, unknown>;
export const PropertyInformationFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PropertyInformationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'listedForLease' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForRent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForSale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedInDirectory' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'squareFeet' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'streetNumber' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'streetName' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<PropertyInformationFieldsFragment, unknown>;
export const CurrentMemberProfileByCommunityIdFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CurrentMemberProfileByCommunityIdFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'interests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showInterests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showLocation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showProfile' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showProperties' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CurrentMemberProfileByCommunityIdFieldsFragment, unknown>;
export const MembersProfileContainerMutationFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersProfileContainerMutationFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CurrentMemberProfileByCommunityIdFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...CurrentMemberProfileByCommunityIdFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<MembersProfileContainerMutationFieldsFragment, unknown>;
export const MemberSiteNeighborsListContainerFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberSiteNeighborsListContainerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'interests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showInterests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showProfile' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showLocation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showProperties' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberSiteNeighborsListContainerFieldsFragment, unknown>;
export const MemberPhotoUploadContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberPhotoUploadContainerMemberFieldsFragment, unknown>;
export const MembersPropertiesDetailContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForSale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForRent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForLease' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedInDirectory' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesDetailContainerPropertyFieldsFragment, unknown>;
export const MembersPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerPropertyMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersPropertiesDetailContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesDetailContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesDetailContainerPropertyMutationResultFieldsFragment,
  unknown
>;
export const MembersPropertiesDetailContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesDetailContainerMembersFieldsFragment, unknown>;
export const MembersPropertiesFloorPlanImageUploadContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesFloorPlanImageUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'floorPlanImages' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersPropertiesFloorPlanImageUploadContainerPropertyFieldsFragment,
  unknown
>;
export const MembersPropertiesListContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesListContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesListContainerPropertyFieldsFragment, unknown>;
export const MembersPropertiesListSearchContainerPropertyResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesListSearchContainerPropertyResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'additionalAmenities' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amenities' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
          { kind: 'Field', name: { kind: 'Name', value: 'squareFeet' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'position' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'images' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompany' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'address' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'streetNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'streetName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'municipality' } },
                { kind: 'Field', name: { kind: 'Name', value: 'municipalitySubdivision' } },
                { kind: 'Field', name: { kind: 'Name', value: 'localName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countrySecondarySubdivision' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryTertiarySubdivision' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivision' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivisionName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'extendedPostalCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCodeISO3' } },
                { kind: 'Field', name: { kind: 'Name', value: 'freeformAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'streetNameAndNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'routeNumbers' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crossStreet' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForSale' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForRent' } },
          { kind: 'Field', name: { kind: 'Name', value: 'listedForLease' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersPropertiesListSearchContainerPropertyResultFieldsFragment,
  unknown
>;
export const MemberPropertiesListSearchContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberPropertiesListSearchContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertySearchResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyResults' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersPropertiesListSearchContainerPropertyResultFields'
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'facets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'type' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amenities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'additionalAmenitiesCategory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'additionalAmenitiesAmenities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'listedForSale' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'listedForRent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'listedForLease' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bedrooms' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bathrooms' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesListSearchContainerPropertyResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<MemberPropertiesListSearchContainerPropertyFieldsFragment, unknown>;
export const MembersPropertiesListingContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesListingContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rentHigh' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rentLow' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lease' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxGuests' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bedroomDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedDescriptions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roomName' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'squareFeet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'additionalAmenities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                { kind: 'Field', name: { kind: 'Name', value: 'video' } },
                { kind: 'Field', name: { kind: 'Name', value: 'floorPlan' } },
                { kind: 'Field', name: { kind: 'Name', value: 'floorPlanImages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentPhone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentWebsite' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompany' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyPhone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyEmail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyWebsite' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingAgentCompanyAddress' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesListingContainerPropertyFieldsFragment, unknown>;
export const MembersPropertiesListingContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'MembersPropertiesListingContainerPropertyMutationResultFields'
      },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersPropertiesListingContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesListingContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesListingContainerPropertyMutationResultFieldsFragment,
  unknown
>;
export const MembersPropertiesListingContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesListingContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesListingContainerMembersFieldsFragment, unknown>;
export const MembersPropertiesListingImageUploadContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersPropertiesListingImageUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'images' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersPropertiesListingImageUploadContainerPropertyFieldsFragment,
  unknown
>;
export const AddressLocationContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressLocationContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countryCodeISO3' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'countrySecondarySubdivision' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivisionName' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'countryTertiarySubdivision' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'extendedPostalCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'freeformAddress' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'municipality' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'municipalitySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'crossStreet' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'localName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'streetName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'streetNumber' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'routeNumbers' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'streetNameAndNumber' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'position' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddressLocationContainerPropertyFieldsFragment, unknown>;
export const AddressLocationContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressLocationContainerPropertyMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressLocationContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AddressLocationContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<AddressLocationContainerPropertyMutationResultFieldsFragment, unknown>;
export const MembersServiceTicketsCreateContainerServiceTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsCreateContainerServiceTicketFieldsFragment,
  unknown
>;
export const MembersServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'MembersServiceTicketsCreateContainerServiceTicketMutationResultFields'
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ServiceTicketMutationResult' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsCreateContainerServiceTicketFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsCreateContainerServiceTicketFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragment,
  unknown
>;
export const MembersServiceTicketsCreateContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerMemberFieldsFragment, unknown>;
export const MembersServiceTicketsCreateContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerPropertyFieldsFragment, unknown>;
export const MembersServiceTicketsDetailContainerServiceTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'photos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'documentId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activityLog' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'activityType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'activityDescription' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'activityBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerServiceTicketFieldsFragment,
  unknown
>;
export const MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields'
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ServiceTicketMutationResult' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'status' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragment,
  unknown
>;
export const MembersServiceTicketsDetailContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerMemberFieldsFragment, unknown>;
export const MembersServiceTicketsDetailContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerPropertyFieldsFragment, unknown>;
export const MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFields'
      },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFieldsFragment,
  unknown
>;
export const AdminCommunitiesDropdownContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminCommunitiesDropdownContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminCommunitiesDropdownContainerCommunityFieldsFragment, unknown>;
export const LoggedInUserContainerUserCurrentFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CurrentUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoggedInUserContainerUserCurrentFieldsFragment, unknown>;
export const CommunityCreateContainerMutationCommunityCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CommunityCreateContainerMutationCommunityCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityCreateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'CommunityCreateContainerMutationCommunityCreateFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...CommunityCreateContainerMutationCommunityCreateFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  CommunityCreateContainerMutationCommunityCreateMutation,
  CommunityCreateContainerMutationCommunityCreateMutationVariables
>;
export const CommunityListContainerCommunitiesQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CommunityListContainerCommunitiesQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communities' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommunityListContainerCommunitiesFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...CommunityListContainerCommunitiesFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  CommunityListContainerCommunitiesQueryQuery,
  CommunityListContainerCommunitiesQueryQueryVariables
>;
export const AdminCommunityDetailContainerCommunityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminCommunityDetailContainerCommunity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminCommunityDetailContainerCommunityFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminCommunityDetailContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminCommunityDetailContainerCommunityQuery,
  AdminCommunityDetailContainerCommunityQueryVariables
>;
export const AdminCommunityMenuContainerCommunitiesQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminCommunityMenuContainerCommunitiesQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communities' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminCommunityMenuContainerCommunitiesFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminCommunityMenuContainerCommunitiesFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminCommunityMenuContainerCommunitiesQueryQuery,
  AdminCommunityMenuContainerCommunitiesQueryQueryVariables
>;
export const AdminMembersAccountsAddContainerMemberAccountAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberAccountAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccountAddInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAccountAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminMembersAccountsAddContainerMemberMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountsAddContainerMemberMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsAddContainerMemberAccountAddMutation,
  AdminMembersAccountsAddContainerMemberAccountAddMutationVariables
>;
export const AdminMembersAccountsAddContainerMemberForUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberForUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMember' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountsAddContainerMemberFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsAddContainerMemberForUserQuery,
  AdminMembersAccountsAddContainerMemberForUserQueryVariables
>;
export const AdminMembersAccountsEditContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersAccountsEditContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMembersFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountEditContainerMembersFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsEditContainerMemberQuery,
  AdminMembersAccountsEditContainerMemberQueryVariables
>;
export const AdminMembersAccountsEditContainerMemberAccountEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminMembersAccountsEditContainerMemberAccountEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccountEditInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAccountEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminMembersAccountsEditContainerMemberMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountsEditContainerMemberMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsEditContainerMemberAccountEditMutation,
  AdminMembersAccountsEditContainerMemberAccountEditMutationVariables
>;
export const AdminMembersAccountsEditContainerMemberAccountRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminMembersAccountsEditContainerMemberAccountRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccountRemoveInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAccountRemove' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminMembersAccountsEditContainerMemberMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountsEditContainerMemberMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsEditContainerMemberAccountRemoveMutation,
  AdminMembersAccountsEditContainerMemberAccountRemoveMutationVariables
>;
export const AdminMembersAccountsListContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMembersFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersAccountsListContainerMembersFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersAccountsListContainerMemberQuery,
  AdminMembersAccountsListContainerMemberQueryVariables
>;
export const AdminMembersCreateContainerMemberCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminMembersCreateContainerMemberCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberCreateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminMembersCreateContainerMemberMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersCreateContainerMemberMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersCreateContainerMemberCreateMutation,
  AdminMembersCreateContainerMemberCreateMutationVariables
>;
export const AdminMembersDetailContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersDetailContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersDetailContainerMemberQuery,
  AdminMembersDetailContainerMemberQueryVariables
>;
export const AdminMembersDetailContainerRolesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerRoles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rolesByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersDetailContainerRolesFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersDetailContainerRolesFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersDetailContainerRolesQuery,
  AdminMembersDetailContainerRolesQueryVariables
>;
export const AdminMembersDetailContainerMemberUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersDetailContainerMutationFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersDetailContainerMutationFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersDetailContainerMemberUpdateMutation,
  AdminMembersDetailContainerMemberUpdateMutationVariables
>;
export const AdminMembersListContainerMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersListContainerMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersListContainerMembersFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersListContainerMembersFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersListContainerMembersQuery,
  AdminMembersListContainerMembersQueryVariables
>;
export const AdminMembersProfileContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersProfileContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersProfileContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersProfileContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersProfileContainerMemberQuery,
  AdminMembersProfileContainerMemberQueryVariables
>;
export const AdminMembersProfileContainerMemberUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminMembersProfileContainerMemberUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberProfileUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminMembersProfileContainerMutationFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminMembersProfileContainerMutationFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminMembersProfileContainerMemberUpdateMutation,
  AdminMembersProfileContainerMemberUpdateMutationVariables
>;
export const AdminPhotoUploadContainerContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminPhotoUploadContainerContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPhotoUploadContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPhotoUploadContainerContainerMemberQuery,
  AdminPhotoUploadContainerContainerMemberQueryVariables
>;
export const AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAvatarImageInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileAvatarCreateAuthHeader' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'authHeader' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobContainer' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberFields' }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPhotoUploadContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutation,
  AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutationVariables
>;
export const AdminPhotoUploadContainerMemberProfileAvatarRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminPhotoUploadContainerMemberProfileAvatarRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileAvatarRemove' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'memberId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminPhotoUploadContainerMemberMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPhotoUploadContainerMemberMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPhotoUploadContainerMemberProfileAvatarRemoveMutation,
  AdminPhotoUploadContainerMemberProfileAvatarRemoveMutationVariables
>;
export const AdminPropertiesAddContainerPropertyAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyAddInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminPropertiesAddContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesAddContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesAddContainerPropertyAddMutation,
  AdminPropertiesAddContainerPropertyAddMutationVariables
>;
export const AdminPropertiesDetailContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPropertiesDetailContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesDetailContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesDetailContainerPropertyQuery,
  AdminPropertiesDetailContainerPropertyQueryVariables
>;
export const AdminPropertiesDetailContainerMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPropertiesDetailContainerMembersFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesDetailContainerMembersFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesDetailContainerMembersQuery,
  AdminPropertiesDetailContainerMembersQueryVariables
>;
export const AdminPropertiesDetailContainerPropertyUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerPropertyUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminPropertiesDetailContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesDetailContainerPropertyUpdateMutation,
  AdminPropertiesDetailContainerPropertyUpdateMutationVariables
>;
export const AdminPropertiesDetailContainerPropertyDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminPropertiesDetailContainerPropertyDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyDeleteInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminPropertiesDetailContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesDetailContainerPropertyDeleteMutation,
  AdminPropertiesDetailContainerPropertyDeleteMutationVariables
>;
export const AdminPropertiesListContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminPropertiesListContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminPropertiesListContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminPropertiesListContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminPropertiesListContainerPropertiesQuery,
  AdminPropertiesListContainerPropertiesQueryVariables
>;
export const AdminRolesDeleteContainerRolesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoles' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDeleteContainerRolesFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDeleteContainerRolesFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminRolesDeleteContainerRolesQuery,
  AdminRolesDeleteContainerRolesQueryVariables
>;
export const AdminRolesDeleteContainerRoleDeleteAndReassignDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleDeleteAndReassign' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleDeleteAndReassignInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleDeleteAndReassign' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleMutationResultFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDeleteContainerRoleMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminRolesDeleteContainerRoleDeleteAndReassignMutation,
  AdminRolesDeleteContainerRoleDeleteAndReassignMutationVariables
>;
export const AdminRolesDetailContainerRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminRolesDetailContainerRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'Id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'Id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDetailContainerRoleFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminRolesDetailContainerRoleQuery,
  AdminRolesDetailContainerRoleQueryVariables
>;
export const AdminRolesDetailContainerRoleAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleAddInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleMutationResultFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDetailContainerRoleMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminRolesDetailContainerRoleAddMutation,
  AdminRolesDetailContainerRoleAddMutationVariables
>;
export const AdminRolesDetailContainerRoleUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleMutationResultFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesDetailContainerRoleMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminRolesDetailContainerRoleUpdateMutation,
  AdminRolesDetailContainerRoleUpdateMutationVariables
>;
export const AdminRolesListContainerRolesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminRolesListContainerRoles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rolesByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminRolesListContainerRolesFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminRolesListContainerRolesFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminRolesListContainerRolesQuery,
  AdminRolesListContainerRolesQueryVariables
>;
export const AdminServiceTicketsCreateContainerMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsCreateContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsCreateContainerMembersQuery,
  AdminServiceTicketsCreateContainerMembersQueryVariables
>;
export const AdminServiceTicketsCreateContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsCreateContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsCreateContainerPropertiesQuery,
  AdminServiceTicketsCreateContainerPropertiesQueryVariables
>;
export const AdminServiceTicketsCreateContainerServiceTicketCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketCreateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsCreateContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsCreateContainerServiceTicketCreateMutation,
  AdminServiceTicketsCreateContainerServiceTicketCreateMutationVariables
>;
export const AdminServiceTicketsDetailContainerMembersAssignableToTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerMembersAssignableToTickets' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersAssignableToTickets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerMembersAssignableToTicketsQuery,
  AdminServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables
>;
export const AdminServiceTicketsDetailContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerProperties' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'properties' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerPropertiesQuery,
  AdminServiceTicketsDetailContainerPropertiesQueryVariables
>;
export const AdminServiceTicketsDetailContainerServiceTicketDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicket' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketQuery,
  AdminServiceTicketsDetailContainerServiceTicketQueryVariables
>;
export const AdminServiceTicketsDetailContainerServiceTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketUpdateMutation,
  AdminServiceTicketsDetailContainerServiceTicketUpdateMutationVariables
>;
export const AdminServiceTicketsDetailContainerServiceTicketChangeStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketChangeStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ServiceTicketChangeStatusInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketChangeStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketChangeStatusMutation,
  AdminServiceTicketsDetailContainerServiceTicketChangeStatusMutationVariables
>;
export const AdminServiceTicketsDetailContainerServiceAssignDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceAssign' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketAssignInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAssign' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceAssignMutation,
  AdminServiceTicketsDetailContainerServiceAssignMutationVariables
>;
export const AdminServiceTicketsDetailContainerAddUpdateActivityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerAddUpdateActivity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ServiceTicketAddUpdateActivityInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAddUpdateActivity' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerAddUpdateActivityMutation,
  AdminServiceTicketsDetailContainerAddUpdateActivityMutationVariables
>;
export const AdminServiceTicketDetailContainerServiceTicketDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketDetailContainerServiceTicketDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketDeleteInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketDetailContainerServiceTicketDeleteMutation,
  AdminServiceTicketDetailContainerServiceTicketDeleteMutationVariables
>;
export const AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: {
        kind: 'Name',
        value: 'AdminServiceTicketsListContainerServiceTicketsOpenByCommunity'
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AdminServiceTicketsListContainerServiceTicketsOpenByCommunityFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminServiceTicketsListContainerServiceTicketsOpenByCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsListContainerServiceTicketsOpenByCommunityQuery,
  AdminServiceTicketsListContainerServiceTicketsOpenByCommunityQueryVariables
>;
export const AdminSettingsGeneralContainerCommunityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminSettingsGeneralContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminSettingsGeneralContainerCommunityQuery,
  AdminSettingsGeneralContainerCommunityQueryVariables
>;
export const AdminSettingsGeneralContainerCommunityUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'community' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'AdminSettingsGeneralContainerCommunityFields'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminSettingsGeneralContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminSettingsGeneralContainerCommunityUpdateMutation,
  AdminSettingsGeneralContainerCommunityUpdateMutationVariables
>;
export const AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'AdminSiteEditorContainerCommunityPublicContentCreateAuthHeader'
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobContentInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicContentCreateAuthHeader' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'authHeader' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobContainer' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'community' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityFields' }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminSiteEditorContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutation,
  AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutationVariables
>;
export const AdminSiteEditorFilesListContainerCommunityByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminSiteEditorFilesListContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminSiteEditorFilesListContainerCommunityByIdQuery,
  AdminSiteEditorFilesListContainerCommunityByIdQueryVariables
>;
export const AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityPublicFileRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommunityPublicFileRemoveInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicFileRemove' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'community' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'AdminSiteEditorFilesListContainerCommunityFields'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminSiteEditorFilesListContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminSiteEditorFilesListContainerCommunityPublicFileRemoveMutation,
  AdminSiteEditorFilesListContainerCommunityPublicFileRemoveMutationVariables
>;
export const AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeader'
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobFileInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicFileCreateAuthHeader' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'authHeader' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobContainer' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'community' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'AdminSiteEditorFilesUploadContainerCommunityFields'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminSiteEditorFilesUploadContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutation,
  AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutationVariables
>;
export const MemberPropertyByPropertyIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPropertyByPropertyId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PropertyDetailsByPropertyIdFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...PropertyDetailsByPropertyIdFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MemberPropertyByPropertyIdQuery,
  MemberPropertyByPropertyIdQueryVariables
>;
export const MemberPropertiesByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPropertiesByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PropertyInformationFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...PropertyInformationFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MemberPropertiesByCommunityIdQuery,
  MemberPropertiesByCommunityIdQueryVariables
>;
export const CurrentMemberProfileByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CurrentMemberProfileByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CurrentMemberProfileByCommunityIdFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...CurrentMemberProfileByCommunityIdFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  CurrentMemberProfileByCommunityIdQuery,
  CurrentMemberProfileByCommunityIdQueryVariables
>;
export const MembersProfileContainerMemberUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersProfileContainerMemberUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberProfileUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersProfileContainerMutationFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersProfileContainerMutationFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersProfileContainerMemberUpdateMutation,
  MembersProfileContainerMemberUpdateMutationVariables
>;
export const MemberSiteNeighborsListContainerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberSiteNeighborsListContainer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MemberSiteNeighborsListContainerFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MemberSiteNeighborsListContainerFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MemberSiteNeighborsListContainerQuery,
  MemberSiteNeighborsListContainerQueryVariables
>;
export const MemberSiteNeighborsListCurrentMemberIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberSiteNeighborsListCurrentMemberId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MemberSiteNeighborsListCurrentMemberIdQuery,
  MemberSiteNeighborsListCurrentMemberIdQueryVariables
>;
export const MemberPhotoUploadContainerContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPhotoUploadContainerContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MemberPhotoUploadContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MemberPhotoUploadContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MemberPhotoUploadContainerContainerMemberQuery,
  MemberPhotoUploadContainerContainerMemberQueryVariables
>;
export const MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeader'
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAvatarImageInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileAvatarCreateAuthHeader' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'authHeader' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'blobContainer' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'MemberPhotoUploadContainerMemberFields' }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MemberPhotoUploadContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutation,
  MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutationVariables
>;
export const MembersPropertiesDetailContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersPropertiesDetailContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesDetailContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesDetailContainerPropertyQuery,
  MembersPropertiesDetailContainerPropertyQueryVariables
>;
export const MembersPropertiesDetailContainerMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersPropertiesDetailContainerMembersFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesDetailContainerMembersFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesDetailContainerMembersQuery,
  MembersPropertiesDetailContainerMembersQueryVariables
>;
export const MembersPropertiesDetailContainerPropertyUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerPropertyUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersPropertiesDetailContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesDetailContainerPropertyUpdateMutation,
  MembersPropertiesDetailContainerPropertyUpdateMutationVariables
>;
export const MembersPropertiesDetailContainerPropertyDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersPropertiesDetailContainerPropertyDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyDeleteInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersPropertiesDetailContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesDetailContainerPropertyDeleteMutation,
  MembersPropertiesDetailContainerPropertyDeleteMutationVariables
>;
export const MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderDocument =
  {
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'mutation',
        name: {
          kind: 'Name',
          value:
            'MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeader'
        },
        variableDefinitions: [
          {
            kind: 'VariableDefinition',
            variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileInput' } }
            }
          }
        ],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'propertyFloorPlanImageCreateAuthHeader' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'input' },
                  value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
                }
              ],
              selectionSet: {
                kind: 'SelectionSet',
                selections: [
                  {
                    kind: 'Field',
                    name: { kind: 'Name', value: 'authHeader' },
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'blobName' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'blobContainer' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } }
                      ]
                    }
                  },
                  {
                    kind: 'Field',
                    name: { kind: 'Name', value: 'status' },
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                      ]
                    }
                  },
                  {
                    kind: 'Field',
                    name: { kind: 'Name', value: 'property' },
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        {
                          kind: 'FragmentSpread',
                          name: {
                            kind: 'Name',
                            value: 'MembersPropertiesFloorPlanImageUploadContainerPropertyFields'
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      ...MembersPropertiesFloorPlanImageUploadContainerPropertyFieldsFragmentDoc.definitions
    ]
  } as unknown as DocumentNode<
    MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutation,
    MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutationVariables
  >;
export const MembersPropertiesListContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersPropertiesListContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesForCurrentUserByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersPropertiesListContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesListContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesListContainerPropertiesQuery,
  MembersPropertiesListContainerPropertiesQueryVariables
>;
export const MemberPropertiesListSearchContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPropertiesListSearchContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertiesSearchInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesSearch' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MemberPropertiesListSearchContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MemberPropertiesListSearchContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MemberPropertiesListSearchContainerPropertiesQuery,
  MemberPropertiesListSearchContainerPropertiesQueryVariables
>;
export const MemberPropertiesListSearchContainerMapSasTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPropertiesListSearchContainerMapSasToken' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'getMapSasToken' } }]
      }
    }
  ]
} as unknown as DocumentNode<
  MemberPropertiesListSearchContainerMapSasTokenQuery,
  MemberPropertiesListSearchContainerMapSasTokenQueryVariables
>;
export const MembersPropertiesListingContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersPropertiesListingContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersPropertiesListingContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesListingContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesListingContainerPropertyQuery,
  MembersPropertiesListingContainerPropertyQueryVariables
>;
export const MembersPropertiesListingContainerPropertyUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersPropertiesListingContainerPropertyUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersPropertiesListingContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersPropertiesListingContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersPropertiesListingContainerPropertyUpdateMutation,
  MembersPropertiesListingContainerPropertyUpdateMutationVariables
>;
export const MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderDocument =
  {
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'mutation',
        name: {
          kind: 'Name',
          value: 'MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeader'
        },
        variableDefinitions: [
          {
            kind: 'VariableDefinition',
            variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileInput' } }
            }
          }
        ],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'propertyListingImageCreateAuthHeader' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'input' },
                  value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
                }
              ],
              selectionSet: {
                kind: 'SelectionSet',
                selections: [
                  {
                    kind: 'Field',
                    name: { kind: 'Name', value: 'authHeader' },
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'blobName' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'blobContainer' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } }
                      ]
                    }
                  },
                  {
                    kind: 'Field',
                    name: { kind: 'Name', value: 'status' },
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
                      ]
                    }
                  },
                  {
                    kind: 'Field',
                    name: { kind: 'Name', value: 'property' },
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        {
                          kind: 'FragmentSpread',
                          name: {
                            kind: 'Name',
                            value: 'MembersPropertiesListingImageUploadContainerPropertyFields'
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      ...MembersPropertiesListingImageUploadContainerPropertyFieldsFragmentDoc.definitions
    ]
  } as unknown as DocumentNode<
    MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutation,
    MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutationVariables
  >;
export const PropertiesLocationContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PropertiesLocationContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'mapSASToken' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AddressLocationContainerPropertyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AddressLocationContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  PropertiesLocationContainerPropertyQuery,
  PropertiesLocationContainerPropertyQueryVariables
>;
export const AddressLocationUpdateContainerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddressLocationUpdateContainer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'AddressLocationContainerPropertyMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...AddressLocationContainerPropertyMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AddressLocationUpdateContainerMutation,
  AddressLocationUpdateContainerMutationVariables
>;
export const MembersServiceTicketsCreateContainerMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsCreateContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsCreateContainerMembersQuery,
  MembersServiceTicketsCreateContainerMembersQueryVariables
>;
export const MembersServiceTicketsCreateContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesForCurrentUserByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsCreateContainerPropertyFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsCreateContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsCreateContainerPropertiesQuery,
  MembersServiceTicketsCreateContainerPropertiesQueryVariables
>;
export const MembersServiceTicketsCreateContainerServiceTicketCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketCreateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsCreateContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsCreateContainerServiceTicketCreateMutation,
  MembersServiceTicketsCreateContainerServiceTicketCreateMutationVariables
>;
export const MembersServiceTicketsDetailContainerMembersAssignableToTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: {
        kind: 'Name',
        value: 'MembersServiceTicketsDetailContainerMembersAssignableToTickets'
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersAssignableToTickets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerMemberFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerMemberFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerMembersAssignableToTicketsQuery,
  MembersServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables
>;
export const MembersServiceTicketsDetailContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesForCurrentUserByCommunityId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerPropertyFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerPropertyFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerPropertiesQuery,
  MembersServiceTicketsDetailContainerPropertiesQueryVariables
>;
export const MembersServiceTicketsDetailContainerServiceTicketDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicket' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerServiceTicketQuery,
  MembersServiceTicketsDetailContainerServiceTicketQueryVariables
>;
export const MembersServiceTicketsDetailContainerServiceTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketUpdateInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerServiceTicketUpdateMutation,
  MembersServiceTicketsDetailContainerServiceTicketUpdateMutationVariables
>;
export const MembersServiceTicketsDetailContainerServiceTicketChangeStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'MembersServiceTicketsDetailContainerServiceTicketChangeStatus'
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ServiceTicketChangeStatusInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketChangeStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerServiceTicketChangeStatusMutation,
  MembersServiceTicketsDetailContainerServiceTicketChangeStatusMutationVariables
>;
export const MembersServiceTicketsDetailContainerServiceAssignDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceAssign' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketAssignInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAssign' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerServiceAssignMutation,
  MembersServiceTicketsDetailContainerServiceAssignMutationVariables
>;
export const MembersServiceTicketsDetailContainerAddUpdateActivityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerAddUpdateActivity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ServiceTicketAddUpdateActivityInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAddUpdateActivity' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsDetailContainerAddUpdateActivityMutation,
  MembersServiceTicketsDetailContainerAddUpdateActivityMutationVariables
>;
export const MembersServiceTicketDetailContainerServiceTicketDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersServiceTicketDetailContainerServiceTicketDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketDeleteInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketDetailContainerServiceTicketDeleteMutation,
  MembersServiceTicketDetailContainerServiceTicketDeleteMutationVariables
>;
export const MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: {
        kind: 'Name',
        value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestor'
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsOpenByRequestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQuery,
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQueryVariables
>;
export const MemberSiteCurrentMemberHasAdminRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberSiteCurrentMemberHasAdminRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'communityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'role' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'roleName' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MemberSiteCurrentMemberHasAdminRoleQuery,
  MemberSiteCurrentMemberHasAdminRoleQueryVariables
>;
export const AdminCommunitiesDropdownContainerCommunityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminCommunitiesDropdownContainerCommunity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AdminCommunitiesDropdownContainerCommunityFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...AdminCommunitiesDropdownContainerCommunityFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  AdminCommunitiesDropdownContainerCommunityQuery,
  AdminCommunitiesDropdownContainerCommunityQueryVariables
>;
export const LoggedInUserContainerUserCurrentQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userCurrent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' }
                }
              ]
            }
          }
        ]
      }
    },
    ...LoggedInUserContainerUserCurrentFieldsFragmentDoc.definitions
  ]
} as unknown as DocumentNode<
  LoggedInUserContainerUserCurrentQueryQuery,
  LoggedInUserContainerUserCurrentQueryQueryVariables
>;
