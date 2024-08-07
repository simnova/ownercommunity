import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphqlContext } from '../../init/graphql-context-builder';
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

export type AddPaymentInstrumentInput = {
  billingAddressLine1: Scalars['String'];
  billingAddressLine2?: InputMaybe<Scalars['String']>;
  billingCity: Scalars['String'];
  billingCountry: Scalars['String'];
  billingEmail: Scalars['String'];
  billingFirstName: Scalars['String'];
  billingLastName: Scalars['String'];
  billingPhone: Scalars['String'];
  billingPostalCode: Scalars['String'];
  billingState: Scalars['String'];
  isDefault: Scalars['Boolean'];
  paymentToken: Scalars['String'];
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

export type AmountDetails = {
  __typename?: 'AmountDetails';
  amount?: Maybe<Scalars['Float']>;
  authorizedAmount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
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

export type ContactInformation = {
  __typename?: 'ContactInformation';
  email: Scalars['String'];
};

export type ContactInformationInput = {
  email?: InputMaybe<Scalars['String']>;
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

export type IdentityDetails = {
  __typename?: 'IdentityDetails';
  lastName: Scalars['String'];
  legalNameConsistsOfOneName: Scalars['Boolean'];
  restOfName?: Maybe<Scalars['String']>;
};

export type IdentityDetailsInput = {
  lastName?: InputMaybe<Scalars['String']>;
  legalNameConsistsOfOneName?: InputMaybe<Scalars['Boolean']>;
  restOfName?: InputMaybe<Scalars['String']>;
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
  cybersourceCustomerId?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  isAdmin?: Maybe<Scalars['Boolean']>;
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
  cybersourceCustomerId?: InputMaybe<Scalars['String']>;
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
  memberAddPaymentInstrument: MemberMutationResult;
  memberCreate: MemberMutationResult;
  memberDeletePaymentInstrument: MutationStatus;
  memberProfileAvatarCreateAuthHeader: MemberAvatarImageAuthHeaderResult;
  memberProfileAvatarRemove: MemberMutationResult;
  memberProfileUpdate: MemberMutationResult;
  memberSetDefaultPaymentInstrument: MutationStatus;
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
  staffRoleAdd: StaffRoleMutationResult;
  staffRoleDeleteAndReassign: StaffRoleMutationResult;
  staffRoleUpdate: StaffRoleMutationResult;
  staffUserCreate: StaffUserMutationResult;
  /** Allows the user to update their profile */
  staffUserUpdate: StaffUserMutationResult;
  userCreate: UserMutationResult;
  /** Allows the user to update their profile */
  userUpdate: UserMutationResult;
  violationTicketAddUpdateActivity: ViolationTicketMutationResult;
  violationTicketAssign: ViolationTicketMutationResult;
  violationTicketChangeStatus: ViolationTicketMutationResult;
  violationTicketCreate: ViolationTicketMutationResult;
  violationTicketDelete: ViolationTicketMutationResult;
  violationTicketProcessPayment: ViolationTicketMutationResult;
  violationTicketUpdate: ViolationTicketMutationResult;
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
export type MutationMemberAddPaymentInstrumentArgs = {
  input: AddPaymentInstrumentInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberCreateArgs = {
  input: MemberCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberDeletePaymentInstrumentArgs = {
  paymentInstrumentId: Scalars['String'];
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
export type MutationMemberSetDefaultPaymentInstrumentArgs = {
  paymentInstrumentId: Scalars['String'];
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
export type MutationStaffRoleAddArgs = {
  input: StaffRoleAddInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationStaffRoleDeleteAndReassignArgs = {
  input: StaffRoleDeleteAndReassignInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationStaffRoleUpdateArgs = {
  input: StaffRoleUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationStaffUserUpdateArgs = {
  input: StaffUserUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketAddUpdateActivityArgs = {
  input: ViolationTicketAddUpdateActivityInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketAssignArgs = {
  input: ViolationTicketAssignInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketChangeStatusArgs = {
  input: ViolationTicketChangeStatusInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketCreateArgs = {
  input: ViolationTicketCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketDeleteArgs = {
  input: ViolationTicketDeleteInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketProcessPaymentArgs = {
  input: ViolationTicketProcessPaymentInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketUpdateArgs = {
  input: ViolationTicketUpdateInput;
};

export type MutationResult = {
  status: MutationStatus;
};

export type MutationStatus = {
  __typename?: 'MutationStatus';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PaymentBillingInfo = {
  __typename?: 'PaymentBillingInfo';
  billingAddressLine1?: Maybe<Scalars['String']>;
  billingAddressLine2?: Maybe<Scalars['String']>;
  billingCity?: Maybe<Scalars['String']>;
  billingCountry?: Maybe<Scalars['String']>;
  billingEmail?: Maybe<Scalars['String']>;
  billingFirstName?: Maybe<Scalars['String']>;
  billingLastName?: Maybe<Scalars['String']>;
  billingPhone?: Maybe<Scalars['String']>;
  billingPostalCode?: Maybe<Scalars['String']>;
  billingState?: Maybe<Scalars['String']>;
};

export type PaymentInstrument = {
  __typename?: 'PaymentInstrument';
  billTo?: Maybe<PaymentBillingInfo>;
  cardNumber?: Maybe<Scalars['String']>;
  cardType?: Maybe<Scalars['String']>;
  expirationMonth?: Maybe<Scalars['String']>;
  expirationYear?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  paymentInstrumentId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type PaymentInstrumentResult = {
  __typename?: 'PaymentInstrumentResult';
  paymentInstruments?: Maybe<Array<Maybe<PaymentInstrument>>>;
  status: MutationStatus;
};

export type PaymentTransactionError = {
  __typename?: 'PaymentTransactionError';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type PaymentTransactionsResult = {
  __typename?: 'PaymentTransactionsResult';
  amount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  isSuccess?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  successTimestamp?: Maybe<Scalars['DateTime']>;
  transactionId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PermissionsInput = {
  communityPermissions: CommunityPermissionsInput;
  propertyPermissions: PropertyPermissionsInput;
  serviceTicketPermissions: ServiceTicketPermissionsInput;
  violationTicketPermissions: ViolationTicketPermissionsInput;
};

export type PersonalInformation = {
  __typename?: 'PersonalInformation';
  contactInformation?: Maybe<ContactInformation>;
  identityDetails?: Maybe<IdentityDetails>;
};

export type PersonalInformationInput = {
  contactInformation?: InputMaybe<ContactInformationInput>;
  identityDetails?: InputMaybe<IdentityDetailsInput>;
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
  cybersourcePublicKeyId?: Maybe<Scalars['String']>;
  getAllPropertyTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  getMapSasToken?: Maybe<Scalars['String']>;
  member?: Maybe<Member>;
  memberAssignableToViolationTickets?: Maybe<Member>;
  memberForCurrentUser?: Maybe<Member>;
  memberPaymentInstruments?: Maybe<PaymentInstrumentResult>;
  members?: Maybe<Array<Maybe<Member>>>;
  membersAssignableToTickets?: Maybe<Array<Maybe<Member>>>;
  membersByCommunityId?: Maybe<Array<Maybe<Member>>>;
  membersByUserExternalId?: Maybe<Array<Maybe<Member>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  propertiesByCommunityId?: Maybe<Array<Maybe<Property>>>;
  propertiesByOwnerId?: Maybe<Array<Maybe<Property>>>;
  propertiesSearch?: Maybe<PropertySearchResult>;
  property?: Maybe<Property>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  rolesByCommunityId?: Maybe<Array<Maybe<Role>>>;
  serverDate?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  serviceTicket?: Maybe<ServiceTicket>;
  serviceTicketReIndex?: Maybe<ServiceTicketsSearchResult>;
  serviceTicketsAssignedToCurrentUser?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsByCommunityId?: Maybe<Array<Maybe<Ticket>>>;
  serviceTicketsClosedByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByCommunity?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsSearch?: Maybe<ServiceTicketsSearchResult>;
  serviceTicketsSearchAdmin?: Maybe<ServiceTicketsSearchResult>;
  servicesByCommunityId?: Maybe<Array<Maybe<Service>>>;
  staffRole?: Maybe<StaffRole>;
  staffRoles?: Maybe<Array<Maybe<StaffRole>>>;
  staffUser?: Maybe<StaffUser>;
  staffUserCurrent?: Maybe<StaffUser>;
  staffUsers?: Maybe<Array<Maybe<StaffUser>>>;
  user?: Maybe<User>;
  userCurrent?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  violationTicket?: Maybe<ViolationTicket>;
  violationTicketPaymentTransactions?: Maybe<Array<Maybe<PaymentTransactionsResult>>>;
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
export type QueryMemberAssignableToViolationTicketsArgs = {
  violationTicketId: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMembersByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMembersByUserExternalIdArgs = {
  userExternalId: Scalars['String'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertiesByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertiesByOwnerIdArgs = {
  ownerId: Scalars['ObjectID'];
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
export type QueryServiceTicketsSearchAdminArgs = {
  input: ServiceTicketsSearchInput;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServicesByCommunityIdArgs = {
  communityId: Scalars['ID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryStaffRoleArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryStaffUserArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryUserArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryViolationTicketArgs = {
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
  violationTicketPermissions: ViolationTicketPermissions;
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
  messages?: Maybe<Array<Maybe<ServiceTicketV1Message>>>;
  photos?: Maybe<Array<Maybe<ServiceTicketPhoto>>>;
  priority: Scalars['Int'];
  property?: Maybe<Property>;
  requestor: Member;
  revisionRequest?: Maybe<ServiceTicketV1RevisionRequest>;
  schemaVersion?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  status: Scalars['String'];
  ticketType?: Maybe<Scalars['String']>;
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
  description?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<Array<InputMaybe<ServiceTicketV1MessageInput>>>;
  priority?: InputMaybe<Scalars['Int']>;
  propertyId?: InputMaybe<Scalars['ObjectID']>;
  revisionRequest?: InputMaybe<ServiceTicketV1RevisionRequestUpdateInput>;
  serviceId?: InputMaybe<Scalars['ObjectID']>;
  serviceTicketId: Scalars['ObjectID'];
  title?: InputMaybe<Scalars['String']>;
};

export type ServiceTicketV1Message = {
  __typename?: 'ServiceTicketV1Message';
  createdAt: Scalars['DateTime'];
  embedding?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  initiatedBy?: Maybe<Member>;
  isHiddenFromApplicant: Scalars['Boolean'];
  message: Scalars['String'];
  sentBy: Scalars['String'];
};

export type ServiceTicketV1MessageInput = {
  embedding?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ObjectID']>;
  initiatedBy?: InputMaybe<Scalars['ObjectID']>;
  isHiddenFromApplicant?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  sentBy: Scalars['String'];
};

export type ServiceTicketV1RevisionRequest = {
  __typename?: 'ServiceTicketV1RevisionRequest';
  requestedAt: Scalars['DateTime'];
  requestedBy: Member;
  requestedChanges: ServiceTicketV1RevisionRequestedChanges;
  revisionSubmittedAt?: Maybe<Scalars['DateTime']>;
  revisionSummary: Scalars['String'];
};

export type ServiceTicketV1RevisionRequestUpdateInput = {
  requestedAt?: InputMaybe<Scalars['DateTime']>;
  requestedBy?: InputMaybe<Scalars['ObjectID']>;
  requestedChanges?: InputMaybe<ServiceTicketV1RevisionRequestedChangesUpdateInput>;
  revisionSubmittedAt?: InputMaybe<Scalars['DateTime']>;
  revisionSummary?: InputMaybe<Scalars['String']>;
};

export type ServiceTicketV1RevisionRequestedChanges = {
  __typename?: 'ServiceTicketV1RevisionRequestedChanges';
  requestUpdatedAssignment: Scalars['Boolean'];
  requestUpdatedProperty: Scalars['Boolean'];
  requestUpdatedStatus: Scalars['Boolean'];
};

export type ServiceTicketV1RevisionRequestedChangesUpdateInput = {
  requestUpdatedAssignment?: InputMaybe<Scalars['Boolean']>;
  requestUpdatedProperty?: InputMaybe<Scalars['Boolean']>;
  requestUpdatedStatus?: InputMaybe<Scalars['Boolean']>;
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
  ticketType?: Maybe<Scalars['String']>;
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
  communityId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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

export type StaffCommunityPermissions = {
  __typename?: 'StaffCommunityPermissions';
  canChangeCommunityOwner: Scalars['Boolean'];
  canDeleteCommunities: Scalars['Boolean'];
  canManageAllCommunities: Scalars['Boolean'];
  canManageStaffRolesAndPermissions: Scalars['Boolean'];
  canReIndexSearchCollections: Scalars['Boolean'];
};

export type StaffCommunityPermissionsInput = {
  canChangeCommunityOwner: Scalars['Boolean'];
  canDeleteCommunities: Scalars['Boolean'];
  canManageAllCommunities: Scalars['Boolean'];
  canManageStaffRolesAndPermissions: Scalars['Boolean'];
  canReIndexSearchCollections: Scalars['Boolean'];
};

export type StaffPermissions = {
  __typename?: 'StaffPermissions';
  communityPermissions: StaffCommunityPermissions;
};

export type StaffPermissionsInput = {
  communityPermissions: StaffCommunityPermissionsInput;
};

export type StaffRole = MongoBase & {
  __typename?: 'StaffRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectID'];
  isDefault: Scalars['Boolean'];
  permissions: StaffPermissions;
  roleName: Scalars['String'];
  schemaVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StaffRoleAddInput = {
  permissions: StaffPermissionsInput;
  roleName: Scalars['String'];
};

export type StaffRoleDeleteAndReassignInput = {
  roleToDelete: Scalars['ObjectID'];
  roleToReassignTo: Scalars['ObjectID'];
};

export type StaffRoleMutationResult = MutationResult & {
  __typename?: 'StaffRoleMutationResult';
  role?: Maybe<StaffRole>;
  status: MutationStatus;
};

export type StaffRoleUpdateInput = {
  id: Scalars['ObjectID'];
  permissions: StaffPermissionsInput;
  roleName: Scalars['String'];
};

export type StaffUser = MongoBase & {
  __typename?: 'StaffUser';
  accessBlocked?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<StaffRole>;
  schemaVersion?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StaffUserMutationResult = MutationResult & {
  __typename?: 'StaffUserMutationResult';
  status: MutationStatus;
  user?: Maybe<StaffUser>;
};

export type StaffUserUpdateInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ObjectID']>;
};

export type Ticket = ServiceTicket | ViolationTicket;

export type Transaction = {
  __typename?: 'Transaction';
  amountDetails?: Maybe<AmountDetails>;
  clientReferenceCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  error?: Maybe<PaymentTransactionError>;
  id: Scalars['ObjectID'];
  isSuccess?: Maybe<Scalars['Boolean']>;
  reconciliationId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  successTimestamp?: Maybe<Scalars['DateTime']>;
  transactionId?: Maybe<Scalars['String']>;
  transactionTime?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
};

export type User = MongoBase & {
  __typename?: 'User';
  accessBlocked?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  personalInformation?: Maybe<PersonalInformation>;
  schemaVersion?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMutationResult = MutationResult & {
  __typename?: 'UserMutationResult';
  status: MutationStatus;
  user?: Maybe<User>;
};

export type UserUpdateInput = {
  displayName?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  personalInformation?: InputMaybe<PersonalInformationInput>;
};

/** An Violation ticket describes violation ticket type. */
export type ViolationTicket = {
  __typename?: 'ViolationTicket';
  activityLog?: Maybe<Array<Maybe<ServiceTicketActivityDetail>>>;
  assignedTo?: Maybe<Member>;
  community: Community;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ObjectID'];
  messages?: Maybe<Array<Maybe<ViolationTicketV1Message>>>;
  paymentTransactions?: Maybe<Array<Maybe<Transaction>>>;
  penaltyAmount?: Maybe<Scalars['Float']>;
  penaltyPaidDate?: Maybe<Scalars['DateTime']>;
  photos?: Maybe<Array<Maybe<ServiceTicketPhoto>>>;
  priority: Scalars['Int'];
  property?: Maybe<Property>;
  requestor: Member;
  revisionRequest?: Maybe<ViolationTicketV1RevisionRequest>;
  schemaVersion?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  status: Scalars['String'];
  ticketType?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ViolationTicketAddUpdateActivityInput = {
  activityDescription: Scalars['String'];
  violationTicketId: Scalars['ObjectID'];
};

export type ViolationTicketAssignInput = {
  assignedToId?: InputMaybe<Scalars['ObjectID']>;
  violationTicketId: Scalars['ObjectID'];
};

export type ViolationTicketChangeStatusInput = {
  activityDescription?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  violationTicketId: Scalars['ObjectID'];
};

export type ViolationTicketCreateInput = {
  description: Scalars['String'];
  penaltyAmount: Scalars['Float'];
  propertyId: Scalars['ObjectID'];
  serviceId?: InputMaybe<Scalars['ObjectID']>;
  title: Scalars['String'];
};

export type ViolationTicketDeleteInput = {
  violationTicketId: Scalars['ObjectID'];
};

export type ViolationTicketMutationResult = MutationResult & {
  __typename?: 'ViolationTicketMutationResult';
  status: MutationStatus;
  violationTicket?: Maybe<ViolationTicket>;
};

export type ViolationTicketPermissions = {
  __typename?: 'ViolationTicketPermissions';
  canAssignTickets: Scalars['Boolean'];
  canCreateTickets: Scalars['Boolean'];
  canManageTickets: Scalars['Boolean'];
  canWorkOnTickets: Scalars['Boolean'];
};

export type ViolationTicketPermissionsInput = {
  canAssignTickets: Scalars['Boolean'];
  canCreateTickets: Scalars['Boolean'];
  canManageTickets: Scalars['Boolean'];
  canWorkOnTickets: Scalars['Boolean'];
};

export type ViolationTicketProcessPaymentInput = {
  paymentAmount: Scalars['Float'];
  paymentInstrumentId: Scalars['String'];
  violationTicketId: Scalars['ObjectID'];
};

export type ViolationTicketUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<Array<InputMaybe<ViolationTicketV1MessageInput>>>;
  penaltyAmount?: InputMaybe<Scalars['Float']>;
  priority?: InputMaybe<Scalars['Int']>;
  propertyId?: InputMaybe<Scalars['ObjectID']>;
  revisionRequest?: InputMaybe<ViolationTicketV1RevisionRequestUpdateInput>;
  serviceId?: InputMaybe<Scalars['ObjectID']>;
  title?: InputMaybe<Scalars['String']>;
  violationTicketId: Scalars['ObjectID'];
};

export type ViolationTicketV1Message = {
  __typename?: 'ViolationTicketV1Message';
  createdAt: Scalars['DateTime'];
  embedding?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  initiatedBy?: Maybe<Member>;
  isHiddenFromApplicant: Scalars['Boolean'];
  message: Scalars['String'];
  sentBy: Scalars['String'];
};

export type ViolationTicketV1MessageInput = {
  embedding?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ObjectID']>;
  initiatedBy?: InputMaybe<Scalars['ObjectID']>;
  isHiddenFromApplicant?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  sentBy: Scalars['String'];
};

export type ViolationTicketV1RevisionRequest = {
  __typename?: 'ViolationTicketV1RevisionRequest';
  requestedAt: Scalars['DateTime'];
  requestedBy: Member;
  requestedChanges: ViolationTicketV1RevisionRequestedChanges;
  revisionSubmittedAt?: Maybe<Scalars['DateTime']>;
  revisionSummary: Scalars['String'];
};

export type ViolationTicketV1RevisionRequestUpdateInput = {
  requestedAt?: InputMaybe<Scalars['DateTime']>;
  requestedBy?: InputMaybe<Scalars['ObjectID']>;
  requestedChanges?: InputMaybe<ViolationTicketV1RevisionRequestedChangesUpdateInput>;
  revisionSubmittedAt?: InputMaybe<Scalars['DateTime']>;
  revisionSummary?: InputMaybe<Scalars['String']>;
};

export type ViolationTicketV1RevisionRequestedChanges = {
  __typename?: 'ViolationTicketV1RevisionRequestedChanges';
  requestUpdatedAssignment: Scalars['Boolean'];
  requestUpdatedPaymentTransaction: Scalars['Boolean'];
  requestUpdatedProperty: Scalars['Boolean'];
  requestUpdatedStatus: Scalars['Boolean'];
};

export type ViolationTicketV1RevisionRequestedChangesUpdateInput = {
  requestUpdatedAssignment?: InputMaybe<Scalars['Boolean']>;
  requestUpdatedPaymentTransaction?: InputMaybe<Scalars['Boolean']>;
  requestUpdatedProperty?: InputMaybe<Scalars['Boolean']>;
  requestUpdatedStatus?: InputMaybe<Scalars['Boolean']>;
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

/** Mapping of union types */
export type ResolversUnionTypes = ResolversObject<{
  Ticket: ServiceTicket | ViolationTicket;
}>;

/** Mapping of union parent types */
export type ResolversUnionParentTypes = ResolversObject<{
  Ticket: ServiceTicket | ViolationTicket;
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']>;
  AddPaymentInstrumentInput: AddPaymentInstrumentInput;
  AdditionalAmenities: ResolverTypeWrapper<AdditionalAmenities>;
  AdditionalAmenitiesFilterInput: AdditionalAmenitiesFilterInput;
  AdditionalAmenitiesInput: AdditionalAmenitiesInput;
  AdditionalAmenitiesSearchResult: ResolverTypeWrapper<AdditionalAmenitiesSearchResult>;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  AmountDetails: ResolverTypeWrapper<AmountDetails>;
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
  ContactInformation: ResolverTypeWrapper<ContactInformation>;
  ContactInformationInput: ContactInformationInput;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
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
  IdentityDetails: ResolverTypeWrapper<IdentityDetails>;
  IdentityDetailsInput: IdentityDetailsInput;
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
    | ResolversTypes['Member']
    | ResolversTypes['Property']
    | ResolversTypes['Role']
    | ResolversTypes['Service']
    | ResolversTypes['ServiceTicket']
    | ResolversTypes['StaffRole']
    | ResolversTypes['StaffUser']
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
    | ResolversTypes['StaffRoleMutationResult']
    | ResolversTypes['StaffUserMutationResult']
    | ResolversTypes['UserMutationResult']
    | ResolversTypes['ViolationTicketMutationResult'];
  MutationStatus: ResolverTypeWrapper<MutationStatus>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PaymentBillingInfo: ResolverTypeWrapper<PaymentBillingInfo>;
  PaymentInstrument: ResolverTypeWrapper<PaymentInstrument>;
  PaymentInstrumentResult: ResolverTypeWrapper<PaymentInstrumentResult>;
  PaymentTransactionError: ResolverTypeWrapper<PaymentTransactionError>;
  PaymentTransactionsResult: ResolverTypeWrapper<PaymentTransactionsResult>;
  PermissionsInput: PermissionsInput;
  PersonalInformation: ResolverTypeWrapper<PersonalInformation>;
  PersonalInformationInput: PersonalInformationInput;
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
  ServiceTicketV1Message: ResolverTypeWrapper<ServiceTicketV1Message>;
  ServiceTicketV1MessageInput: ServiceTicketV1MessageInput;
  ServiceTicketV1RevisionRequest: ResolverTypeWrapper<ServiceTicketV1RevisionRequest>;
  ServiceTicketV1RevisionRequestUpdateInput: ServiceTicketV1RevisionRequestUpdateInput;
  ServiceTicketV1RevisionRequestedChanges: ResolverTypeWrapper<ServiceTicketV1RevisionRequestedChanges>;
  ServiceTicketV1RevisionRequestedChangesUpdateInput: ServiceTicketV1RevisionRequestedChangesUpdateInput;
  ServiceTicketsResult: ResolverTypeWrapper<ServiceTicketsResult>;
  ServiceTicketsSearchFacets: ResolverTypeWrapper<ServiceTicketsSearchFacets>;
  ServiceTicketsSearchFilterDetail: ServiceTicketsSearchFilterDetail;
  ServiceTicketsSearchInput: ServiceTicketsSearchInput;
  ServiceTicketsSearchOptions: ServiceTicketsSearchOptions;
  ServiceTicketsSearchResult: ResolverTypeWrapper<ServiceTicketsSearchResult>;
  ServiceUpdateInput: ServiceUpdateInput;
  StaffCommunityPermissions: ResolverTypeWrapper<StaffCommunityPermissions>;
  StaffCommunityPermissionsInput: StaffCommunityPermissionsInput;
  StaffPermissions: ResolverTypeWrapper<StaffPermissions>;
  StaffPermissionsInput: StaffPermissionsInput;
  StaffRole: ResolverTypeWrapper<StaffRole>;
  StaffRoleAddInput: StaffRoleAddInput;
  StaffRoleDeleteAndReassignInput: StaffRoleDeleteAndReassignInput;
  StaffRoleMutationResult: ResolverTypeWrapper<StaffRoleMutationResult>;
  StaffRoleUpdateInput: StaffRoleUpdateInput;
  StaffUser: ResolverTypeWrapper<StaffUser>;
  StaffUserMutationResult: ResolverTypeWrapper<StaffUserMutationResult>;
  StaffUserUpdateInput: StaffUserUpdateInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Ticket: ResolverTypeWrapper<ResolversUnionTypes['Ticket']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  User: ResolverTypeWrapper<User>;
  UserMutationResult: ResolverTypeWrapper<UserMutationResult>;
  UserUpdateInput: UserUpdateInput;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  ViolationTicket: ResolverTypeWrapper<ViolationTicket>;
  ViolationTicketAddUpdateActivityInput: ViolationTicketAddUpdateActivityInput;
  ViolationTicketAssignInput: ViolationTicketAssignInput;
  ViolationTicketChangeStatusInput: ViolationTicketChangeStatusInput;
  ViolationTicketCreateInput: ViolationTicketCreateInput;
  ViolationTicketDeleteInput: ViolationTicketDeleteInput;
  ViolationTicketMutationResult: ResolverTypeWrapper<ViolationTicketMutationResult>;
  ViolationTicketPermissions: ResolverTypeWrapper<ViolationTicketPermissions>;
  ViolationTicketPermissionsInput: ViolationTicketPermissionsInput;
  ViolationTicketProcessPaymentInput: ViolationTicketProcessPaymentInput;
  ViolationTicketUpdateInput: ViolationTicketUpdateInput;
  ViolationTicketV1Message: ResolverTypeWrapper<ViolationTicketV1Message>;
  ViolationTicketV1MessageInput: ViolationTicketV1MessageInput;
  ViolationTicketV1RevisionRequest: ResolverTypeWrapper<ViolationTicketV1RevisionRequest>;
  ViolationTicketV1RevisionRequestUpdateInput: ViolationTicketV1RevisionRequestUpdateInput;
  ViolationTicketV1RevisionRequestedChanges: ResolverTypeWrapper<ViolationTicketV1RevisionRequestedChanges>;
  ViolationTicketV1RevisionRequestedChangesUpdateInput: ViolationTicketV1RevisionRequestedChangesUpdateInput;
  Void: ResolverTypeWrapper<Scalars['Void']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccountNumber: Scalars['AccountNumber'];
  AddPaymentInstrumentInput: AddPaymentInstrumentInput;
  AdditionalAmenities: AdditionalAmenities;
  AdditionalAmenitiesFilterInput: AdditionalAmenitiesFilterInput;
  AdditionalAmenitiesInput: AdditionalAmenitiesInput;
  AdditionalAmenitiesSearchResult: AdditionalAmenitiesSearchResult;
  Address: Address;
  AddressInput: AddressInput;
  AmountDetails: AmountDetails;
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
  ContactInformation: ContactInformation;
  ContactInformationInput: ContactInformationInput;
  CountryCode: Scalars['CountryCode'];
  Cuid: Scalars['Cuid'];
  Currency: Scalars['Currency'];
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
  IdentityDetails: IdentityDetails;
  IdentityDetailsInput: IdentityDetailsInput;
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
    | ResolversParentTypes['Member']
    | ResolversParentTypes['Property']
    | ResolversParentTypes['Role']
    | ResolversParentTypes['Service']
    | ResolversParentTypes['ServiceTicket']
    | ResolversParentTypes['StaffRole']
    | ResolversParentTypes['StaffUser']
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
    | ResolversParentTypes['StaffRoleMutationResult']
    | ResolversParentTypes['StaffUserMutationResult']
    | ResolversParentTypes['UserMutationResult']
    | ResolversParentTypes['ViolationTicketMutationResult'];
  MutationStatus: MutationStatus;
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  PaymentBillingInfo: PaymentBillingInfo;
  PaymentInstrument: PaymentInstrument;
  PaymentInstrumentResult: PaymentInstrumentResult;
  PaymentTransactionError: PaymentTransactionError;
  PaymentTransactionsResult: PaymentTransactionsResult;
  PermissionsInput: PermissionsInput;
  PersonalInformation: PersonalInformation;
  PersonalInformationInput: PersonalInformationInput;
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
  ServiceTicketV1Message: ServiceTicketV1Message;
  ServiceTicketV1MessageInput: ServiceTicketV1MessageInput;
  ServiceTicketV1RevisionRequest: ServiceTicketV1RevisionRequest;
  ServiceTicketV1RevisionRequestUpdateInput: ServiceTicketV1RevisionRequestUpdateInput;
  ServiceTicketV1RevisionRequestedChanges: ServiceTicketV1RevisionRequestedChanges;
  ServiceTicketV1RevisionRequestedChangesUpdateInput: ServiceTicketV1RevisionRequestedChangesUpdateInput;
  ServiceTicketsResult: ServiceTicketsResult;
  ServiceTicketsSearchFacets: ServiceTicketsSearchFacets;
  ServiceTicketsSearchFilterDetail: ServiceTicketsSearchFilterDetail;
  ServiceTicketsSearchInput: ServiceTicketsSearchInput;
  ServiceTicketsSearchOptions: ServiceTicketsSearchOptions;
  ServiceTicketsSearchResult: ServiceTicketsSearchResult;
  ServiceUpdateInput: ServiceUpdateInput;
  StaffCommunityPermissions: StaffCommunityPermissions;
  StaffCommunityPermissionsInput: StaffCommunityPermissionsInput;
  StaffPermissions: StaffPermissions;
  StaffPermissionsInput: StaffPermissionsInput;
  StaffRole: StaffRole;
  StaffRoleAddInput: StaffRoleAddInput;
  StaffRoleDeleteAndReassignInput: StaffRoleDeleteAndReassignInput;
  StaffRoleMutationResult: StaffRoleMutationResult;
  StaffRoleUpdateInput: StaffRoleUpdateInput;
  StaffUser: StaffUser;
  StaffUserMutationResult: StaffUserMutationResult;
  StaffUserUpdateInput: StaffUserUpdateInput;
  String: Scalars['String'];
  Ticket: ResolversUnionParentTypes['Ticket'];
  Time: Scalars['Time'];
  TimeZone: Scalars['TimeZone'];
  Timestamp: Scalars['Timestamp'];
  Transaction: Transaction;
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  User: User;
  UserMutationResult: UserMutationResult;
  UserUpdateInput: UserUpdateInput;
  UtcOffset: Scalars['UtcOffset'];
  ViolationTicket: ViolationTicket;
  ViolationTicketAddUpdateActivityInput: ViolationTicketAddUpdateActivityInput;
  ViolationTicketAssignInput: ViolationTicketAssignInput;
  ViolationTicketChangeStatusInput: ViolationTicketChangeStatusInput;
  ViolationTicketCreateInput: ViolationTicketCreateInput;
  ViolationTicketDeleteInput: ViolationTicketDeleteInput;
  ViolationTicketMutationResult: ViolationTicketMutationResult;
  ViolationTicketPermissions: ViolationTicketPermissions;
  ViolationTicketPermissionsInput: ViolationTicketPermissionsInput;
  ViolationTicketProcessPaymentInput: ViolationTicketProcessPaymentInput;
  ViolationTicketUpdateInput: ViolationTicketUpdateInput;
  ViolationTicketV1Message: ViolationTicketV1Message;
  ViolationTicketV1MessageInput: ViolationTicketV1MessageInput;
  ViolationTicketV1RevisionRequest: ViolationTicketV1RevisionRequest;
  ViolationTicketV1RevisionRequestUpdateInput: ViolationTicketV1RevisionRequestUpdateInput;
  ViolationTicketV1RevisionRequestedChanges: ViolationTicketV1RevisionRequestedChanges;
  ViolationTicketV1RevisionRequestedChangesUpdateInput: ViolationTicketV1RevisionRequestedChangesUpdateInput;
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

export type AmountDetailsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['AmountDetails'] = ResolversParentTypes['AmountDetails'],
> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  authorizedAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type ContactInformationResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ContactInformation'] = ResolversParentTypes['ContactInformation'],
> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type IdentityDetailsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['IdentityDetails'] = ResolversParentTypes['IdentityDetails'],
> = ResolversObject<{
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  legalNameConsistsOfOneName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  restOfName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

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
  cybersourceCustomerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'Community' | 'Member' | 'Property' | 'Role' | 'Service' | 'ServiceTicket' | 'StaffRole' | 'StaffUser' | 'User', ParentType, ContextType>;
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
  memberAddPaymentInstrument?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberAddPaymentInstrumentArgs, 'input'>>;
  memberCreate?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberCreateArgs, 'input'>>;
  memberDeletePaymentInstrument?: Resolver<
    ResolversTypes['MutationStatus'],
    ParentType,
    ContextType,
    RequireFields<MutationMemberDeletePaymentInstrumentArgs, 'paymentInstrumentId'>
  >;
  memberProfileAvatarCreateAuthHeader?: Resolver<
    ResolversTypes['MemberAvatarImageAuthHeaderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationMemberProfileAvatarCreateAuthHeaderArgs, 'input'>
  >;
  memberProfileAvatarRemove?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberProfileAvatarRemoveArgs, 'memberId'>>;
  memberProfileUpdate?: Resolver<ResolversTypes['MemberMutationResult'], ParentType, ContextType, RequireFields<MutationMemberProfileUpdateArgs, 'input'>>;
  memberSetDefaultPaymentInstrument?: Resolver<
    ResolversTypes['MutationStatus'],
    ParentType,
    ContextType,
    RequireFields<MutationMemberSetDefaultPaymentInstrumentArgs, 'paymentInstrumentId'>
  >;
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
  staffRoleAdd?: Resolver<ResolversTypes['StaffRoleMutationResult'], ParentType, ContextType, RequireFields<MutationStaffRoleAddArgs, 'input'>>;
  staffRoleDeleteAndReassign?: Resolver<ResolversTypes['StaffRoleMutationResult'], ParentType, ContextType, RequireFields<MutationStaffRoleDeleteAndReassignArgs, 'input'>>;
  staffRoleUpdate?: Resolver<ResolversTypes['StaffRoleMutationResult'], ParentType, ContextType, RequireFields<MutationStaffRoleUpdateArgs, 'input'>>;
  staffUserCreate?: Resolver<ResolversTypes['StaffUserMutationResult'], ParentType, ContextType>;
  staffUserUpdate?: Resolver<ResolversTypes['StaffUserMutationResult'], ParentType, ContextType, RequireFields<MutationStaffUserUpdateArgs, 'input'>>;
  userCreate?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType>;
  userUpdate?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationUserUpdateArgs, 'input'>>;
  violationTicketAddUpdateActivity?: Resolver<
    ResolversTypes['ViolationTicketMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationViolationTicketAddUpdateActivityArgs, 'input'>
  >;
  violationTicketAssign?: Resolver<ResolversTypes['ViolationTicketMutationResult'], ParentType, ContextType, RequireFields<MutationViolationTicketAssignArgs, 'input'>>;
  violationTicketChangeStatus?: Resolver<
    ResolversTypes['ViolationTicketMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationViolationTicketChangeStatusArgs, 'input'>
  >;
  violationTicketCreate?: Resolver<ResolversTypes['ViolationTicketMutationResult'], ParentType, ContextType, RequireFields<MutationViolationTicketCreateArgs, 'input'>>;
  violationTicketDelete?: Resolver<ResolversTypes['ViolationTicketMutationResult'], ParentType, ContextType, RequireFields<MutationViolationTicketDeleteArgs, 'input'>>;
  violationTicketProcessPayment?: Resolver<
    ResolversTypes['ViolationTicketMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationViolationTicketProcessPaymentArgs, 'input'>
  >;
  violationTicketUpdate?: Resolver<ResolversTypes['ViolationTicketMutationResult'], ParentType, ContextType, RequireFields<MutationViolationTicketUpdateArgs, 'input'>>;
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
    | 'StaffRoleMutationResult'
    | 'StaffUserMutationResult'
    | 'UserMutationResult'
    | 'ViolationTicketMutationResult',
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

export type PaymentBillingInfoResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PaymentBillingInfo'] = ResolversParentTypes['PaymentBillingInfo'],
> = ResolversObject<{
  billingAddressLine1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingAddressLine2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingFirstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingLastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingPostalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentInstrumentResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PaymentInstrument'] = ResolversParentTypes['PaymentInstrument'],
> = ResolversObject<{
  billTo?: Resolver<Maybe<ResolversTypes['PaymentBillingInfo']>, ParentType, ContextType>;
  cardNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cardType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationMonth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationYear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isDefault?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  paymentInstrumentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentInstrumentResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PaymentInstrumentResult'] = ResolversParentTypes['PaymentInstrumentResult'],
> = ResolversObject<{
  paymentInstruments?: Resolver<Maybe<Array<Maybe<ResolversTypes['PaymentInstrument']>>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentTransactionErrorResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PaymentTransactionError'] = ResolversParentTypes['PaymentTransactionError'],
> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentTransactionsResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PaymentTransactionsResult'] = ResolversParentTypes['PaymentTransactionsResult'],
> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isSuccess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successTimestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PersonalInformationResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['PersonalInformation'] = ResolversParentTypes['PersonalInformation'],
> = ResolversObject<{
  contactInformation?: Resolver<Maybe<ResolversTypes['ContactInformation']>, ParentType, ContextType>;
  identityDetails?: Resolver<Maybe<ResolversTypes['IdentityDetails']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

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
  cybersourcePublicKeyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getAllPropertyTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  getMapSasToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberArgs, 'id'>>;
  memberAssignableToViolationTickets?: Resolver<
    Maybe<ResolversTypes['Member']>,
    ParentType,
    ContextType,
    RequireFields<QueryMemberAssignableToViolationTicketsArgs, 'violationTicketId'>
  >;
  memberForCurrentUser?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  memberPaymentInstruments?: Resolver<Maybe<ResolversTypes['PaymentInstrumentResult']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  membersAssignableToTickets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  membersByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType, RequireFields<QueryMembersByCommunityIdArgs, 'communityId'>>;
  membersByUserExternalId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Member']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryMembersByUserExternalIdArgs, 'userExternalId'>
  >;
  properties?: Resolver<Maybe<Array<Maybe<ResolversTypes['Property']>>>, ParentType, ContextType>;
  propertiesByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Property']>>>, ParentType, ContextType, RequireFields<QueryPropertiesByCommunityIdArgs, 'communityId'>>;
  propertiesByOwnerId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Property']>>>, ParentType, ContextType, RequireFields<QueryPropertiesByOwnerIdArgs, 'ownerId'>>;
  propertiesSearch?: Resolver<Maybe<ResolversTypes['PropertySearchResult']>, ParentType, ContextType, RequireFields<QueryPropertiesSearchArgs, 'input'>>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QueryPropertyArgs, 'id'>>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  rolesByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType, RequireFields<QueryRolesByCommunityIdArgs, 'communityId'>>;
  serverDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType, RequireFields<QueryServiceArgs, 'id'>>;
  serviceTicket?: Resolver<Maybe<ResolversTypes['ServiceTicket']>, ParentType, ContextType, RequireFields<QueryServiceTicketArgs, 'id'>>;
  serviceTicketReIndex?: Resolver<Maybe<ResolversTypes['ServiceTicketsSearchResult']>, ParentType, ContextType>;
  serviceTicketsAssignedToCurrentUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsByCommunityId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Ticket']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryServiceTicketsByCommunityIdArgs, 'communityId'>
  >;
  serviceTicketsClosedByRequestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsOpenByCommunity?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsOpenByRequestor?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicket']>>>, ParentType, ContextType>;
  serviceTicketsSearch?: Resolver<Maybe<ResolversTypes['ServiceTicketsSearchResult']>, ParentType, ContextType, RequireFields<QueryServiceTicketsSearchArgs, 'input'>>;
  serviceTicketsSearchAdmin?: Resolver<
    Maybe<ResolversTypes['ServiceTicketsSearchResult']>,
    ParentType,
    ContextType,
    RequireFields<QueryServiceTicketsSearchAdminArgs, 'input'>
  >;
  servicesByCommunityId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Service']>>>, ParentType, ContextType, RequireFields<QueryServicesByCommunityIdArgs, 'communityId'>>;
  staffRole?: Resolver<Maybe<ResolversTypes['StaffRole']>, ParentType, ContextType, RequireFields<QueryStaffRoleArgs, 'id'>>;
  staffRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['StaffRole']>>>, ParentType, ContextType>;
  staffUser?: Resolver<Maybe<ResolversTypes['StaffUser']>, ParentType, ContextType, RequireFields<QueryStaffUserArgs, 'id'>>;
  staffUserCurrent?: Resolver<Maybe<ResolversTypes['StaffUser']>, ParentType, ContextType>;
  staffUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['StaffUser']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userCurrent?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  violationTicket?: Resolver<Maybe<ResolversTypes['ViolationTicket']>, ParentType, ContextType, RequireFields<QueryViolationTicketArgs, 'id'>>;
  violationTicketPaymentTransactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['PaymentTransactionsResult']>>>, ParentType, ContextType>;
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
  violationTicketPermissions?: Resolver<ResolversTypes['ViolationTicketPermissions'], ParentType, ContextType>;
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
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketV1Message']>>>, ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketPhoto']>>>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  requestor?: Resolver<ResolversTypes['Member'], ParentType, ContextType>;
  revisionRequest?: Resolver<Maybe<ResolversTypes['ServiceTicketV1RevisionRequest']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ticketType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type ServiceTicketV1MessageResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketV1Message'] = ResolversParentTypes['ServiceTicketV1Message'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  embedding?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  initiatedBy?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  isHiddenFromApplicant?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sentBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketV1RevisionRequestResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketV1RevisionRequest'] = ResolversParentTypes['ServiceTicketV1RevisionRequest'],
> = ResolversObject<{
  requestedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  requestedBy?: Resolver<ResolversTypes['Member'], ParentType, ContextType>;
  requestedChanges?: Resolver<ResolversTypes['ServiceTicketV1RevisionRequestedChanges'], ParentType, ContextType>;
  revisionSubmittedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  revisionSummary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceTicketV1RevisionRequestedChangesResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ServiceTicketV1RevisionRequestedChanges'] = ResolversParentTypes['ServiceTicketV1RevisionRequestedChanges'],
> = ResolversObject<{
  requestUpdatedAssignment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestUpdatedProperty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestUpdatedStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  ticketType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type StaffCommunityPermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['StaffCommunityPermissions'] = ResolversParentTypes['StaffCommunityPermissions'],
> = ResolversObject<{
  canChangeCommunityOwner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canDeleteCommunities?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageAllCommunities?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageStaffRolesAndPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canReIndexSearchCollections?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffPermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['StaffPermissions'] = ResolversParentTypes['StaffPermissions'],
> = ResolversObject<{
  communityPermissions?: Resolver<ResolversTypes['StaffCommunityPermissions'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffRoleResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['StaffRole'] = ResolversParentTypes['StaffRole']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  permissions?: Resolver<ResolversTypes['StaffPermissions'], ParentType, ContextType>;
  roleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffRoleMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['StaffRoleMutationResult'] = ResolversParentTypes['StaffRoleMutationResult'],
> = ResolversObject<{
  role?: Resolver<Maybe<ResolversTypes['StaffRole']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffUserResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['StaffUser'] = ResolversParentTypes['StaffUser']> = ResolversObject<{
  accessBlocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['StaffRole']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffUserMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['StaffUserMutationResult'] = ResolversParentTypes['StaffUserMutationResult'],
> = ResolversObject<{
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['StaffUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TicketResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ServiceTicket' | 'ViolationTicket', ParentType, ContextType>;
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

export type TransactionResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction'],
> = ResolversObject<{
  amountDetails?: Resolver<Maybe<ResolversTypes['AmountDetails']>, ParentType, ContextType>;
  clientReferenceCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['PaymentTransactionError']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isSuccess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reconciliationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successTimestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

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
  accessBlocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  personalInformation?: Resolver<Maybe<ResolversTypes['PersonalInformation']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
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

export type ViolationTicketResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ViolationTicket'] = ResolversParentTypes['ViolationTicket'],
> = ResolversObject<{
  activityLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketActivityDetail']>>>, ParentType, ContextType>;
  assignedTo?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['ViolationTicketV1Message']>>>, ParentType, ContextType>;
  paymentTransactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType>;
  penaltyAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  penaltyPaidDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceTicketPhoto']>>>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType>;
  requestor?: Resolver<ResolversTypes['Member'], ParentType, ContextType>;
  revisionRequest?: Resolver<Maybe<ResolversTypes['ViolationTicketV1RevisionRequest']>, ParentType, ContextType>;
  schemaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ticketType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViolationTicketMutationResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ViolationTicketMutationResult'] = ResolversParentTypes['ViolationTicketMutationResult'],
> = ResolversObject<{
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  violationTicket?: Resolver<Maybe<ResolversTypes['ViolationTicket']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViolationTicketPermissionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ViolationTicketPermissions'] = ResolversParentTypes['ViolationTicketPermissions'],
> = ResolversObject<{
  canAssignTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canCreateTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canManageTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canWorkOnTickets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViolationTicketV1MessageResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ViolationTicketV1Message'] = ResolversParentTypes['ViolationTicketV1Message'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  embedding?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  initiatedBy?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  isHiddenFromApplicant?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sentBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViolationTicketV1RevisionRequestResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ViolationTicketV1RevisionRequest'] = ResolversParentTypes['ViolationTicketV1RevisionRequest'],
> = ResolversObject<{
  requestedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  requestedBy?: Resolver<ResolversTypes['Member'], ParentType, ContextType>;
  requestedChanges?: Resolver<ResolversTypes['ViolationTicketV1RevisionRequestedChanges'], ParentType, ContextType>;
  revisionSubmittedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  revisionSummary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViolationTicketV1RevisionRequestedChangesResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['ViolationTicketV1RevisionRequestedChanges'] = ResolversParentTypes['ViolationTicketV1RevisionRequestedChanges'],
> = ResolversObject<{
  requestUpdatedAssignment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestUpdatedPaymentTransaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestUpdatedProperty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestUpdatedStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  AccountNumber?: GraphQLScalarType;
  AdditionalAmenities?: AdditionalAmenitiesResolvers<ContextType>;
  AdditionalAmenitiesSearchResult?: AdditionalAmenitiesSearchResultResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  AmountDetails?: AmountDetailsResolvers<ContextType>;
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
  ContactInformation?: ContactInformationResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
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
  IdentityDetails?: IdentityDetailsResolvers<ContextType>;
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
  PaymentBillingInfo?: PaymentBillingInfoResolvers<ContextType>;
  PaymentInstrument?: PaymentInstrumentResolvers<ContextType>;
  PaymentInstrumentResult?: PaymentInstrumentResultResolvers<ContextType>;
  PaymentTransactionError?: PaymentTransactionErrorResolvers<ContextType>;
  PaymentTransactionsResult?: PaymentTransactionsResultResolvers<ContextType>;
  PersonalInformation?: PersonalInformationResolvers<ContextType>;
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
  ServiceTicketV1Message?: ServiceTicketV1MessageResolvers<ContextType>;
  ServiceTicketV1RevisionRequest?: ServiceTicketV1RevisionRequestResolvers<ContextType>;
  ServiceTicketV1RevisionRequestedChanges?: ServiceTicketV1RevisionRequestedChangesResolvers<ContextType>;
  ServiceTicketsResult?: ServiceTicketsResultResolvers<ContextType>;
  ServiceTicketsSearchFacets?: ServiceTicketsSearchFacetsResolvers<ContextType>;
  ServiceTicketsSearchResult?: ServiceTicketsSearchResultResolvers<ContextType>;
  StaffCommunityPermissions?: StaffCommunityPermissionsResolvers<ContextType>;
  StaffPermissions?: StaffPermissionsResolvers<ContextType>;
  StaffRole?: StaffRoleResolvers<ContextType>;
  StaffRoleMutationResult?: StaffRoleMutationResultResolvers<ContextType>;
  StaffUser?: StaffUserResolvers<ContextType>;
  StaffUserMutationResult?: StaffUserMutationResultResolvers<ContextType>;
  Ticket?: TicketResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  Transaction?: TransactionResolvers<ContextType>;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserMutationResult?: UserMutationResultResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  ViolationTicket?: ViolationTicketResolvers<ContextType>;
  ViolationTicketMutationResult?: ViolationTicketMutationResultResolvers<ContextType>;
  ViolationTicketPermissions?: ViolationTicketPermissionsResolvers<ContextType>;
  ViolationTicketV1Message?: ViolationTicketV1MessageResolvers<ContextType>;
  ViolationTicketV1RevisionRequest?: ViolationTicketV1RevisionRequestResolvers<ContextType>;
  ViolationTicketV1RevisionRequestedChanges?: ViolationTicketV1RevisionRequestedChangesResolvers<ContextType>;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = GraphqlContext> = ResolversObject<{
  cacheControl22?: CacheControl22DirectiveResolver<any, any, ContextType>;
}>;
