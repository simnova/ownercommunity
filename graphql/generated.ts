import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
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
  Public = 'PUBLIC',
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
};

export type PropertySearchFacets = {
  __typename?: 'PropertySearchFacets';
  additionalAmenitiesAmenities?: Maybe<Array<Maybe<FacetDetail>>>;
  additionalAmenitiesCategory?: Maybe<Array<Maybe<FacetDetail>>>;
  amenities?: Maybe<Array<Maybe<FacetDetail>>>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CacheControlScope: CacheControlScope;
  Community: ResolverTypeWrapper<Community>;
  CommunityBlobContentAuthHeaderResult: ResolverTypeWrapper<CommunityBlobContentAuthHeaderResult>;
  CommunityBlobContentInput: CommunityBlobContentInput;
  CommunityBlobFileInput: CommunityBlobFileInput;
  CommunityCreateInput: CommunityCreateInput;
  CommunityMutationResult: ResolverTypeWrapper<CommunityMutationResult>;
  CommunityPermissions: ResolverTypeWrapper<CommunityPermissions>;
  CommunityPermissionsInput: CommunityPermissionsInput;
  CommunityPublicFileRemoveInput: CommunityPublicFileRemoveInput;
  CommunityUpdateInput: CommunityUpdateInput;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  CurrentUser: ResolverTypeWrapper<CurrentUser>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
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
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  ListingDetails: ResolverTypeWrapper<ListingDetails>;
  ListingDetailsFilterInput: ListingDetailsFilterInput;
  ListingDetailsInput: ListingDetailsInput;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
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
    | ResolversTypes['Location']
    | ResolversTypes['Member']
    | ResolversTypes['Point']
    | ResolversTypes['Property']
    | ResolversTypes['Role']
    | ResolversTypes['ServiceTicket']
    | ResolversTypes['User'];
  MongoEmbeddedBase: ResolversTypes['MemberAccount'] | ResolversTypes['ServiceTicketActivityDetail'] | ResolversTypes['ServiceTicketPhoto'];
  Mutation: ResolverTypeWrapper<{}>;
  MutationResult: ResolversTypes['MemberMutationResult'] | ResolversTypes['ServiceTicketPhotoAuthHeaderResult'] | ResolversTypes['UserMutationResult'];
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
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
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
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
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
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  Community: Community;
  CommunityBlobContentAuthHeaderResult: CommunityBlobContentAuthHeaderResult;
  CommunityBlobContentInput: CommunityBlobContentInput;
  CommunityBlobFileInput: CommunityBlobFileInput;
  CommunityCreateInput: CommunityCreateInput;
  CommunityMutationResult: CommunityMutationResult;
  CommunityPermissions: CommunityPermissions;
  CommunityPermissionsInput: CommunityPermissionsInput;
  CommunityPublicFileRemoveInput: CommunityPublicFileRemoveInput;
  CommunityUpdateInput: CommunityUpdateInput;
  Currency: Scalars['Currency'];
  CurrentUser: CurrentUser;
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
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
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  Latitude: Scalars['Latitude'];
  ListingDetails: ListingDetails;
  ListingDetailsFilterInput: ListingDetailsFilterInput;
  ListingDetailsInput: ListingDetailsInput;
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
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
    | ResolversParentTypes['Location']
    | ResolversParentTypes['Member']
    | ResolversParentTypes['Point']
    | ResolversParentTypes['Property']
    | ResolversParentTypes['Role']
    | ResolversParentTypes['ServiceTicket']
    | ResolversParentTypes['User'];
  MongoEmbeddedBase: ResolversParentTypes['MemberAccount'] | ResolversParentTypes['ServiceTicketActivityDetail'] | ResolversParentTypes['ServiceTicketPhoto'];
  Mutation: {};
  MutationResult: ResolversParentTypes['MemberMutationResult'] | ResolversParentTypes['ServiceTicketPhotoAuthHeaderResult'] | ResolversParentTypes['UserMutationResult'];
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
  SafeInt: Scalars['SafeInt'];
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
  String: Scalars['String'];
  Time: Scalars['Time'];
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

export type CacheControl22DirectiveResolver<Result, Parent, ContextType = Context, Args = CacheControl22DirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdditionalAmenitiesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdditionalAmenities'] = ResolversParentTypes['AdditionalAmenities']> = ResolversObject<{
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdditionalAmenitiesSearchResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AdditionalAmenitiesSearchResult'] = ResolversParentTypes['AdditionalAmenitiesSearchResult']
> = ResolversObject<{
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
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

export type BedroomDetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BedroomDetails'] = ResolversParentTypes['BedroomDetails']> = ResolversObject<{
  bedDescriptions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  roomName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlobAuthHeaderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BlobAuthHeader'] = ResolversParentTypes['BlobAuthHeader']> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blobContainer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blobName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type CommunityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['FileInfo']>>>, ParentType, ContextType>;
  filesByType?: Resolver<Maybe<Array<Maybe<ResolversTypes['FileInfo']>>>, ParentType, ContextType, RequireFields<CommunityFilesByTypeArgs, 'type'>>;
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicContentBlobUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  whiteLabelDomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityBlobContentAuthHeaderResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommunityBlobContentAuthHeaderResult'] = ResolversParentTypes['CommunityBlobContentAuthHeaderResult']
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityMutationResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommunityMutationResult'] = ResolversParentTypes['CommunityMutationResult']
> = ResolversObject<{
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityPermissionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommunityPermissions'] = ResolversParentTypes['CommunityPermissions']> = ResolversObject<{
  canEditOwnMemberAccounts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canEditOwnMemberProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageCommunitySettings?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageMembers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageRolesAndPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageSiteContent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export type CurrentUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = ResolversObject<{
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

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type FacetDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FacetDetail'] = ResolversParentTypes['FacetDetail']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FileInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FileInfo'] = ResolversParentTypes['FileInfo']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export type GeographyPointResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GeographyPoint'] = ResolversParentTypes['GeographyPoint']> = ResolversObject<{
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

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export type ListingDetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ListingDetails'] = ResolversParentTypes['ListingDetails']> = ResolversObject<{
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

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export type LocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Point']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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

export type MemberResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['MemberAccount']>>>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  memberName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['MemberProfile']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberAccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MemberAccount'] = ResolversParentTypes['MemberAccount']> = ResolversObject<{
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
  ContextType = Context,
  ParentType extends ResolversParentTypes['MemberAvatarImageAuthHeaderResult'] = ResolversParentTypes['MemberAvatarImageAuthHeaderResult']
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberMutationResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MemberMutationResult'] = ResolversParentTypes['MemberMutationResult']> = ResolversObject<{
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MemberProfile'] = ResolversParentTypes['MemberProfile']> = ResolversObject<{
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

export type MongoBaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MongoBase'] = ResolversParentTypes['MongoBase']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Community' | 'CurrentUser' | 'Location' | 'Member' | 'Point' | 'Property' | 'Role' | 'ServiceTicket' | 'User', ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;

export type MongoEmbeddedBaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MongoEmbeddedBase'] = ResolversParentTypes['MongoEmbeddedBase']> = ResolversObject<{
  __resolveType: TypeResolveFn<'MemberAccount' | 'ServiceTicketActivityDetail' | 'ServiceTicketPhoto', ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
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
  memberProfileAvatarCreateAuthHeader?: Resolver<ResolversTypes['MemberAvatarImageAuthHeaderResult'], ParentType, ContextType, RequireFields<MutationMemberProfileAvatarCreateAuthHeaderArgs, 'input'>>;
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
  propertyRemoveOwner?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyRemoveOwnerArgs, 'input'>>;
  propertyUpdate?: Resolver<ResolversTypes['PropertyMutationResult'], ParentType, ContextType, RequireFields<MutationPropertyUpdateArgs, 'input'>>;
  roleAdd?: Resolver<ResolversTypes['RoleMutationResult'], ParentType, ContextType, RequireFields<MutationRoleAddArgs, 'input'>>;
  roleDeleteAndReassign?: Resolver<ResolversTypes['RoleMutationResult'], ParentType, ContextType, RequireFields<MutationRoleDeleteAndReassignArgs, 'input'>>;
  roleUpdate?: Resolver<ResolversTypes['RoleMutationResult'], ParentType, ContextType, RequireFields<MutationRoleUpdateArgs, 'input'>>;
  serviceTicketAddPhoto?: Resolver<ResolversTypes['ServiceTicketPhotoAuthHeaderResult'], ParentType, ContextType, RequireFields<MutationServiceTicketAddPhotoArgs, 'input'>>;
  serviceTicketAddUpdateActivity?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketAddUpdateActivityArgs, 'input'>>;
  serviceTicketAssign?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketAssignArgs, 'input'>>;
  serviceTicketChangeStatus?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketChangeStatusArgs, 'input'>>;
  serviceTicketCreate?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketCreateArgs, 'input'>>;
  serviceTicketDelete?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketDeleteArgs, 'input'>>;
  serviceTicketRemovePhoto?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketRemovePhotoArgs, 'input'>>;
  serviceTicketSubmit?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketSubmitArgs, 'input'>>;
  serviceTicketUpdate?: Resolver<ResolversTypes['ServiceTicketMutationResult'], ParentType, ContextType, RequireFields<MutationServiceTicketUpdateArgs, 'input'>>;
  userCreate?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType>;
  userUpdate?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationUserUpdateArgs, 'input'>>;
}>;

export type MutationResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MutationResult'] = ResolversParentTypes['MutationResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'MemberMutationResult' | 'ServiceTicketPhotoAuthHeaderResult' | 'UserMutationResult', ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
}>;

export type MutationStatusResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MutationStatus'] = ResolversParentTypes['MutationStatus']> = ResolversObject<{
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

export type PointResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Point'] = ResolversParentTypes['Point']> = ResolversObject<{
  coordinates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Float']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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

export type PropertyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = ResolversObject<{
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
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyBlobFileAuthHeaderResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PropertyBlobFileAuthHeaderResult'] = ResolversParentTypes['PropertyBlobFileAuthHeaderResult']
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyMutationResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PropertyMutationResult'] = ResolversParentTypes['PropertyMutationResult']
> = ResolversObject<{
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyPermissionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PropertyPermissions'] = ResolversParentTypes['PropertyPermissions']> = ResolversObject<{
  canEditOwnProperty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageProperties?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PropertyResult'] = ResolversParentTypes['PropertyResult']> = ResolversObject<{
  additionalAmenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['AdditionalAmenitiesSearchResult']>>>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  bathrooms?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bedrooms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  communityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertySearchFacetsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PropertySearchFacets'] = ResolversParentTypes['PropertySearchFacets']> = ResolversObject<{
  additionalAmenitiesAmenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  additionalAmenitiesCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  listedForLease?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  listedForRent?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  listedForSale?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<Array<Maybe<ResolversTypes['FacetDetail']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertySearchResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PropertySearchResult'] = ResolversParentTypes['PropertySearchResult']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  facets?: Resolver<Maybe<ResolversTypes['PropertySearchFacets']>, ParentType, ContextType>;
  propertyResults?: Resolver<Maybe<Array<Maybe<ResolversTypes['PropertyResult']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  communities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Community']>>>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  communityByDomain?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityByDomainArgs, 'domain'>>;
  communityByHandle?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityByHandleArgs, 'handle'>>;
  communityById?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityByIdArgs, 'id'>>;
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
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType, RequireFields<QueryServiceTicketArgs, 'id'>>;
  serviceTicketsAssignedToCurrentUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType, RequireFields<QueryServiceTicketsByCommunityIdArgs, 'communityId'>>;
  serviceTicketsClosedByRequestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsOpenByCommunity?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsOpenByRequestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
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

export type RoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
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

export type RoleMutationResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RoleMutationResult'] = ResolversParentTypes['RoleMutationResult']> = ResolversObject<{
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RolePermissionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RolePermissions'] = ResolversParentTypes['RolePermissions']> = ResolversObject<{
  communityPermissions?: Resolver<ResolversTypes['CommunityPermissions'], ParentType, ContextType>;
  propertyPermissions?: Resolver<ResolversTypes['PropertyPermissions'], ParentType, ContextType>;
  serviceTicketPermissions?: Resolver<ResolversTypes['ServiceTicketPermissions'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type ServiceTicketResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ServiceTicket'] = ResolversParentTypes['ServiceTicket']> = ResolversObject<{
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
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketActivityDetailResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ServiceTicketActivityDetail'] = ResolversParentTypes['ServiceTicketActivityDetail']
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
  ContextType = Context,
  ParentType extends ResolversParentTypes['ServiceTicketMutationResult'] = ResolversParentTypes['ServiceTicketMutationResult']
> = ResolversObject<{
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketPermissionsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ServiceTicketPermissions'] = ResolversParentTypes['ServiceTicketPermissions']
> = ResolversObject<{
  canAssignTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canCreateTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canWorkOnTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketPhotoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ServiceTicketPhoto'] = ResolversParentTypes['ServiceTicketPhoto']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketPhotoAuthHeaderResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ServiceTicketPhotoAuthHeaderResult'] = ResolversParentTypes['ServiceTicketPhotoAuthHeaderResult']
> = ResolversObject<{
  authHeader?: Resolver<Maybe<ResolversTypes['BlobAuthHeader']>, ParentType, ContextType>;
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
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

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
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

export type UserMutationResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserMutationResult'] = ResolversParentTypes['UserMutationResult']> = ResolversObject<{
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

export type Resolvers<ContextType = Context> = ResolversObject<{
  AdditionalAmenities?: AdditionalAmenitiesResolvers<ContextType>;
  AdditionalAmenitiesSearchResult?: AdditionalAmenitiesSearchResultResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  BedroomDetails?: BedroomDetailsResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BlobAuthHeader?: BlobAuthHeaderResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  Community?: CommunityResolvers<ContextType>;
  CommunityBlobContentAuthHeaderResult?: CommunityBlobContentAuthHeaderResultResolvers<ContextType>;
  CommunityMutationResult?: CommunityMutationResultResolvers<ContextType>;
  CommunityPermissions?: CommunityPermissionsResolvers<ContextType>;
  Currency?: GraphQLScalarType;
  CurrentUser?: CurrentUserResolvers<ContextType>;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
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
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  ListingDetails?: ListingDetailsResolvers<ContextType>;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
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
  MongoEmbeddedBase?: MongoEmbeddedBaseResolvers<ContextType>;
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
  SafeInt?: GraphQLScalarType;
  ServiceTicket?: ServiceTicketResolvers<ContextType>;
  ServiceTicketActivityDetail?: ServiceTicketActivityDetailResolvers<ContextType>;
  ServiceTicketMutationResult?: ServiceTicketMutationResultResolvers<ContextType>;
  ServiceTicketPermissions?: ServiceTicketPermissionsResolvers<ContextType>;
  ServiceTicketPhoto?: ServiceTicketPhotoResolvers<ContextType>;
  ServiceTicketPhotoAuthHeaderResult?: ServiceTicketPhotoAuthHeaderResultResolvers<ContextType>;
  Time?: GraphQLScalarType;
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

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  cacheControl22?: CacheControl22DirectiveResolver<any, any, ContextType>;
}>;
