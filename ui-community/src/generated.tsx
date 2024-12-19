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
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: any;
  DateTimeISO: any;
  DeweyDecimal: any;
  Duration: any;
  EmailAddress: any;
  GUID: any;
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

/** An AdhocPaymentRequestInput describes adhoc payment request input type. */
export type AdhocPaymentRequestInput = {
  amount: Scalars['Float'];
  isApplicantApprovalRequired: Scalars['Boolean'];
  reason: Scalars['String'];
  violationTicketId: Scalars['ObjectID'];
};

export type AdhocTransaction = {
  __typename?: 'AdhocTransaction';
  amount?: Maybe<Scalars['Float']>;
  approval?: Maybe<Approval>;
  financeReference?: Maybe<FinanceReference>;
  reason?: Maybe<Scalars['String']>;
  requestedBy?: Maybe<Member>;
  requestedOn?: Maybe<Scalars['DateTime']>;
  transactionReference?: Maybe<TransactionReference>;
};

export type Approval = {
  __typename?: 'Approval';
  applicantRespondedAt?: Maybe<Scalars['DateTime']>;
  isApplicantApprovalRequired?: Maybe<Scalars['Boolean']>;
  isApplicantApproved?: Maybe<Scalars['Boolean']>;
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
  Public = 'PUBLIC'
}

export type Community = MongoBase & {
  __typename?: 'Community';
  approvedVendors?: Maybe<Array<Maybe<VendorUser>>>;
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
  approvedVendors?: InputMaybe<Array<InputMaybe<Scalars['ObjectID']>>>;
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

export type FinanceDetails = {
  __typename?: 'FinanceDetails';
  revenueRecognition?: Maybe<RevenueRecognition>;
  serviceFee?: Maybe<Scalars['Float']>;
  transactions?: Maybe<Transactions>;
};

export type FinanceReference = {
  __typename?: 'FinanceReference';
  completedOn?: Maybe<Scalars['DateTime']>;
  creditGlAccount?: Maybe<Scalars['String']>;
  debitGlAccount?: Maybe<Scalars['String']>;
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

export type GlTransaction = {
  __typename?: 'GlTransaction';
  amount?: Maybe<Scalars['Float']>;
  completedOn?: Maybe<Scalars['DateTime']>;
  creditGlAccount?: Maybe<Scalars['String']>;
  debitGlAccount?: Maybe<Scalars['String']>;
  recognitionDate?: Maybe<Scalars['DateTime']>;
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
  memberUpdatePaymentInstrument: MemberMutationResult;
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
  vendorUserCreate: VendorUserMutationResult;
  vendorUserUpdate: VendorUserMutationResult;
  violationTicketAddUpdateActivity: ViolationTicketMutationResult;
  violationTicketAdhocPaymentRequest: ViolationTicketMutationResult;
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
export type MutationMemberUpdatePaymentInstrumentArgs = {
  input: UpdatePaymentInstrumentInput;
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
export type MutationVendorUserCreateArgs = {
  input: VendorUserCreateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationVendorUserUpdateArgs = {
  input: VendorUserUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketAddUpdateActivityArgs = {
  input: ViolationTicketAddUpdateActivityInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationViolationTicketAdhocPaymentRequestArgs = {
  input: AdhocPaymentRequestInput;
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

export type PaymentTransactionsResult = {
  __typename?: 'PaymentTransactionsResult';
  amount?: Maybe<Scalars['Float']>;
  completedOn?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  transactionReferenceId?: Maybe<Scalars['String']>;
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
  vendorUser?: Maybe<VendorUser>;
  vendorUsers?: Maybe<Array<Maybe<VendorUser>>>;
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
export type QueryVendorUserArgs = {
  id: Scalars['ObjectID'];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryViolationTicketArgs = {
  id: Scalars['ObjectID'];
};

export type RevenueRecognition = {
  __typename?: 'RevenueRecognition';
  decision?: Maybe<GlTransaction>;
  submission?: Maybe<GlTransaction>;
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
  assignedVendor?: Maybe<VendorUser>;
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
  assignedVendor?: InputMaybe<Scalars['ObjectID']>;
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

export type Submission = {
  __typename?: 'Submission';
  amount?: Maybe<Scalars['Float']>;
  transactionReference?: Maybe<TransactionReference>;
};

export type Ticket = ServiceTicket | ViolationTicket;

export type TransactionReference = {
  __typename?: 'TransactionReference';
  completedOn?: Maybe<Scalars['DateTime']>;
  referenceId?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
};

export type Transactions = {
  __typename?: 'Transactions';
  adhocTransactions?: Maybe<Array<Maybe<AdhocTransaction>>>;
  submission?: Maybe<Submission>;
};

export type UpdatePaymentInstrumentInput = {
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
  cardType: Scalars['String'];
  expirationMonth: Scalars['String'];
  expirationYear: Scalars['String'];
  id: Scalars['String'];
  isDefault: Scalars['Boolean'];
  paymentInstrumentId: Scalars['String'];
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

export type VendorUser = MongoBase & {
  __typename?: 'VendorUser';
  accessBlocked?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  personalInformation?: Maybe<VendorUserPersonalInformation>;
  schemaVersion?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VendorUserContactInformation = {
  __typename?: 'VendorUserContactInformation';
  email?: Maybe<Scalars['String']>;
};

export type VendorUserContactInformationInput = {
  email?: InputMaybe<Scalars['String']>;
};

export type VendorUserCreateInput = {
  accessBlocked?: InputMaybe<Scalars['Boolean']>;
  displayName: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  externalId: Scalars['String'];
  personalInformation?: InputMaybe<VendorUserPersonalInformationInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  userType?: InputMaybe<Scalars['String']>;
};

export type VendorUserIdentityDetails = {
  __typename?: 'VendorUserIdentityDetails';
  lastName?: Maybe<Scalars['String']>;
  legalNameConsistsOfOneName?: Maybe<Scalars['Boolean']>;
  restOfName?: Maybe<Scalars['String']>;
};

export type VendorUserIdentityDetailsInput = {
  lastName?: InputMaybe<Scalars['String']>;
  legalNameConsistsOfOneName?: InputMaybe<Scalars['Boolean']>;
  restOfName?: InputMaybe<Scalars['String']>;
};

export type VendorUserMutationResult = {
  __typename?: 'VendorUserMutationResult';
  user?: Maybe<VendorUser>;
};

export type VendorUserPersonalInformation = {
  __typename?: 'VendorUserPersonalInformation';
  contactInformation?: Maybe<VendorUserContactInformation>;
  identityDetails?: Maybe<VendorUserIdentityDetails>;
};

export type VendorUserPersonalInformationInput = {
  contactInformation?: InputMaybe<VendorUserContactInformationInput>;
  identityDetails?: InputMaybe<VendorUserIdentityDetailsInput>;
};

export type VendorUserUpdateInput = {
  accessBlocked?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  personalInformation?: InputMaybe<VendorUserPersonalInformationInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  userType?: InputMaybe<Scalars['String']>;
};

/** An Violation ticket describes violation ticket type. */
export type ViolationTicket = {
  __typename?: 'ViolationTicket';
  activityLog?: Maybe<Array<Maybe<ServiceTicketActivityDetail>>>;
  assignedTo?: Maybe<Member>;
  community: Community;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  financeDetails?: Maybe<FinanceDetails>;
  id: Scalars['ObjectID'];
  messages?: Maybe<Array<Maybe<ViolationTicketV1Message>>>;
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

export type AhpIdFormCommunityPublicFileCreateAuthHeaderMutationVariables = Exact<{
  input: CommunityBlobFileInput;
}>;

export type AhpIdFormCommunityPublicFileCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  communityPublicFileCreateAuthHeader: {
    __typename?: 'CommunityBlobContentAuthHeaderResult';
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobPath?: string | null;
      requestDate?: string | null;
      indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
      metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
    } | null;
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  };
};

export type AhpIdFormCommunityPublicFileRemoveMutationVariables = Exact<{
  input: CommunityPublicFileRemoveInput;
}>;

export type AhpIdFormCommunityPublicFileRemoveMutation = {
  __typename?: 'Mutation';
  communityPublicFileRemove: { __typename?: 'CommunityMutationResult'; status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null } };
};

export type AccountsCommunityCreateContainerCommunityCreateMutationVariables = Exact<{
  input: CommunityCreateInput;
}>;

export type AccountsCommunityCreateContainerCommunityCreateMutation = {
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

export type AccountsCommunityCreateContainerCommunityCreateFieldsFragment = {
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

export type CommunityListContainerCommunityFieldsFragment = {
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

export type AccountsCommunityListContainerCommunitiesQueryVariables = Exact<{ [key: string]: never }>;

export type AccountsCommunityListContainerCommunitiesQuery = {
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

export type AccountsCommunityListContainerMembersByUserExternalIdQueryVariables = Exact<{
  userExternalId: Scalars['String'];
}>;

export type AccountsCommunityListContainerMembersByUserExternalIdQuery = {
  __typename?: 'Query';
  membersByUserExternalId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
    isAdmin?: boolean | null;
    community?: { __typename?: 'Community'; id: any } | null;
  } | null> | null;
};

export type CommunityListContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  isAdmin?: boolean | null;
  community?: { __typename?: 'Community'; id: any } | null;
};

export type AccountsUserInfoContainerUserCurrentQueryVariables = Exact<{ [key: string]: never }>;

export type AccountsUserInfoContainerUserCurrentQuery = {
  __typename?: 'Query';
  userCurrent?: {
    __typename: 'User';
    externalId?: string | null;
    id: any;
    personalInformation?: {
      __typename?: 'PersonalInformation';
      identityDetails?: { __typename?: 'IdentityDetails'; lastName: string; restOfName?: string | null } | null;
    } | null;
  } | null;
};

export type AccountsUserInfoContainerUserFieldsFragment = {
  __typename: 'User';
  externalId?: string | null;
  id: any;
  personalInformation?: {
    __typename?: 'PersonalInformation';
    identityDetails?: { __typename?: 'IdentityDetails'; lastName: string; restOfName?: string | null } | null;
  } | null;
};

export type AdminCommunityDetailContainerCommunityByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminCommunityDetailContainerCommunityByIdQuery = {
  __typename?: 'Query';
  communityById?: {
    __typename: 'Community';
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
  __typename: 'Community';
  name?: string | null;
  domain?: string | null;
  whiteLabelDomain?: string | null;
  handle?: string | null;
  id: any;
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
    member?: { __typename?: 'Member'; memberName?: string | null; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
  };
};

export type AdminMembersAccountsAddContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: { __typename?: 'Member'; memberName?: string | null; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
};

export type AdminMembersAccountsAddContainerMemberFieldsFragment = {
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
      user?: {
        __typename?: 'User';
        id: any;
        personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
      } | null;
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
        user?: {
          __typename?: 'User';
          id: any;
          personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
        } | null;
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
        user?: {
          __typename?: 'User';
          id: any;
          personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
        } | null;
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
      user?: {
        __typename?: 'User';
        id: any;
        personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
      } | null;
    } | null> | null;
  } | null;
};

export type AdminMembersAccountEditContainerMemberFieldsFragment = {
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
    user?: {
      __typename?: 'User';
      id: any;
      personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
    } | null;
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
      user?: {
        __typename?: 'User';
        id: any;
        personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
      } | null;
    } | null> | null;
  } | null;
};

export type AdminMembersAccountsListContainerMemberFieldsFragment = {
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
    user?: {
      __typename?: 'User';
      id: any;
      personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
    } | null;
  } | null> | null;
};

export type AdminMembersAccountsListContainerMemberAccountFieldsFragment = {
  __typename?: 'MemberAccount';
  firstName: string;
  lastName?: string | null;
  statusCode?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  user?: {
    __typename?: 'User';
    id: any;
    personalInformation?: { __typename?: 'PersonalInformation'; contactInformation?: { __typename?: 'ContactInformation'; email: string } | null } | null;
  } | null;
};

export type AdminMembersCreateContainerMemberCreateMutationVariables = Exact<{
  input: MemberCreateInput;
}>;

export type AdminMembersCreateContainerMemberCreateMutation = {
  __typename?: 'Mutation';
  memberCreate: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: { __typename?: 'Member'; memberName?: string | null; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
  };
};

export type AdminMembersCreateContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: { __typename?: 'Member'; memberName?: string | null; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
};

export type AdminMembersCreateContainerMemberFragment = { __typename?: 'Member'; memberName?: string | null; id: any; createdAt?: any | null; updatedAt?: any | null };

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
    role?: { __typename?: 'Role'; roleName: string; id: any } | null;
  } | null;
};

export type AdminMembersDetailContainerRolesByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminMembersDetailContainerRolesByCommunityIdQuery = {
  __typename?: 'Query';
  rolesByCommunityId?: Array<{ __typename?: 'Role'; roleName: string; isDefault: boolean; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
      role?: { __typename?: 'Role'; roleName: string; id: any } | null;
    } | null;
  };
};

export type AdminMembersDetailContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: 'Role'; roleName: string; id: any } | null;
  } | null;
};

export type AdminMembersDetailContainerMemberFieldsFragment = {
  __typename?: 'Member';
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  role?: { __typename?: 'Role'; roleName: string; id: any } | null;
};

export type AdminMembersDetailContainerRoleFieldsFragment = {
  __typename?: 'Role';
  roleName: string;
  isDefault: boolean;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminMembersListContainerMembersByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminMembersListContainerMembersByCommunityIdQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{
    __typename?: 'Member';
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: 'Role'; roleName: string; id: any } | null;
  } | null> | null;
};

export type AdminMembersListContainerMemberFieldsFragment = {
  __typename?: 'Member';
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  role?: { __typename?: 'Role'; roleName: string; id: any } | null;
};

export type AdminPropertiesAddContainerPropertyAddMutationVariables = Exact<{
  input: PropertyAddInput;
}>;

export type AdminPropertiesAddContainerPropertyAddMutation = {
  __typename?: 'Mutation';
  propertyAdd: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: { __typename?: 'Property'; propertyName: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
  };
};

export type AdminPropertiesAddContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: { __typename?: 'Property'; propertyName: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
};

export type AdminPropertiesAddContainerPropertyFieldsFragment = { __typename?: 'Property'; propertyName: string; id: any; createdAt?: any | null; updatedAt?: any | null };

export type AdminPropertiesListContainerPropertiesByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminPropertiesListContainerPropertiesByCommunityIdQuery = {
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
  roles?: Array<{ __typename?: 'Role'; roleName: string; isDefault: boolean; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
};

export type AdminRolesDeleteContainerRoleDeleteAndReassignMutationVariables = Exact<{
  input: RoleDeleteAndReassignInput;
}>;

export type AdminRolesDeleteContainerRoleDeleteAndReassignMutation = {
  __typename?: 'Mutation';
  roleDeleteAndReassign: {
    __typename?: 'RoleMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    role?: { __typename?: 'Role'; roleName: string; isDefault: boolean; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
  };
};

export type AdminRolesDeleteContainerRoleMutationResultFieldsFragment = {
  __typename?: 'RoleMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  role?: { __typename?: 'Role'; roleName: string; isDefault: boolean; id: any; createdAt?: any | null; updatedAt?: any | null } | null;
};

export type AdminRolesDeleteContainerRoleFieldsFragment = {
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
      propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean; canEditOwnProperty: boolean };
      violationTicketPermissions: {
        __typename?: 'ViolationTicketPermissions';
        canCreateTickets: boolean;
        canManageTickets: boolean;
        canAssignTickets: boolean;
        canWorkOnTickets: boolean;
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
        propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean; canEditOwnProperty: boolean };
        violationTicketPermissions: {
          __typename?: 'ViolationTicketPermissions';
          canCreateTickets: boolean;
          canManageTickets: boolean;
          canAssignTickets: boolean;
          canWorkOnTickets: boolean;
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
        propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean; canEditOwnProperty: boolean };
        violationTicketPermissions: {
          __typename?: 'ViolationTicketPermissions';
          canCreateTickets: boolean;
          canManageTickets: boolean;
          canAssignTickets: boolean;
          canWorkOnTickets: boolean;
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
      propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean; canEditOwnProperty: boolean };
      violationTicketPermissions: {
        __typename?: 'ViolationTicketPermissions';
        canCreateTickets: boolean;
        canManageTickets: boolean;
        canAssignTickets: boolean;
        canWorkOnTickets: boolean;
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
    propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean; canEditOwnProperty: boolean };
    violationTicketPermissions: {
      __typename?: 'ViolationTicketPermissions';
      canCreateTickets: boolean;
      canManageTickets: boolean;
      canAssignTickets: boolean;
      canWorkOnTickets: boolean;
    };
  };
};

export type AdminRolesListContainerRolesByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminRolesListContainerRolesByCommunityIdQuery = {
  __typename?: 'Query';
  rolesByCommunityId?: Array<{ __typename?: 'Role'; roleName: string; isDefault: boolean; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
};

export type AdminRolesListContainerRoleFieldsFragment = { __typename?: 'Role'; roleName: string; isDefault: boolean; id: any; createdAt?: any | null; updatedAt?: any | null };

export type AdminServiceTicketsCreateContainerMembersByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminServiceTicketsCreateContainerMembersByCommunityIdQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{ __typename?: 'Member'; memberName?: string | null; id: any } | null> | null;
};

export type AdminServiceTicketsCreateContainerPropertiesByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminServiceTicketsCreateContainerPropertiesByCommunityIdQuery = {
  __typename?: 'Query';
  propertiesByCommunityId?: Array<{ __typename?: 'Property'; propertyName: string; id: any } | null> | null;
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
      ticketType?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
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
    ticketType?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
    requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
  } | null;
};

export type AdminServiceTicketsCreateContainerServiceTicketFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  status: string;
  priority: number;
  ticketType?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
  requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
};

export type AdminServiceTicketsCreateContainerMemberFieldsFragment = { __typename?: 'Member'; memberName?: string | null; id: any };

export type AdminServiceTicketsCreateContainerPropertyFieldsFragment = { __typename?: 'Property'; propertyName: string; id: any };

export type AdminServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminServiceTicketsDetailContainerMembersAssignableToTicketsQuery = {
  __typename?: 'Query';
  membersAssignableToTickets?: Array<{ __typename?: 'Member'; memberName?: string | null; id: any } | null> | null;
};

export type AdminServiceTicketsDetailContainerPropertiesQueryVariables = Exact<{ [key: string]: never }>;

export type AdminServiceTicketsDetailContainerPropertiesQuery = {
  __typename?: 'Query';
  properties?: Array<{ __typename?: 'Property'; propertyName: string; id: any } | null> | null;
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
    property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
    requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
    assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
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
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
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
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketsDetailContainerServiceTicketAssignMutationVariables = Exact<{
  input: ServiceTicketAssignInput;
}>;

export type AdminServiceTicketsDetailContainerServiceTicketAssignMutation = {
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
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
    } | null;
  };
};

export type AdminServiceTicketsDetailContainerServiceTicketAddUpdateActivityMutationVariables = Exact<{
  input: ServiceTicketAddUpdateActivityInput;
}>;

export type AdminServiceTicketsDetailContainerServiceTicketAddUpdateActivityMutation = {
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
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
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
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
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
    property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
    requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
    assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
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
  property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
  requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
  assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
  photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
  activityLog?: Array<{
    __typename?: 'ServiceTicketActivityDetail';
    activityType: string;
    activityDescription: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
  } | null> | null;
};

export type AdminServiceTicketsDetailContainerMemberFieldsFragment = { __typename?: 'Member'; memberName?: string | null; id: any };

export type AdminServiceTicketsDetailContainerPropertyFieldsFragment = { __typename?: 'Property'; propertyName: string; id: any };

export type AdminServiceTicketsDetailContainerServiceTicketActivityDetailFieldsFragment = {
  __typename?: 'ServiceTicketActivityDetail';
  activityType: string;
  activityDescription: string;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
};

export type AdminServiceTicketsListContainerServiceTicketsByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminServiceTicketsListContainerServiceTicketsByCommunityIdQuery = {
  __typename?: 'Query';
  serviceTicketsByCommunityId?: Array<
    | {
        __typename?: 'ServiceTicket';
        title: string;
        priority: number;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        requestor: { __typename?: 'Member'; memberName?: string | null };
        assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
      }
    | {
        __typename?: 'ViolationTicket';
        title: string;
        priority: number;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        requestor: { __typename?: 'Member'; memberName?: string | null };
        assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
      }
    | null
  > | null;
};

export type AdminServiceTicketsListContainerServiceTicketsSearchAdminQueryVariables = Exact<{
  input: ServiceTicketsSearchInput;
}>;

export type AdminServiceTicketsListContainerServiceTicketsSearchAdminQuery = {
  __typename?: 'Query';
  serviceTicketsSearchAdmin?: {
    __typename?: 'ServiceTicketsSearchResult';
    count?: number | null;
    serviceTicketsResults?: Array<{
      __typename?: 'ServiceTicketsResult';
      communityId?: string | null;
      propertyId?: string | null;
      title?: string | null;
      requestor?: string | null;
      assignedTo?: string | null;
      requestorId?: string | null;
      assignedToId?: string | null;
      description?: string | null;
      status?: string | null;
      priority?: number | null;
      ticketType?: string | null;
      id?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
  } | null;
};

export type AdminServiceTicketsListContainerServiceTicketFieldsFragment = {
  __typename?: 'ServiceTicket';
  title: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  requestor: { __typename?: 'Member'; memberName?: string | null };
  assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
};

export type AdminServiceTicketsListContainerViolationTicketFieldsFragment = {
  __typename?: 'ViolationTicket';
  title: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  requestor: { __typename?: 'Member'; memberName?: string | null };
  assignedTo?: { __typename?: 'Member'; memberName?: string | null } | null;
};

export type AdminServiceTicketServiceTicketsSearchSearchResultFieldsFragment = {
  __typename?: 'ServiceTicketsSearchResult';
  count?: number | null;
  serviceTicketsResults?: Array<{
    __typename?: 'ServiceTicketsResult';
    communityId?: string | null;
    propertyId?: string | null;
    title?: string | null;
    requestor?: string | null;
    assignedTo?: string | null;
    requestorId?: string | null;
    assignedToId?: string | null;
    description?: string | null;
    status?: string | null;
    priority?: number | null;
    ticketType?: string | null;
    id?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type AdminServiceTicketsListContainerServiceTicketsResultFieldsFragment = {
  __typename?: 'ServiceTicketsResult';
  communityId?: string | null;
  propertyId?: string | null;
  title?: string | null;
  requestor?: string | null;
  assignedTo?: string | null;
  requestorId?: string | null;
  assignedToId?: string | null;
  description?: string | null;
  status?: string | null;
  priority?: number | null;
  ticketType?: string | null;
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type AdminSettingsGeneralContainerCommunityByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AdminSettingsGeneralContainerCommunityByIdQuery = {
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
    domainStatus?: {
      __typename?: 'CommunityDomainResult';
      verified?: boolean | null;
      verification?: Array<{
        __typename?: 'CommunityDomainVerificationDetail';
        type?: string | null;
        domain?: string | null;
        value?: string | null;
        reason?: string | null;
      } | null> | null;
    } | null;
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
      domainStatus?: {
        __typename?: 'CommunityDomainResult';
        verified?: boolean | null;
        verification?: Array<{
          __typename?: 'CommunityDomainVerificationDetail';
          type?: string | null;
          domain?: string | null;
          value?: string | null;
          reason?: string | null;
        } | null> | null;
      } | null;
    } | null;
  };
};

export type AdminSettingsGeneralContainerCommunityMutationResultFieldsFragment = {
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
    domainStatus?: {
      __typename?: 'CommunityDomainResult';
      verified?: boolean | null;
      verification?: Array<{
        __typename?: 'CommunityDomainVerificationDetail';
        type?: string | null;
        domain?: string | null;
        value?: string | null;
        reason?: string | null;
      } | null> | null;
    } | null;
  } | null;
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
  domainStatus?: {
    __typename?: 'CommunityDomainResult';
    verified?: boolean | null;
    verification?: Array<{
      __typename?: 'CommunityDomainVerificationDetail';
      type?: string | null;
      domain?: string | null;
      value?: string | null;
      reason?: string | null;
    } | null> | null;
  } | null;
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
    files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
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
      files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
    } | null;
  };
};

export type AdminSiteEditorFilesListContainerCommunityMutationResultFieldsFragment = {
  __typename?: 'CommunityMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  community?: {
    __typename?: 'Community';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
  } | null;
};

export type AdminSiteEditorFilesListContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
};

export type AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutationVariables = Exact<{
  input: CommunityBlobFileInput;
}>;

export type AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  communityPublicFileCreateAuthHeader: {
    __typename?: 'CommunityBlobContentAuthHeaderResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    community?: {
      __typename?: 'Community';
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
    } | null;
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobPath?: string | null;
      requestDate?: string | null;
      indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
      metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
    } | null;
  };
};

export type AdminSiteEditorFilesUploadContainerCommunityMutationResultFieldsFragment = {
  __typename?: 'CommunityBlobContentAuthHeaderResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  community?: {
    __typename?: 'Community';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
  } | null;
  authHeader?: {
    __typename?: 'BlobAuthHeader';
    authHeader?: string | null;
    blobPath?: string | null;
    requestDate?: string | null;
    indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
    metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
  } | null;
};

export type AdminSiteEditorFilesUploadContainerBlobAuthHeaderFieldsFragment = {
  __typename?: 'BlobAuthHeader';
  authHeader?: string | null;
  blobPath?: string | null;
  requestDate?: string | null;
  indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
  metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
};

export type AdminSiteEditorFilesUploadContainerCommunityFieldsFragment = {
  __typename?: 'Community';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  files?: Array<{ __typename?: 'FileInfo'; name: string; size: number; type: string; url: string } | null> | null;
};

export type AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutationVariables = Exact<{
  input: CommunityBlobContentInput;
}>;

export type AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  communityPublicContentCreateAuthHeader: {
    __typename?: 'CommunityBlobContentAuthHeaderResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobPath?: string | null;
      requestDate?: string | null;
      indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
      metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
    } | null;
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

export type AdminSiteEditorContainerCommunityMutationResultFieldsFragment = {
  __typename?: 'CommunityBlobContentAuthHeaderResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  authHeader?: {
    __typename?: 'BlobAuthHeader';
    authHeader?: string | null;
    blobPath?: string | null;
    requestDate?: string | null;
    indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
    metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
  } | null;
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

export type AdminSiteEditorContainerBlobAuthHeaderFieldsFragment = {
  __typename?: 'BlobAuthHeader';
  authHeader?: string | null;
  blobPath?: string | null;
  requestDate?: string | null;
  indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
  metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
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

export type AdminViolationTicketsCreateContainerMembersByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminViolationTicketsCreateContainerMembersByCommunityIdQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{ __typename?: 'Member'; memberName?: string | null; id: any } | null> | null;
};

export type AdminViolationTicketsCreateContainerPropertiesByCommunityIdQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type AdminViolationTicketsCreateContainerPropertiesByCommunityIdQuery = {
  __typename?: 'Query';
  propertiesByCommunityId?: Array<{ __typename?: 'Property'; propertyName: string; id: any } | null> | null;
};

export type AdminViolationTicketsCreateContainerViolationTicketCreateMutationVariables = Exact<{
  input: ViolationTicketCreateInput;
}>;

export type AdminViolationTicketsCreateContainerViolationTicketCreateMutation = {
  __typename?: 'Mutation';
  violationTicketCreate: {
    __typename?: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
      id: any;
      title: string;
      status: string;
      priority: number;
      ticketType?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
      property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
      requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null;
  };
};

export type AdminViolationTicketsCreateContainerMutationResultFieldsFragment = {
  __typename?: 'ViolationTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  violationTicket?: {
    __typename?: 'ViolationTicket';
    id: any;
    title: string;
    status: string;
    priority: number;
    ticketType?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
    property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
    requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
  } | null;
};

export type AdminViolationTicketsCreateContainerViolationTicketFieldsFragment = {
  __typename?: 'ViolationTicket';
  id: any;
  title: string;
  status: string;
  priority: number;
  ticketType?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
  property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
  requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
};

export type AdminViolationTicketsCreateContainerMemberFieldsFragment = { __typename?: 'Member'; id: any; memberName?: string | null };

export type AdminViolationTicketsCreateContainerPropertyFieldsFragment = { __typename?: 'Property'; id: any; propertyName: string };

export type AdminViolationTicketsDetailContainerMemberAssignableToTicketsQueryVariables = Exact<{
  violationTicketId: Scalars['ObjectID'];
}>;

export type AdminViolationTicketsDetailContainerMemberAssignableToTicketsQuery = {
  __typename?: 'Query';
  memberAssignableToViolationTickets?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
};

export type AdminViolationTicketsDetailContainerViolationTicketQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type AdminViolationTicketsDetailContainerViolationTicketQuery = {
  __typename?: 'Query';
  violationTicket?: {
    __typename?: 'ViolationTicket';
    title: string;
    description: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
    requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
    assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
    } | null> | null;
    financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
  } | null;
};

export type AdminViolationTicketsDetailContainerViolationTicketUpdateMutationVariables = Exact<{
  input: ViolationTicketUpdateInput;
}>;

export type AdminViolationTicketsDetailContainerViolationTicketUpdateMutation = {
  __typename?: 'Mutation';
  violationTicketUpdate: {
    __typename?: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
      financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
    } | null;
  };
};

export type AdminViolationTicketsDetailContainerViolationTicketChangeStatusMutationVariables = Exact<{
  input: ViolationTicketChangeStatusInput;
}>;

export type AdminViolationTicketsDetailContainerViolationTicketChangeStatusMutation = {
  __typename?: 'Mutation';
  violationTicketChangeStatus: {
    __typename?: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
      financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
    } | null;
  };
};

export type AdminViolationTicketsDetailContainerViolationTicketAssignMutationVariables = Exact<{
  input: ViolationTicketAssignInput;
}>;

export type AdminViolationTicketsDetailContainerViolationTicketAssignMutation = {
  __typename?: 'Mutation';
  violationTicketAssign: {
    __typename?: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
      financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
    } | null;
  };
};

export type AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutationVariables = Exact<{
  input: ViolationTicketAddUpdateActivityInput;
}>;

export type AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutation = {
  __typename?: 'Mutation';
  violationTicketAddUpdateActivity: {
    __typename?: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
      financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
    } | null;
  };
};

export type AdminViolationTicketDetailContainerViolationTicketDeleteMutationVariables = Exact<{
  input: ViolationTicketDeleteInput;
}>;

export type AdminViolationTicketDetailContainerViolationTicketDeleteMutation = {
  __typename?: 'Mutation';
  violationTicketDelete: {
    __typename?: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
      title: string;
      description: string;
      status: string;
      priority: number;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
      requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
      assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
      } | null> | null;
      financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
    } | null;
  };
};

export type AdminViolationTicketsDetailContainerViolationTicketMutationResultFieldsFragment = {
  __typename?: 'ViolationTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  violationTicket?: {
    __typename?: 'ViolationTicket';
    title: string;
    description: string;
    status: string;
    priority: number;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
    requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
    assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
    } | null> | null;
    financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
  } | null;
};

export type AdminViolationTicketsDetailContainerViolationTicketFieldsFragment = {
  __typename?: 'ViolationTicket';
  title: string;
  description: string;
  status: string;
  priority: number;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; propertyName: string; id: any } | null;
  requestor: { __typename?: 'Member'; memberName?: string | null; id: any };
  assignedTo?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
  photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
  activityLog?: Array<{
    __typename?: 'ServiceTicketActivityDetail';
    activityType: string;
    activityDescription: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
  } | null> | null;
  financeDetails?: { __typename?: 'FinanceDetails'; serviceFee?: number | null } | null;
};

export type AdminViolationTicketsDetailContainerMemberFieldsFragment = { __typename?: 'Member'; memberName?: string | null; id: any };

export type AdminViolationTicketsDetailContainerServiceTicketActivityDetailFieldsFragment = {
  __typename?: 'ServiceTicketActivityDetail';
  activityType: string;
  activityDescription: string;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  activityBy: { __typename?: 'Member'; memberName?: string | null; id: any };
};

export type SectionLayoutContainerMemberByIdQueryQueryVariables = Exact<{
  memberId: Scalars['ID'];
}>;

export type SectionLayoutContainerMemberByIdQueryQuery = {
  __typename?: 'Query';
  member?: {
    __typename?: 'Member';
    id: any;
    role?: {
      __typename?: 'Role';
      id: any;
      permissions: {
        __typename?: 'RolePermissions';
        communityPermissions: {
          __typename?: 'CommunityPermissions';
          canManageRolesAndPermissions: boolean;
          canManageCommunitySettings: boolean;
          canManageSiteContent: boolean;
          canManageMembers: boolean;
        };
        propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean };
        serviceTicketPermissions: { __typename?: 'ServiceTicketPermissions'; canManageTickets: boolean };
        violationTicketPermissions: {
          __typename?: 'ViolationTicketPermissions';
          canManageTickets: boolean;
          canCreateTickets: boolean;
          canAssignTickets: boolean;
          canWorkOnTickets: boolean;
        };
      };
    } | null;
  } | null;
};

export type SectionLayoutContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  role?: {
    __typename?: 'Role';
    id: any;
    permissions: {
      __typename?: 'RolePermissions';
      communityPermissions: {
        __typename?: 'CommunityPermissions';
        canManageRolesAndPermissions: boolean;
        canManageCommunitySettings: boolean;
        canManageSiteContent: boolean;
        canManageMembers: boolean;
      };
      propertyPermissions: { __typename?: 'PropertyPermissions'; canManageProperties: boolean };
      serviceTicketPermissions: { __typename?: 'ServiceTicketPermissions'; canManageTickets: boolean };
      violationTicketPermissions: {
        __typename?: 'ViolationTicketPermissions';
        canManageTickets: boolean;
        canCreateTickets: boolean;
        canAssignTickets: boolean;
        canWorkOnTickets: boolean;
      };
    };
  } | null;
};

export type PaymentRequestFormServiceTicketUpdateMutationVariables = Exact<{
  input: ServiceTicketUpdateInput;
}>;

export type PaymentRequestFormServiceTicketUpdateMutation = {
  __typename?: 'Mutation';
  serviceTicketUpdate: {
    __typename?: 'ServiceTicketMutationResult';
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      id: any;
      messages?: Array<{ __typename?: 'ServiceTicketV1Message'; embedding?: string | null; id: any } | null> | null;
    } | null;
    status: { __typename?: 'MutationStatus'; errorMessage?: string | null; success: boolean };
  };
};

export type PaymentRequestFormViolationTicketUpdateMutationVariables = Exact<{
  input: ViolationTicketUpdateInput;
}>;

export type PaymentRequestFormViolationTicketUpdateMutation = {
  __typename?: 'Mutation';
  violationTicketUpdate: {
    __typename?: 'ViolationTicketMutationResult';
    violationTicket?: {
      __typename?: 'ViolationTicket';
      id: any;
      messages?: Array<{ __typename?: 'ViolationTicketV1Message'; embedding?: string | null; id: any } | null> | null;
    } | null;
    status: { __typename?: 'MutationStatus'; errorMessage?: string | null; success: boolean };
  };
};

export type PaymentRequestPaymentInstrumentsQueryVariables = Exact<{ [key: string]: never }>;

export type PaymentRequestPaymentInstrumentsQuery = {
  __typename?: 'Query';
  memberPaymentInstruments?: {
    __typename?: 'PaymentInstrumentResult';
    paymentInstruments?: Array<{ __typename?: 'PaymentInstrument'; id?: string | null } | null> | null;
    status: { __typename?: 'MutationStatus'; errorMessage?: string | null; success: boolean };
  } | null;
};

export type ChatMessagesContainerServiceTicketQueryVariables = Exact<{
  serviceTicketId: Scalars['ObjectID'];
}>;

export type ChatMessagesContainerServiceTicketQuery = {
  __typename?: 'Query';
  serviceTicket?: {
    __typename?: 'ServiceTicket';
    id: any;
    messages?: Array<{ __typename?: 'ServiceTicketV1Message'; sentBy: string; message: string; id: any; embedding?: string | null; createdAt: any } | null> | null;
  } | null;
};

export type ChatMessagesContainerViolationTicketQueryVariables = Exact<{
  violationTicketId: Scalars['ObjectID'];
}>;

export type ChatMessagesContainerViolationTicketQuery = {
  __typename?: 'Query';
  violationTicket?: {
    __typename?: 'ViolationTicket';
    id: any;
    messages?: Array<{ __typename?: 'ViolationTicketV1Message'; sentBy: string; message: string; id: any; embedding?: string | null; createdAt: any } | null> | null;
  } | null;
};

export type ChatMessagesContainerServiceTicketUpdateMutationVariables = Exact<{
  input: ServiceTicketUpdateInput;
}>;

export type ChatMessagesContainerServiceTicketUpdateMutation = {
  __typename?: 'Mutation';
  serviceTicketUpdate: {
    __typename?: 'ServiceTicketMutationResult';
    serviceTicket?: {
      __typename?: 'ServiceTicket';
      id: any;
      messages?: Array<{ __typename?: 'ServiceTicketV1Message'; message: string; createdAt: any; embedding?: string | null; id: any; sentBy: string } | null> | null;
    } | null;
    status: { __typename?: 'MutationStatus'; errorMessage?: string | null; success: boolean };
  };
};

export type ChatMessagesContainerViolationTicketUpdateMutationVariables = Exact<{
  input: ViolationTicketUpdateInput;
}>;

export type ChatMessagesContainerViolationTicketUpdateMutation = {
  __typename?: 'Mutation';
  violationTicketUpdate: {
    __typename?: 'ViolationTicketMutationResult';
    violationTicket?: {
      __typename?: 'ViolationTicket';
      id: any;
      messages?: Array<{ __typename?: 'ViolationTicketV1Message'; message: string; createdAt: any; embedding?: string | null; id: any; sentBy: string } | null> | null;
    } | null;
    status: { __typename?: 'MutationStatus'; errorMessage?: string | null; success: boolean };
  };
};

export type SharedPaymentContainercybersourcePublicKeyIdQueryVariables = Exact<{ [key: string]: never }>;

export type SharedPaymentContainercybersourcePublicKeyIdQuery = { __typename?: 'Query'; cybersourcePublicKeyId?: string | null };

export type MutationMemberAddPaymentInstrumentMutationVariables = Exact<{
  input: AddPaymentInstrumentInput;
}>;

export type MutationMemberAddPaymentInstrumentMutation = {
  __typename?: 'Mutation';
  memberAddPaymentInstrument: { __typename?: 'MemberMutationResult'; status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null } };
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
      address?: { __typename?: 'Address'; streetName?: string | null; streetNumber?: string | null; freeformAddress?: string | null } | null;
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
      additionalAmenities?: Array<{ __typename?: 'AdditionalAmenities'; category?: string | null; amenities?: Array<string | null> | null } | null> | null;
      bedroomDetails?: Array<{ __typename?: 'BedroomDetails'; roomName?: string | null; bedDescriptions?: Array<string | null> | null } | null> | null;
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
    address?: { __typename?: 'Address'; streetName?: string | null; streetNumber?: string | null; freeformAddress?: string | null } | null;
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
    additionalAmenities?: Array<{ __typename?: 'AdditionalAmenities'; category?: string | null; amenities?: Array<string | null> | null } | null> | null;
    bedroomDetails?: Array<{ __typename?: 'BedroomDetails'; roomName?: string | null; bedDescriptions?: Array<string | null> | null } | null> | null;
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
    listingDetail?: { __typename?: 'ListingDetails'; bathrooms?: number | null; bedrooms?: number | null; squareFeet?: number | null } | null;
    location?: { __typename?: 'Location'; address?: { __typename?: 'Address'; streetNumber?: string | null; streetName?: string | null } | null } | null;
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
  listingDetail?: { __typename?: 'ListingDetails'; bathrooms?: number | null; bedrooms?: number | null; squareFeet?: number | null } | null;
  location?: { __typename?: 'Location'; address?: { __typename?: 'Address'; streetNumber?: string | null; streetName?: string | null } | null } | null;
};

export type MutationUpdatePaymentInstrumentMutationVariables = Exact<{
  input: UpdatePaymentInstrumentInput;
}>;

export type MutationUpdatePaymentInstrumentMutation = {
  __typename?: 'Mutation';
  memberUpdatePaymentInstrument: { __typename?: 'MemberMutationResult'; status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null } };
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
      user?: {
        __typename?: 'User';
        id: any;
        personalInformation?: { __typename?: 'PersonalInformation'; identityDetails?: { __typename?: 'IdentityDetails'; restOfName?: string | null } | null } | null;
      } | null;
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
    user?: {
      __typename?: 'User';
      id: any;
      personalInformation?: { __typename?: 'PersonalInformation'; identityDetails?: { __typename?: 'IdentityDetails'; restOfName?: string | null } | null } | null;
    } | null;
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
      createdAt?: any | null;
      tags?: Array<string | null> | null;
      additionalAmenities?: Array<{ __typename?: 'AdditionalAmenitiesSearchResult'; category?: string | null; amenities?: Array<string | null> | null } | null> | null;
      position?: { __typename?: 'GeographyPoint'; latitude?: number | null; longitude?: number | null } | null;
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
      type?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      amenities?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      additionalAmenitiesCategory?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      additionalAmenitiesAmenities?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      listedForSale?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      listedForRent?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      listedForLease?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      bedrooms?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      bathrooms?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      updatedAt?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      createdAt?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      tags?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    } | null;
  } | null;
};

export type MemberPropertiesGetAllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type MemberPropertiesGetAllTagsQuery = { __typename?: 'Query'; getAllPropertyTags?: Array<string | null> | null };

export type MemberPropertiesListSearchContainerMapSasTokenQueryVariables = Exact<{ [key: string]: never }>;

export type MemberPropertiesListSearchContainerMapSasTokenQuery = { __typename?: 'Query'; getMapSasToken?: string | null };

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
    createdAt?: any | null;
    tags?: Array<string | null> | null;
    additionalAmenities?: Array<{ __typename?: 'AdditionalAmenitiesSearchResult'; category?: string | null; amenities?: Array<string | null> | null } | null> | null;
    position?: { __typename?: 'GeographyPoint'; latitude?: number | null; longitude?: number | null } | null;
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
    type?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    amenities?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    additionalAmenitiesCategory?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    additionalAmenitiesAmenities?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    listedForSale?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    listedForRent?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    listedForLease?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    bedrooms?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    bathrooms?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    updatedAt?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    createdAt?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    tags?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
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
  createdAt?: any | null;
  tags?: Array<string | null> | null;
  additionalAmenities?: Array<{ __typename?: 'AdditionalAmenitiesSearchResult'; category?: string | null; amenities?: Array<string | null> | null } | null> | null;
  position?: { __typename?: 'GeographyPoint'; latitude?: number | null; longitude?: number | null } | null;
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

export type MembersPropertiesListContainerPropertiesQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersPropertiesListContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesByOwnerId?: Array<{
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

export type MembersServiceTicketsCreateContainerMembersQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MembersServiceTicketsCreateContainerMembersQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{ __typename?: 'Member'; id: any; memberName?: string | null } | null> | null;
};

export type MembersServiceTicketsCreateContainerPropertiesQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersServiceTicketsCreateContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesByOwnerId?: Array<{ __typename?: 'Property'; id: any; propertyName: string } | null> | null;
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
      ticketType?: string | null;
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
    ticketType?: string | null;
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
  ticketType?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  property?: { __typename?: 'Property'; id: any; propertyName: string } | null;
  requestor: { __typename?: 'Member'; id: any; memberName?: string | null };
};

export type MembersServiceTicketsCreateContainerMemberFieldsFragment = { __typename?: 'Member'; id: any; memberName?: string | null };

export type MembersServiceTicketsCreateContainerPropertyFieldsFragment = { __typename?: 'Property'; id: any; propertyName: string };

export type MembersServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables = Exact<{ [key: string]: never }>;

export type MembersServiceTicketsDetailContainerMembersAssignableToTicketsQuery = {
  __typename?: 'Query';
  membersAssignableToTickets?: Array<{ __typename?: 'Member'; id: any; memberName?: string | null } | null> | null;
};

export type MembersServiceTicketsDetailContainerPropertiesQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersServiceTicketsDetailContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesByOwnerId?: Array<{ __typename?: 'Property'; id: any; propertyName: string } | null> | null;
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
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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
  photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
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

export type MembersServiceTicketsDetailContainerMemberFieldsFragment = { __typename?: 'Member'; id: any; memberName?: string | null };

export type MembersServiceTicketsDetailContainerPropertyFieldsFragment = { __typename?: 'Property'; id: any; propertyName: string };

export type MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQueryVariables = Exact<{ [key: string]: never }>;

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

export type MemberServiceTicketsListContainerSearchServiceTicketsQueryVariables = Exact<{
  input: ServiceTicketsSearchInput;
}>;

export type MemberServiceTicketsListContainerSearchServiceTicketsQuery = {
  __typename?: 'Query';
  serviceTicketsSearch?: {
    __typename?: 'ServiceTicketsSearchResult';
    count?: number | null;
    serviceTicketsResults?: Array<{
      __typename?: 'ServiceTicketsResult';
      id?: string | null;
      communityId?: string | null;
      propertyId?: string | null;
      title?: string | null;
      requestor?: string | null;
      assignedTo?: string | null;
      requestorId?: string | null;
      assignedToId?: string | null;
      description?: string | null;
      ticketType?: string | null;
      status?: string | null;
      priority?: number | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
    facets?: {
      __typename?: 'ServiceTicketsSearchFacets';
      requestor?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      assignedTo?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      status?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      priority?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      requestorId?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
      assignedToId?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    } | null;
  } | null;
};

export type MemberNameServiceTicketContainerQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type MemberNameServiceTicketContainerQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{ __typename?: 'Member'; id: any; memberName?: string | null } | null> | null;
};

export type MembersNameServiceTicketContainerFieldsFragment = { __typename?: 'Member'; id: any; memberName?: string | null };

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

export type MembersServiceTicketsListContainerSearchServiceTicketsFieldsFragment = {
  __typename?: 'ServiceTicketsSearchResult';
  count?: number | null;
  serviceTicketsResults?: Array<{
    __typename?: 'ServiceTicketsResult';
    id?: string | null;
    communityId?: string | null;
    propertyId?: string | null;
    title?: string | null;
    requestor?: string | null;
    assignedTo?: string | null;
    requestorId?: string | null;
    assignedToId?: string | null;
    description?: string | null;
    ticketType?: string | null;
    status?: string | null;
    priority?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
  facets?: {
    __typename?: 'ServiceTicketsSearchFacets';
    requestor?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    assignedTo?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    status?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    priority?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    requestorId?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
    assignedToId?: Array<{ __typename?: 'FacetDetail'; value?: string | null; count?: number | null } | null> | null;
  } | null;
};

export type MemberServiceTicketsListContainerSearchServiceTicketsResultFieldsFragment = {
  __typename?: 'ServiceTicketsResult';
  id?: string | null;
  communityId?: string | null;
  propertyId?: string | null;
  title?: string | null;
  requestor?: string | null;
  assignedTo?: string | null;
  requestorId?: string | null;
  assignedToId?: string | null;
  description?: string | null;
  ticketType?: string | null;
  status?: string | null;
  priority?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type MemberTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type MemberTransactionsQuery = {
  __typename?: 'Query';
  violationTicketPaymentTransactions?: Array<{
    __typename: 'PaymentTransactionsResult';
    amount?: number | null;
    description?: string | null;
    id: any;
    createdAt?: any | null;
    completedOn?: any | null;
    transactionReferenceId?: string | null;
  } | null> | null;
};

export type MembersViolationTicketsDetailContainerViolationTicketQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersViolationTicketsDetailContainerViolationTicketQuery = {
  __typename?: 'Query';
  violationTicket?: {
    __typename?: 'ViolationTicket';
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
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null> | null;
    financeDetails?: {
      __typename?: 'FinanceDetails';
      serviceFee?: number | null;
      transactions?: {
        __typename?: 'Transactions';
        submission?: {
          __typename?: 'Submission';
          amount?: number | null;
          transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type MembersViolationTicketsDetailContainerPropertiesQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type MembersViolationTicketsDetailContainerPropertiesQuery = {
  __typename?: 'Query';
  propertiesByOwnerId?: Array<{ __typename?: 'Property'; id: any; propertyName: string } | null> | null;
};

export type MembersViolationTicketsDetailContainerViolationTicketUpdateMutationVariables = Exact<{
  input: ViolationTicketUpdateInput;
}>;

export type MembersViolationTicketsDetailContainerViolationTicketUpdateMutation = {
  __typename?: 'Mutation';
  violationTicketUpdate: {
    __typename: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
      financeDetails?: {
        __typename?: 'FinanceDetails';
        serviceFee?: number | null;
        transactions?: {
          __typename?: 'Transactions';
          submission?: {
            __typename?: 'Submission';
            amount?: number | null;
            transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type MembersViolationTicketsDetailContainerViolationTicketChangeStatusMutationVariables = Exact<{
  input: ViolationTicketChangeStatusInput;
}>;

export type MembersViolationTicketsDetailContainerViolationTicketChangeStatusMutation = {
  __typename?: 'Mutation';
  violationTicketChangeStatus: {
    __typename: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
      financeDetails?: {
        __typename?: 'FinanceDetails';
        serviceFee?: number | null;
        transactions?: {
          __typename?: 'Transactions';
          submission?: {
            __typename?: 'Submission';
            amount?: number | null;
            transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type MembersViolationTicketsDetailContainerViolationTicketAssignMutationVariables = Exact<{
  input: ViolationTicketAssignInput;
}>;

export type MembersViolationTicketsDetailContainerViolationTicketAssignMutation = {
  __typename?: 'Mutation';
  violationTicketAssign: {
    __typename: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
      financeDetails?: {
        __typename?: 'FinanceDetails';
        serviceFee?: number | null;
        transactions?: {
          __typename?: 'Transactions';
          submission?: {
            __typename?: 'Submission';
            amount?: number | null;
            transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutationVariables = Exact<{
  input: ViolationTicketAddUpdateActivityInput;
}>;

export type MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutation = {
  __typename?: 'Mutation';
  violationTicketAddUpdateActivity: {
    __typename: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
      financeDetails?: {
        __typename?: 'FinanceDetails';
        serviceFee?: number | null;
        transactions?: {
          __typename?: 'Transactions';
          submission?: {
            __typename?: 'Submission';
            amount?: number | null;
            transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type MembersViolationTicketsDetailContainerServiceTicketDeleteMutationVariables = Exact<{
  input: ViolationTicketDeleteInput;
}>;

export type MembersViolationTicketsDetailContainerServiceTicketDeleteMutation = {
  __typename?: 'Mutation';
  violationTicketDelete: {
    __typename: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
      financeDetails?: {
        __typename?: 'FinanceDetails';
        serviceFee?: number | null;
        transactions?: {
          __typename?: 'Transactions';
          submission?: {
            __typename?: 'Submission';
            amount?: number | null;
            transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type MembersViolationTicketsDetailContainerViolationTicketProcessPaymentMutationVariables = Exact<{
  input: ViolationTicketProcessPaymentInput;
}>;

export type MembersViolationTicketsDetailContainerViolationTicketProcessPaymentMutation = {
  __typename?: 'Mutation';
  violationTicketProcessPayment: {
    __typename: 'ViolationTicketMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    violationTicket?: {
      __typename?: 'ViolationTicket';
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
      photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
      activityLog?: Array<{
        __typename?: 'ServiceTicketActivityDetail';
        activityType: string;
        activityDescription: string;
        id: any;
        createdAt?: any | null;
        updatedAt?: any | null;
        activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
      } | null> | null;
      financeDetails?: {
        __typename?: 'FinanceDetails';
        serviceFee?: number | null;
        transactions?: {
          __typename?: 'Transactions';
          submission?: {
            __typename?: 'Submission';
            amount?: number | null;
            transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type MembersViolationTicketsDetailContainerViolationTicketMutationResultFieldsFragment = {
  __typename: 'ViolationTicketMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  violationTicket?: {
    __typename?: 'ViolationTicket';
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
    photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
    activityLog?: Array<{
      __typename?: 'ServiceTicketActivityDetail';
      activityType: string;
      activityDescription: string;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
    } | null> | null;
    financeDetails?: {
      __typename?: 'FinanceDetails';
      serviceFee?: number | null;
      transactions?: {
        __typename?: 'Transactions';
        submission?: {
          __typename?: 'Submission';
          amount?: number | null;
          transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type MembersViolationTicketsDetailContainerViolationTicketFieldsFragment = {
  __typename?: 'ViolationTicket';
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
  photos?: Array<{ __typename?: 'ServiceTicketPhoto'; documentId: string; description: string; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
  activityLog?: Array<{
    __typename?: 'ServiceTicketActivityDetail';
    activityType: string;
    activityDescription: string;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    activityBy: { __typename?: 'Member'; id: any; memberName?: string | null };
  } | null> | null;
  financeDetails?: {
    __typename?: 'FinanceDetails';
    serviceFee?: number | null;
    transactions?: {
      __typename?: 'Transactions';
      submission?: {
        __typename?: 'Submission';
        amount?: number | null;
        transactionReference?: { __typename?: 'TransactionReference'; vendor?: string | null; referenceId?: string | null; completedOn?: any | null } | null;
      } | null;
    } | null;
  } | null;
};

export type MembersViolationTicketsDetailContainerPropertyFieldsFragment = { __typename?: 'Property'; id: any; propertyName: string };

export type MemberPaymentInstrumentsQueryVariables = Exact<{ [key: string]: never }>;

export type MemberPaymentInstrumentsQuery = {
  __typename?: 'Query';
  memberPaymentInstruments?: {
    __typename?: 'PaymentInstrumentResult';
    paymentInstruments?: Array<{
      __typename?: 'PaymentInstrument';
      id?: string | null;
      paymentInstrumentId?: string | null;
      cardNumber?: string | null;
      cardType?: string | null;
      isDefault?: boolean | null;
      expirationMonth?: string | null;
      expirationYear?: string | null;
      state?: string | null;
      billTo?: {
        __typename: 'PaymentBillingInfo';
        billingAddressLine1?: string | null;
        billingAddressLine2?: string | null;
        billingCity?: string | null;
        billingState?: string | null;
        billingCountry?: string | null;
        billingEmail?: string | null;
        billingFirstName?: string | null;
        billingLastName?: string | null;
        billingPhone?: string | null;
        billingPostalCode?: string | null;
      } | null;
    } | null> | null;
    status: { __typename?: 'MutationStatus'; errorMessage?: string | null; success: boolean };
  } | null;
};

export type MemberDeletePaymentInstrumentMutationVariables = Exact<{
  input: Scalars['String'];
}>;

export type MemberDeletePaymentInstrumentMutation = {
  __typename?: 'Mutation';
  memberDeletePaymentInstrument: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
};

export type MemberSetDefaultPaymentInstrumentMutationVariables = Exact<{
  input: Scalars['String'];
}>;

export type MemberSetDefaultPaymentInstrumentMutation = {
  __typename?: 'Mutation';
  memberSetDefaultPaymentInstrument: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
};

export type MembersSectionLayoutMemberForCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type MembersSectionLayoutMemberForCurrentUserQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: { __typename?: 'Member'; isAdmin?: boolean | null; role?: { __typename?: 'Role'; roleName: string } | null } | null;
};

export type MembersSectionLayoutMemberFieldsFragment = { __typename?: 'Member'; isAdmin?: boolean | null; role?: { __typename?: 'Role'; roleName: string } | null };

export type SharedMemberProfileDetailsContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type SharedMemberProfileDetailsContainerMemberQuery = {
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

export type SharedMemberProfileDetailsContainerMemberProfileUpdateMutationVariables = Exact<{
  input: MemberProfileUpdateInput;
}>;

export type SharedMemberProfileDetailsContainerMemberProfileUpdateMutation = {
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

export type SharedMemberProfileDetailsContainerMemberMutationResultFieldsFragment = {
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

export type SharedMemberProfileDetailsContainerMemberFieldsFragment = {
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

export type SharedMemberProfileContainerMemberForCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type SharedMemberProfileContainerMemberForCurrentUserQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: { __typename?: 'Member'; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
};

export type SharedMemberProfileContainerMemberFieldsFragment = { __typename?: 'Member'; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null };

export type SharedPhotoUploadContainerMemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type SharedPhotoUploadContainerMemberQuery = {
  __typename?: 'Query';
  member?: { __typename?: 'Member'; id: any; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
};

export type SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutationVariables = Exact<{
  input: MemberAvatarImageInput;
}>;

export type SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  memberProfileAvatarCreateAuthHeader: {
    __typename?: 'MemberAvatarImageAuthHeaderResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobPath?: string | null;
      requestDate?: string | null;
      indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
      metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
    } | null;
    member?: { __typename?: 'Member'; id: any; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
  };
};

export type SharedPhotoUploadContainerMemberProfileAvatarRemoveMutationVariables = Exact<{
  memberId: Scalars['ObjectID'];
}>;

export type SharedPhotoUploadContainerMemberProfileAvatarRemoveMutation = {
  __typename?: 'Mutation';
  memberProfileAvatarRemove: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: { __typename?: 'Member'; id: any; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
  };
};

export type SharedPhotoUploadContainerMemberAvatarImageAuthHeaderResultFieldsFragment = {
  __typename?: 'MemberAvatarImageAuthHeaderResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  authHeader?: {
    __typename?: 'BlobAuthHeader';
    authHeader?: string | null;
    blobPath?: string | null;
    requestDate?: string | null;
    indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
    metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
  } | null;
  member?: { __typename?: 'Member'; id: any; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
};

export type SharedPhotoUploadContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: { __typename?: 'Member'; id: any; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
};

export type SharedPhotoUploadContainerAuthHeaderFieldsFragment = {
  __typename?: 'BlobAuthHeader';
  authHeader?: string | null;
  blobPath?: string | null;
  requestDate?: string | null;
  indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
  metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
};

export type SharedPhotoUploadContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null;
};

export type SharedPropertiesDetailContainerPropertyQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type SharedPropertiesDetailContainerPropertyQuery = {
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
    owner?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
  } | null;
};

export type SharedPropertiesDetailContainerMembersByCommunityQueryVariables = Exact<{
  communityId: Scalars['ID'];
}>;

export type SharedPropertiesDetailContainerMembersByCommunityQuery = {
  __typename?: 'Query';
  membersByCommunityId?: Array<{ __typename?: 'Member'; memberName?: string | null; id: any; createdAt?: any | null; updatedAt?: any | null } | null> | null;
};

export type SharedPropertiesDetailContainerPropertyUpdateMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type SharedPropertiesDetailContainerPropertyUpdateMutation = {
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
      owner?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
    } | null;
  };
};

export type SharedPropertiesDetailContainerPropertyDeleteMutationVariables = Exact<{
  input: PropertyDeleteInput;
}>;

export type SharedPropertiesDetailContainerPropertyDeleteMutation = {
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
      owner?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
    } | null;
  };
};

export type SharedPropertiesDetailContainerPropertyMutationResultFieldsFragment = {
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
    owner?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
  } | null;
};

export type SharedPropertiesDetailContainerPropertyFieldsFragment = {
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
  owner?: { __typename?: 'Member'; memberName?: string | null; id: any } | null;
};

export type SharedPropertiesDetailContainerMemberFieldsFragment = {
  __typename?: 'Member';
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type SharedPropertiesFloorPlanUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutationVariables = Exact<{
  input: PropertyBlobFileInput;
}>;

export type SharedPropertiesFloorPlanUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  propertyFloorPlanImageCreateAuthHeader: {
    __typename?: 'PropertyBlobFileAuthHeaderResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobPath?: string | null;
      requestDate?: string | null;
      indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
      metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
    } | null;
    property?: {
      __typename?: 'Property';
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      listingDetail?: { __typename?: 'ListingDetails'; floorPlanImages?: Array<string | null> | null } | null;
    } | null;
  };
};

export type SharedPropertiesFloorPlanUploadContainerPropertyBlobFileAuthHeaderResultFieldsFragment = {
  __typename?: 'PropertyBlobFileAuthHeaderResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  authHeader?: {
    __typename?: 'BlobAuthHeader';
    authHeader?: string | null;
    blobPath?: string | null;
    requestDate?: string | null;
    indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
    metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
  } | null;
  property?: {
    __typename?: 'Property';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    listingDetail?: { __typename?: 'ListingDetails'; floorPlanImages?: Array<string | null> | null } | null;
  } | null;
};

export type SharedPropertiesFloorPlanUploadContainerAuthHeaderFieldsFragment = {
  __typename?: 'BlobAuthHeader';
  authHeader?: string | null;
  blobPath?: string | null;
  requestDate?: string | null;
  indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
  metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
};

export type SharedPropertiesFloorPlanUploadContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  listingDetail?: { __typename?: 'ListingDetails'; floorPlanImages?: Array<string | null> | null } | null;
};

export type SharedPropertiesListingImageListContainerPropertyListingImageRemoveMutationVariables = Exact<{
  input: PropertyRemoveImageInput;
}>;

export type SharedPropertiesListingImageListContainerPropertyListingImageRemoveMutation = {
  __typename?: 'Mutation';
  propertyListingImageRemove: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    property?: { __typename?: 'Property'; id: any } | null;
  };
};

export type SharedPropertiesListingImageListContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  property?: { __typename?: 'Property'; id: any } | null;
};

export type SharedPropertiesListingImageListContainerPropertyFieldsFragment = { __typename?: 'Property'; id: any };

export type SharedPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutationVariables = Exact<{
  input: PropertyBlobFileInput;
}>;

export type SharedPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutation = {
  __typename?: 'Mutation';
  propertyListingImageCreateAuthHeader: {
    __typename?: 'PropertyBlobFileAuthHeaderResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    authHeader?: {
      __typename?: 'BlobAuthHeader';
      authHeader?: string | null;
      blobPath?: string | null;
      requestDate?: string | null;
      indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
      metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
    } | null;
    property?: {
      __typename?: 'Property';
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      listingDetail?: { __typename?: 'ListingDetails'; images?: Array<string | null> | null } | null;
    } | null;
  };
};

export type SharedPropertiesListingImageUploadContainerPropertyBlobFileAuthHeaderResultFieldsFragment = {
  __typename?: 'PropertyBlobFileAuthHeaderResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  authHeader?: {
    __typename?: 'BlobAuthHeader';
    authHeader?: string | null;
    blobPath?: string | null;
    requestDate?: string | null;
    indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
    metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
  } | null;
  property?: {
    __typename?: 'Property';
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    listingDetail?: { __typename?: 'ListingDetails'; images?: Array<string | null> | null } | null;
  } | null;
};

export type SharedPropertiesListingImageUploadContainerAuthHeaderFieldsFragment = {
  __typename?: 'BlobAuthHeader';
  authHeader?: string | null;
  blobPath?: string | null;
  requestDate?: string | null;
  indexTags?: Array<{ __typename?: 'BlobIndexTag'; name: string; value: string } | null> | null;
  metadataFields?: Array<{ __typename?: 'BlobMetadataField'; name: string; value: string } | null> | null;
};

export type SharedPropertiesListingImageUploadContainerPropertyFieldsFragment = {
  __typename?: 'Property';
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  listingDetail?: { __typename?: 'ListingDetails'; images?: Array<string | null> | null } | null;
};

export type SharedPropertiesListingContainerPropertyQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;

export type SharedPropertiesListingContainerPropertyQuery = {
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
      bedroomDetails?: Array<{ __typename?: 'BedroomDetails'; bedDescriptions?: Array<string | null> | null; roomName?: string | null; id: any } | null> | null;
      additionalAmenities?: Array<{ __typename?: 'AdditionalAmenities'; category?: string | null; amenities?: Array<string | null> | null; id: any } | null> | null;
    } | null;
  } | null;
};

export type SharedPropertiesListingContainerPropertyUpdateMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type SharedPropertiesListingContainerPropertyUpdateMutation = {
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
        bedroomDetails?: Array<{ __typename?: 'BedroomDetails'; bedDescriptions?: Array<string | null> | null; roomName?: string | null; id: any } | null> | null;
        additionalAmenities?: Array<{ __typename?: 'AdditionalAmenities'; category?: string | null; amenities?: Array<string | null> | null; id: any } | null> | null;
      } | null;
    } | null;
  };
};

export type SharedPropertiesListingContainerPropertyMutationResultFieldsFragment = {
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
      bedroomDetails?: Array<{ __typename?: 'BedroomDetails'; bedDescriptions?: Array<string | null> | null; roomName?: string | null; id: any } | null> | null;
      additionalAmenities?: Array<{ __typename?: 'AdditionalAmenities'; category?: string | null; amenities?: Array<string | null> | null; id: any } | null> | null;
    } | null;
  } | null;
};

export type SharedPropertiesListingContainerPropertyFieldsFragment = {
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
    bedroomDetails?: Array<{ __typename?: 'BedroomDetails'; bedDescriptions?: Array<string | null> | null; roomName?: string | null; id: any } | null> | null;
    additionalAmenities?: Array<{ __typename?: 'AdditionalAmenities'; category?: string | null; amenities?: Array<string | null> | null; id: any } | null> | null;
  } | null;
};

export type SharedPropertiesLocationContainerPropertyQueryVariables = Exact<{
  propertyId: Scalars['ObjectID'];
}>;

export type SharedPropertiesLocationContainerPropertyQuery = {
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

export type SharedPropertiesLocationContainerPropertyUpdateMutationVariables = Exact<{
  input: PropertyUpdateInput;
}>;

export type SharedPropertiesLocationContainerPropertyUpdateMutation = {
  __typename?: 'Mutation';
  propertyUpdate: {
    __typename?: 'PropertyMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
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
};

export type SharedPropertiesLocationContainerPropertyMutationResultFieldsFragment = {
  __typename?: 'PropertyMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
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

export type SharedPropertiesLocationContainerPropertyPropertyFieldsFragment = {
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
};

export type SharedSearchDrawerContainerMemberForCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type SharedSearchDrawerContainerMemberForCurrentUserQuery = {
  __typename?: 'Query';
  memberForCurrentUser?: {
    __typename?: 'Member';
    id: any;
    customViews?: Array<{
      __typename?: 'CustomView';
      id: any;
      name?: string | null;
      type?: string | null;
      filters?: Array<string | null> | null;
      sortOrder?: string | null;
      columnsToDisplay?: Array<string | null> | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
  } | null;
};

export type SharedSearchDrawerContainerMemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
}>;

export type SharedSearchDrawerContainerMemberUpdateMutation = {
  __typename?: 'Mutation';
  memberUpdate: {
    __typename?: 'MemberMutationResult';
    status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
    member?: {
      __typename?: 'Member';
      id: any;
      customViews?: Array<{
        __typename?: 'CustomView';
        id: any;
        name?: string | null;
        type?: string | null;
        filters?: Array<string | null> | null;
        sortOrder?: string | null;
        columnsToDisplay?: Array<string | null> | null;
        createdAt?: any | null;
        updatedAt?: any | null;
      } | null> | null;
    } | null;
  };
};

export type SharedSearchDrawerContainerMemberMutationResultFieldsFragment = {
  __typename?: 'MemberMutationResult';
  status: { __typename?: 'MutationStatus'; success: boolean; errorMessage?: string | null };
  member?: {
    __typename?: 'Member';
    id: any;
    customViews?: Array<{
      __typename?: 'CustomView';
      id: any;
      name?: string | null;
      type?: string | null;
      filters?: Array<string | null> | null;
      sortOrder?: string | null;
      columnsToDisplay?: Array<string | null> | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
  } | null;
};

export type SharedSearchDrawerContainerMemberFieldsFragment = {
  __typename?: 'Member';
  id: any;
  customViews?: Array<{
    __typename?: 'CustomView';
    id: any;
    name?: string | null;
    type?: string | null;
    filters?: Array<string | null> | null;
    sortOrder?: string | null;
    columnsToDisplay?: Array<string | null> | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null> | null;
};

export type StaffSectionLayoutContainerUserCurrentQueryQueryVariables = Exact<{ [key: string]: never }>;

export type StaffSectionLayoutContainerUserCurrentQueryQuery = {
  __typename?: 'Query';
  staffUserCurrent?: {
    __typename?: 'StaffUser';
    id: any;
    displayName?: string | null;
    role?: {
      __typename?: 'StaffRole';
      id: any;
      permissions: {
        __typename?: 'StaffPermissions';
        communityPermissions: {
          __typename?: 'StaffCommunityPermissions';
          canManageStaffRolesAndPermissions: boolean;
          canManageAllCommunities: boolean;
          canDeleteCommunities: boolean;
          canChangeCommunityOwner: boolean;
          canReIndexSearchCollections: boolean;
        };
      };
    } | null;
  } | null;
};

export type StaffSectionLayoutContainerUserCurrentQueryFieldsFragment = {
  __typename?: 'StaffUser';
  id: any;
  displayName?: string | null;
  role?: {
    __typename?: 'StaffRole';
    id: any;
    permissions: {
      __typename?: 'StaffPermissions';
      communityPermissions: {
        __typename?: 'StaffCommunityPermissions';
        canManageStaffRolesAndPermissions: boolean;
        canManageAllCommunities: boolean;
        canDeleteCommunities: boolean;
        canChangeCommunityOwner: boolean;
        canReIndexSearchCollections: boolean;
      };
    };
  } | null;
};

export type SharedCommunitiesDropdownContainerMembersQueryVariables = Exact<{
  userExternalId: Scalars['String'];
}>;

export type SharedCommunitiesDropdownContainerMembersQuery = {
  __typename?: 'Query';
  membersByUserExternalId?: Array<{
    __typename?: 'Member';
    id: any;
    memberName?: string | null;
    isAdmin?: boolean | null;
    community?: { __typename?: 'Community'; id: any; name?: string | null } | null;
  } | null> | null;
};

export type SharedCommunitiesDropdownContainerMembersFieldsFragment = {
  __typename?: 'Member';
  id: any;
  memberName?: string | null;
  isAdmin?: boolean | null;
  community?: { __typename?: 'Community'; id: any; name?: string | null } | null;
};

export type LoggedInUserRootContainerUserCurrentQueryQueryVariables = Exact<{ [key: string]: never }>;

export type LoggedInUserRootContainerUserCurrentQueryQuery = {
  __typename?: 'Query';
  userCurrent?: {
    __typename: 'User';
    id: any;
    externalId?: string | null;
    personalInformation?: {
      __typename?: 'PersonalInformation';
      identityDetails?: { __typename?: 'IdentityDetails'; lastName: string; restOfName?: string | null } | null;
    } | null;
  } | null;
};

export type LoggedInUserCommunityContainerUserCurrentQueryQueryVariables = Exact<{ [key: string]: never }>;

export type LoggedInUserCommunityContainerUserCurrentQueryQuery = {
  __typename?: 'Query';
  userCurrent?: {
    __typename: 'User';
    id: any;
    externalId?: string | null;
    personalInformation?: {
      __typename?: 'PersonalInformation';
      identityDetails?: { __typename?: 'IdentityDetails'; lastName: string; restOfName?: string | null } | null;
    } | null;
  } | null;
  memberForCurrentUser?: { __typename: 'Member'; profile?: { __typename?: 'MemberProfile'; avatarDocumentId?: string | null } | null } | null;
};

export type LoggedInUserContainerUserCurrentFieldsFragment = {
  __typename: 'User';
  id: any;
  externalId?: string | null;
  personalInformation?: {
    __typename?: 'PersonalInformation';
    identityDetails?: { __typename?: 'IdentityDetails'; lastName: string; restOfName?: string | null } | null;
  } | null;
};

export const CommunityListContainerCommunityFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' },
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
} as unknown as DocumentNode<CommunityListContainerCommunityFieldsFragment, unknown>;
export const AccountsCommunityCreateContainerCommunityCreateFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountsCommunityCreateContainerCommunityCreateFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityMutationResult' } },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' },
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
} as unknown as DocumentNode<AccountsCommunityCreateContainerCommunityCreateFieldsFragment, unknown>;
export const CommunityListContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommunityListContainerMemberFieldsFragment, unknown>;
export const AccountsUserInfoContainerUserFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountsUserInfoContainerUserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'personalInformation' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identityDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AccountsUserInfoContainerUserFieldsFragment, unknown>;
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
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminCommunityDetailContainerCommunityFieldsFragment, unknown>;
export const AdminMembersAccountsAddContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberFields' },
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
} as unknown as DocumentNode<AdminMembersAccountsAddContainerMemberFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberFields' },
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
} as unknown as DocumentNode<AdminMembersAccountsAddContainerMemberMutationResultFieldsFragment, unknown>;
export const AdminMembersAccountEditContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactInformation' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersAccountEditContainerMemberFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactInformation' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersAccountsEditContainerMemberMutationResultFieldsFragment, unknown>;
export const AdminMembersAccountsListContainerMemberAccountFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberAccountFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccount' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'personalInformation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contactInformation' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'statusCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsListContainerMemberAccountFieldsFragment, unknown>;
export const AdminMembersAccountsListContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberAccountFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberAccountFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccount' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'personalInformation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contactInformation' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'statusCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsListContainerMemberFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersCreateContainerMember' } }] }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<AdminMembersCreateContainerMemberMutationResultFieldsFragment, unknown>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
export const AdminMembersDetailContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberFields' } }] }
          }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersDetailContainerMemberMutationResultFieldsFragment, unknown>;
export const AdminMembersDetailContainerRoleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerRoleFields' },
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
} as unknown as DocumentNode<AdminMembersDetailContainerRoleFieldsFragment, unknown>;
export const AdminMembersListContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersListContainerMemberFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersListContainerMemberFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyFields' } }] }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<AdminPropertiesAddContainerPropertyMutationResultFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesListContainerPropertyFieldsFragment, unknown>;
export const AdminRolesDeleteContainerRoleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' },
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
} as unknown as DocumentNode<AdminRolesDeleteContainerRoleFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicketPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' } }] }
          }
        ]
      }
    },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicketPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
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
} as unknown as DocumentNode<AdminRolesDetailContainerRoleMutationResultFieldsFragment, unknown>;
export const AdminRolesListContainerRoleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesListContainerRoleFields' },
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
} as unknown as DocumentNode<AdminRolesListContainerRoleFieldsFragment, unknown>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerServiceTicketFieldsFragment, unknown>;
export const AdminServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragment, unknown>;
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
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerPropertyFieldsFragment, unknown>;
export const AdminServiceTicketsDetailContainerServiceTicketActivityDetailFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerServiceTicketActivityDetailFieldsFragment, unknown>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerServiceTicketFieldsFragment, unknown>;
export const AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragment, unknown>;
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
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerPropertyFieldsFragment, unknown>;
export const AdminServiceTicketsListContainerServiceTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsListContainerServiceTicketFieldsFragment, unknown>;
export const AdminServiceTicketsListContainerViolationTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsListContainerViolationTicketFieldsFragment, unknown>;
export const AdminServiceTicketsListContainerServiceTicketsResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedTo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestorId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedToId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsListContainerServiceTicketsResultFieldsFragment, unknown>;
export const AdminServiceTicketServiceTicketsSearchSearchResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketServiceTicketsSearchSearchResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsSearchResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsResults' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsResultFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedTo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestorId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedToId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketServiceTicketsSearchSearchResultFieldsFragment, unknown>;
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domainStatus' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } }
                    ]
                  }
                }
              ]
            }
          },
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
export const AdminSettingsGeneralContainerCommunityMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityMutationResult' } },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domainStatus' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSettingsGeneralContainerCommunityMutationResultFieldsFragment, unknown>;
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
export const AdminSiteEditorFilesListContainerCommunityMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityMutationResult' } },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityFields' } }] }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<AdminSiteEditorFilesListContainerCommunityMutationResultFieldsFragment, unknown>;
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
export const AdminSiteEditorFilesUploadContainerBlobAuthHeaderFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerBlobAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorFilesUploadContainerBlobAuthHeaderFieldsFragment, unknown>;
export const AdminSiteEditorFilesUploadContainerCommunityMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobContentAuthHeaderResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerBlobAuthHeaderFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerBlobAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorFilesUploadContainerCommunityMutationResultFieldsFragment, unknown>;
export const AdminSiteEditorContainerBlobAuthHeaderFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerBlobAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorContainerBlobAuthHeaderFieldsFragment, unknown>;
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
export const AdminSiteEditorContainerCommunityMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobContentAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorContainerBlobAuthHeaderFields' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerBlobAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<AdminSiteEditorContainerCommunityMutationResultFieldsFragment, unknown>;
export const AdminViolationTicketsCreateContainerViolationTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerViolationTicketFieldsFragment, unknown>;
export const AdminViolationTicketsCreateContainerMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerMutationResultFieldsFragment, unknown>;
export const AdminViolationTicketsCreateContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerMemberFields' },
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
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerMemberFieldsFragment, unknown>;
export const AdminViolationTicketsCreateContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerPropertyFields' },
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
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerPropertyFieldsFragment, unknown>;
export const AdminViolationTicketsDetailContainerServiceTicketActivityDetailFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerServiceTicketActivityDetailFieldsFragment, unknown>;
export const AdminViolationTicketsDetailContainerViolationTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerViolationTicketFieldsFragment, unknown>;
export const AdminViolationTicketsDetailContainerViolationTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerViolationTicketMutationResultFieldsFragment, unknown>;
export const AdminViolationTicketsDetailContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerMemberFieldsFragment, unknown>;
export const SectionLayoutContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SectionLayoutContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'communityPermissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageSiteContent' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageMembers' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'propertyPermissions' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'canManageProperties' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serviceTicketPermissions' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'violationTicketPermissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SectionLayoutContainerMemberFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'identityDetails' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }] }
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
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesListSearchContainerPropertyResultFieldsFragment, unknown>;
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersPropertiesListSearchContainerPropertyResultFields' } }]
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updatedAt' },
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
                  name: { kind: 'Name', value: 'createdAt' },
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
                  name: { kind: 'Name', value: 'tags' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberPropertiesListSearchContainerPropertyFieldsFragment, unknown>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesListContainerPropertyFieldsFragment, unknown>;
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
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerServiceTicketFieldsFragment, unknown>;
export const MembersServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    },
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
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerServiceTicketMutationResultFieldsFragment, unknown>;
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
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerServiceTicketFieldsFragment, unknown>;
export const MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerServiceTicketMutationResultFieldsFragment, unknown>;
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
export const MembersNameServiceTicketContainerFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersNameServiceTicketContainerFields' },
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
} as unknown as DocumentNode<MembersNameServiceTicketContainerFieldsFragment, unknown>;
export const MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFieldsFragment, unknown>;
export const MemberServiceTicketsListContainerSearchServiceTicketsResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberServiceTicketsListContainerSearchServiceTicketsResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedTo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestorId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedToId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberServiceTicketsListContainerSearchServiceTicketsResultFieldsFragment, unknown>;
export const MembersServiceTicketsListContainerSearchServiceTicketsFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsListContainerSearchServiceTicketsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsSearchResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsResults' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberServiceTicketsListContainerSearchServiceTicketsResultFields' } }]
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
                  name: { kind: 'Name', value: 'requestor' },
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
                  name: { kind: 'Name', value: 'assignedTo' },
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
                  name: { kind: 'Name', value: 'status' },
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
                  name: { kind: 'Name', value: 'priority' },
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
                  name: { kind: 'Name', value: 'requestorId' },
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
                  name: { kind: 'Name', value: 'assignedToId' },
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberServiceTicketsListContainerSearchServiceTicketsResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedTo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestorId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedToId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsListContainerSearchServiceTicketsFieldsFragment, unknown>;
export const MembersViolationTicketsDetailContainerViolationTicketFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersViolationTicketsDetailContainerViolationTicketFieldsFragment, unknown>;
export const MembersViolationTicketsDetailContainerViolationTicketMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersViolationTicketsDetailContainerViolationTicketMutationResultFieldsFragment, unknown>;
export const MembersViolationTicketsDetailContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerPropertyFields' },
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
} as unknown as DocumentNode<MembersViolationTicketsDetailContainerPropertyFieldsFragment, unknown>;
export const MembersSectionLayoutMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersSectionLayoutMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'roleName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersSectionLayoutMemberFieldsFragment, unknown>;
export const SharedMemberProfileDetailsContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' },
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
} as unknown as DocumentNode<SharedMemberProfileDetailsContainerMemberFieldsFragment, unknown>;
export const SharedMemberProfileDetailsContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' },
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
} as unknown as DocumentNode<SharedMemberProfileDetailsContainerMemberMutationResultFieldsFragment, unknown>;
export const SharedMemberProfileContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedMemberProfileContainerMemberFieldsFragment, unknown>;
export const SharedPhotoUploadContainerAuthHeaderFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPhotoUploadContainerAuthHeaderFieldsFragment, unknown>;
export const SharedPhotoUploadContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPhotoUploadContainerMemberFieldsFragment, unknown>;
export const SharedPhotoUploadContainerMemberAvatarImageAuthHeaderResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberAvatarImageAuthHeaderResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAvatarImageAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerAuthHeaderFields' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPhotoUploadContainerMemberAvatarImageAuthHeaderResultFieldsFragment, unknown>;
export const SharedPhotoUploadContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPhotoUploadContainerMemberMutationResultFieldsFragment, unknown>;
export const SharedPropertiesDetailContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<SharedPropertiesDetailContainerPropertyFieldsFragment, unknown>;
export const SharedPropertiesDetailContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<SharedPropertiesDetailContainerPropertyMutationResultFieldsFragment, unknown>;
export const SharedPropertiesDetailContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerMemberFields' },
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
} as unknown as DocumentNode<SharedPropertiesDetailContainerMemberFieldsFragment, unknown>;
export const SharedPropertiesFloorPlanUploadContainerAuthHeaderFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesFloorPlanUploadContainerAuthHeaderFieldsFragment, unknown>;
export const SharedPropertiesFloorPlanUploadContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'floorPlanImages' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesFloorPlanUploadContainerPropertyFieldsFragment, unknown>;
export const SharedPropertiesFloorPlanUploadContainerPropertyBlobFileAuthHeaderResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyBlobFileAuthHeaderResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerAuthHeaderFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'floorPlanImages' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesFloorPlanUploadContainerPropertyBlobFileAuthHeaderResultFieldsFragment, unknown>;
export const SharedPropertiesListingImageListContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesListingImageListContainerPropertyFieldsFragment, unknown>;
export const SharedPropertiesListingImageListContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyMutationResultFields' },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesListingImageListContainerPropertyMutationResultFieldsFragment, unknown>;
export const SharedPropertiesListingImageUploadContainerAuthHeaderFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesListingImageUploadContainerAuthHeaderFieldsFragment, unknown>;
export const SharedPropertiesListingImageUploadContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'images' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesListingImageUploadContainerPropertyFieldsFragment, unknown>;
export const SharedPropertiesListingImageUploadContainerPropertyBlobFileAuthHeaderResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyBlobFileAuthHeaderResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerAuthHeaderFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'images' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesListingImageUploadContainerPropertyBlobFileAuthHeaderResultFieldsFragment, unknown>;
export const SharedPropertiesListingContainerPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'bedDescriptions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roomName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<SharedPropertiesListingContainerPropertyFieldsFragment, unknown>;
export const SharedPropertiesListingContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'bedDescriptions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roomName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<SharedPropertiesListingContainerPropertyMutationResultFieldsFragment, unknown>;
export const SharedPropertiesLocationContainerPropertyPropertyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mapSASToken' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySecondarySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivisionName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countryTertiarySubdivision' } },
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
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } }] }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesLocationContainerPropertyPropertyFieldsFragment, unknown>;
export const SharedPropertiesLocationContainerPropertyMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyMutationResultFields' },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mapSASToken' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySecondarySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivisionName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countryTertiarySubdivision' } },
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
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } }] }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesLocationContainerPropertyMutationResultFieldsFragment, unknown>;
export const SharedSearchDrawerContainerMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customViews' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sortOrder' } },
                { kind: 'Field', name: { kind: 'Name', value: 'columnsToDisplay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedSearchDrawerContainerMemberFieldsFragment, unknown>;
export const SharedSearchDrawerContainerMemberMutationResultFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customViews' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sortOrder' } },
                { kind: 'Field', name: { kind: 'Name', value: 'columnsToDisplay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedSearchDrawerContainerMemberMutationResultFieldsFragment, unknown>;
export const StaffSectionLayoutContainerUserCurrentQueryFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StaffSectionLayoutContainerUserCurrentQueryFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'StaffUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'communityPermissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageStaffRolesAndPermissions' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageAllCommunities' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canDeleteCommunities' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canChangeCommunityOwner' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canReIndexSearchCollections' } }
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
      }
    }
  ]
} as unknown as DocumentNode<StaffSectionLayoutContainerUserCurrentQueryFieldsFragment, unknown>;
export const SharedCommunitiesDropdownContainerMembersFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedCommunitiesDropdownContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedCommunitiesDropdownContainerMembersFieldsFragment, unknown>;
export const LoggedInUserContainerUserCurrentFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'personalInformation' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identityDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoggedInUserContainerUserCurrentFieldsFragment, unknown>;
export const AhpIdFormCommunityPublicFileCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AhpIdFormCommunityPublicFileCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobFileInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicFileCreateAuthHeader' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
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
                      { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'indexTags' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'metadataFields' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } }
                          ]
                        }
                      }
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
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AhpIdFormCommunityPublicFileCreateAuthHeaderMutation, AhpIdFormCommunityPublicFileCreateAuthHeaderMutationVariables>;
export const AhpIdFormCommunityPublicFileRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AhpIdFormCommunityPublicFileRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityPublicFileRemoveInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicFileRemove' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
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
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AhpIdFormCommunityPublicFileRemoveMutation, AhpIdFormCommunityPublicFileRemoveMutationVariables>;
export const AccountsCommunityCreateContainerCommunityCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AccountsCommunityCreateContainerCommunityCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityCreateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityCreate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AccountsCommunityCreateContainerCommunityCreateFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountsCommunityCreateContainerCommunityCreateFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityMutationResult' } },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AccountsCommunityCreateContainerCommunityCreateMutation, AccountsCommunityCreateContainerCommunityCreateMutationVariables>;
export const AccountsCommunityListContainerCommunitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountsCommunityListContainerCommunities' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communities' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerCommunityFields' },
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
} as unknown as DocumentNode<AccountsCommunityListContainerCommunitiesQuery, AccountsCommunityListContainerCommunitiesQueryVariables>;
export const AccountsCommunityListContainerMembersByUserExternalIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountsCommunityListContainerMembersByUserExternalId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userExternalId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByUserExternalId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'userExternalId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'userExternalId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommunityListContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommunityListContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AccountsCommunityListContainerMembersByUserExternalIdQuery, AccountsCommunityListContainerMembersByUserExternalIdQueryVariables>;
export const AccountsUserInfoContainerUserCurrentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountsUserInfoContainerUserCurrent' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userCurrent' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AccountsUserInfoContainerUserFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountsUserInfoContainerUserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'personalInformation' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identityDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AccountsUserInfoContainerUserCurrentQuery, AccountsUserInfoContainerUserCurrentQueryVariables>;
export const AdminCommunityDetailContainerCommunityByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminCommunityDetailContainerCommunityById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminCommunityDetailContainerCommunityFields' } }] }
          }
        ]
      }
    },
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
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminCommunityDetailContainerCommunityByIdQuery, AdminCommunityDetailContainerCommunityByIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccountAddInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAccountAdd' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberFields' },
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsAddContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsAddContainerMemberAccountAddMutation, AdminMembersAccountsAddContainerMemberAccountAddMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactInformation' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersAccountsEditContainerMemberQuery, AdminMembersAccountsEditContainerMemberQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccountEditInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAccountEdit' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsEditContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactInformation' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsEditContainerMemberAccountEditMutation, AdminMembersAccountsEditContainerMemberAccountEditMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccountRemoveInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAccountRemove' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsEditContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactInformation' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountEditContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsEditContainerMemberAccountRemoveMutation, AdminMembersAccountsEditContainerMemberAccountRemoveMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberAccountFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAccount' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'personalInformation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contactInformation' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }] }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersAccountsListContainerMemberAccountFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersAccountsListContainerMemberQuery, AdminMembersAccountsListContainerMemberQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberCreateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberCreate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersCreateContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersCreateContainerMember' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersCreateContainerMemberCreateMutation, AdminMembersCreateContainerMemberCreateMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberFields' } }] }
          }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersDetailContainerMemberQuery, AdminMembersDetailContainerMemberQueryVariables>;
export const AdminMembersDetailContainerRolesByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerRolesByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rolesByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersDetailContainerRoleFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerRoleFields' },
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
} as unknown as DocumentNode<AdminMembersDetailContainerRolesByCommunityIdQuery, AdminMembersDetailContainerRolesByCommunityIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersDetailContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminMembersDetailContainerMemberUpdateMutation, AdminMembersDetailContainerMemberUpdateMutationVariables>;
export const AdminMembersListContainerMembersByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMembersListContainerMembersByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminMembersListContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminMembersListContainerMemberFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'roleName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<AdminMembersListContainerMembersByCommunityIdQuery, AdminMembersListContainerMembersByCommunityIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyAddInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyAdd' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminPropertiesAddContainerPropertyFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesAddContainerPropertyAddMutation, AdminPropertiesAddContainerPropertyAddMutationVariables>;
export const AdminPropertiesListContainerPropertiesByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminPropertiesListContainerPropertiesByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminPropertiesListContainerPropertyFields' } }] }
          }
        ]
      }
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminPropertiesListContainerPropertiesByCommunityIdQuery, AdminPropertiesListContainerPropertiesByCommunityIdQueryVariables>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' },
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
} as unknown as DocumentNode<AdminRolesDeleteContainerRolesQuery, AdminRolesDeleteContainerRolesQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleDeleteAndReassignInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleDeleteAndReassign' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' },
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDeleteContainerRoleFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminRolesDeleteContainerRoleDeleteAndReassignMutation, AdminRolesDeleteContainerRoleDeleteAndReassignMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'Id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' } }] }
          }
        ]
      }
    },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicketPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
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
} as unknown as DocumentNode<AdminRolesDetailContainerRoleQuery, AdminRolesDetailContainerRoleQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleAddInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleAdd' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicketPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminRolesDetailContainerRoleAddMutation, AdminRolesDetailContainerRoleAddMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoleUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicketPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
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
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesDetailContainerRoleFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminRolesDetailContainerRoleUpdateMutation, AdminRolesDetailContainerRoleUpdateMutationVariables>;
export const AdminRolesListContainerRolesByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminRolesListContainerRolesByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rolesByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminRolesListContainerRoleFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminRolesListContainerRoleFields' },
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
} as unknown as DocumentNode<AdminRolesListContainerRolesByCommunityIdQuery, AdminRolesListContainerRolesByCommunityIdQueryVariables>;
export const AdminServiceTicketsCreateContainerMembersByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMembersByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerMembersByCommunityIdQuery, AdminServiceTicketsCreateContainerMembersByCommunityIdQueryVariables>;
export const AdminServiceTicketsCreateContainerPropertiesByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertiesByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerPropertiesByCommunityIdQuery, AdminServiceTicketsCreateContainerPropertiesByCommunityIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketCreateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketCreate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsCreateContainerServiceTicketCreateMutation, AdminServiceTicketsCreateContainerServiceTicketCreateMutationVariables>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerMembersAssignableToTicketsQuery, AdminServiceTicketsDetailContainerMembersAssignableToTicketsQueryVariables>;
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerPropertiesQuery, AdminServiceTicketsDetailContainerPropertiesQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerServiceTicketQuery, AdminServiceTicketsDetailContainerServiceTicketQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerServiceTicketUpdateMutation, AdminServiceTicketsDetailContainerServiceTicketUpdateMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketChangeStatusInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketChangeStatus' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketChangeStatusMutation,
  AdminServiceTicketsDetailContainerServiceTicketChangeStatusMutationVariables
>;
export const AdminServiceTicketsDetailContainerServiceTicketAssignDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketAssign' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketAssignInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAssign' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsDetailContainerServiceTicketAssignMutation, AdminServiceTicketsDetailContainerServiceTicketAssignMutationVariables>;
export const AdminServiceTicketsDetailContainerServiceTicketAddUpdateActivityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketAddUpdateActivity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketAddUpdateActivityInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAddUpdateActivity' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminServiceTicketsDetailContainerServiceTicketAddUpdateActivityMutation,
  AdminServiceTicketsDetailContainerServiceTicketAddUpdateActivityMutationVariables
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketDeleteInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketDelete' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketDetailContainerServiceTicketDeleteMutation, AdminServiceTicketDetailContainerServiceTicketDeleteMutationVariables>;
export const AdminServiceTicketsListContainerServiceTicketsByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketFields' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsListContainerViolationTicketFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsListContainerServiceTicketsByCommunityIdQuery, AdminServiceTicketsListContainerServiceTicketsByCommunityIdQueryVariables>;
export const AdminServiceTicketsListContainerServiceTicketsSearchAdminDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsSearchAdmin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsSearchInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsSearchAdmin' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketServiceTicketsSearchSearchResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedTo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestorId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedToId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketServiceTicketsSearchSearchResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsSearchResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsResults' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsListContainerServiceTicketsResultFields' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminServiceTicketsListContainerServiceTicketsSearchAdminQuery, AdminServiceTicketsListContainerServiceTicketsSearchAdminQueryVariables>;
export const AdminSettingsGeneralContainerCommunityByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domainStatus' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSettingsGeneralContainerCommunityByIdQuery, AdminSettingsGeneralContainerCommunityByIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Community' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'domainStatus' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'whiteLabelDomain' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityMutationResult' } },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSettingsGeneralContainerCommunityFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSettingsGeneralContainerCommunityUpdateMutation, AdminSettingsGeneralContainerCommunityUpdateMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityById' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityFields' } }] }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<AdminSiteEditorFilesListContainerCommunityByIdQuery, AdminSiteEditorFilesListContainerCommunityByIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityPublicFileRemoveInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicFileRemove' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityMutationResult' } },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesListContainerCommunityFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminSiteEditorFilesListContainerCommunityPublicFileRemoveMutation, AdminSiteEditorFilesListContainerCommunityPublicFileRemoveMutationVariables>;
export const AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobFileInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicFileCreateAuthHeader' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerBlobAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobContentAuthHeaderResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerCommunityFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorFilesUploadContainerBlobAuthHeaderFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutation,
  AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderMutationVariables
>;
export const AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityPublicContentCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobContentInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'communityPublicContentCreateAuthHeader' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerBlobAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CommunityBlobContentAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorContainerBlobAuthHeaderFields' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminSiteEditorContainerCommunityFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutation,
  AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderMutationVariables
>;
export const AdminViolationTicketsCreateContainerMembersByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerMembersByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerMembersByCommunityIdQuery, AdminViolationTicketsCreateContainerMembersByCommunityIdQueryVariables>;
export const AdminViolationTicketsCreateContainerPropertiesByCommunityIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerPropertiesByCommunityId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminServiceTicketsCreateContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerPropertiesByCommunityIdQuery, AdminViolationTicketsCreateContainerPropertiesByCommunityIdQueryVariables>;
export const AdminViolationTicketsCreateContainerViolationTicketCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerViolationTicketCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketCreateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketCreate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsCreateContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsCreateContainerViolationTicketCreateMutation, AdminViolationTicketsCreateContainerViolationTicketCreateMutationVariables>;
export const AdminViolationTicketsDetailContainerMemberAssignableToTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerMemberAssignableToTickets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'violationTicketId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAssignableToViolationTickets' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'violationTicketId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'violationTicketId' } } }
            ],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerMemberAssignableToTicketsQuery, AdminViolationTicketsDetailContainerMemberAssignableToTicketsQueryVariables>;
export const AdminViolationTicketsDetailContainerViolationTicketDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicket' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicket' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerViolationTicketQuery, AdminViolationTicketsDetailContainerViolationTicketQueryVariables>;
export const AdminViolationTicketsDetailContainerViolationTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerViolationTicketUpdateMutation, AdminViolationTicketsDetailContainerViolationTicketUpdateMutationVariables>;
export const AdminViolationTicketsDetailContainerViolationTicketChangeStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketChangeStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketChangeStatusInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketChangeStatus' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminViolationTicketsDetailContainerViolationTicketChangeStatusMutation,
  AdminViolationTicketsDetailContainerViolationTicketChangeStatusMutationVariables
>;
export const AdminViolationTicketsDetailContainerViolationTicketAssignDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketAssign' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketAssignInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketAssign' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketsDetailContainerViolationTicketAssignMutation, AdminViolationTicketsDetailContainerViolationTicketAssignMutationVariables>;
export const AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketAddUpdateActivityInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketAddUpdateActivity' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutation,
  AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutationVariables
>;
export const AdminViolationTicketDetailContainerViolationTicketDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminViolationTicketDetailContainerViolationTicketDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketDeleteInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketDelete' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketActivityDetail' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'propertyName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerServiceTicketActivityDetailFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AdminViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminViolationTicketDetailContainerViolationTicketDeleteMutation, AdminViolationTicketDetailContainerViolationTicketDeleteMutationVariables>;
export const SectionLayoutContainerMemberByIdQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SectionLayoutContainerMemberByIdQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SectionLayoutContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SectionLayoutContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'communityPermissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageRolesAndPermissions' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageCommunitySettings' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageSiteContent' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageMembers' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'propertyPermissions' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'canManageProperties' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serviceTicketPermissions' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'violationTicketPermissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageTickets' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canCreateTickets' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canAssignTickets' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canWorkOnTickets' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SectionLayoutContainerMemberByIdQueryQuery, SectionLayoutContainerMemberByIdQueryQueryVariables>;
export const PaymentRequestFormServiceTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentRequestFormServiceTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'serviceTicket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messages' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'embedding' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } }
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
} as unknown as DocumentNode<PaymentRequestFormServiceTicketUpdateMutation, PaymentRequestFormServiceTicketUpdateMutationVariables>;
export const PaymentRequestFormViolationTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentRequestFormViolationTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messages' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'embedding' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } }
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
} as unknown as DocumentNode<PaymentRequestFormViolationTicketUpdateMutation, PaymentRequestFormViolationTicketUpdateMutationVariables>;
export const PaymentRequestPaymentInstrumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PaymentRequestPaymentInstruments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberPaymentInstruments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentInstruments' },
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } }
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
} as unknown as DocumentNode<PaymentRequestPaymentInstrumentsQuery, PaymentRequestPaymentInstrumentsQueryVariables>;
export const ChatMessagesContainerServiceTicketDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ChatMessagesContainerServiceTicket' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceTicketId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceTicketId' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'sentBy' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'embedding' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
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
} as unknown as DocumentNode<ChatMessagesContainerServiceTicketQuery, ChatMessagesContainerServiceTicketQueryVariables>;
export const ChatMessagesContainerViolationTicketDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ChatMessagesContainerViolationTicket' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'violationTicketId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicket' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'violationTicketId' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'sentBy' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'embedding' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
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
} as unknown as DocumentNode<ChatMessagesContainerViolationTicketQuery, ChatMessagesContainerViolationTicketQueryVariables>;
export const ChatMessagesContainerServiceTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChatMessagesContainerServiceTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'serviceTicket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messages' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'embedding' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sentBy' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } }
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
} as unknown as DocumentNode<ChatMessagesContainerServiceTicketUpdateMutation, ChatMessagesContainerServiceTicketUpdateMutationVariables>;
export const ChatMessagesContainerViolationTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChatMessagesContainerViolationTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'violationTicket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messages' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'embedding' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sentBy' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } }
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
} as unknown as DocumentNode<ChatMessagesContainerViolationTicketUpdateMutation, ChatMessagesContainerViolationTicketUpdateMutationVariables>;
export const SharedPaymentContainercybersourcePublicKeyIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedPaymentContainercybersourcePublicKeyId' },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'cybersourcePublicKeyId' } }] }
    }
  ]
} as unknown as DocumentNode<SharedPaymentContainercybersourcePublicKeyIdQuery, SharedPaymentContainercybersourcePublicKeyIdQueryVariables>;
export const MutationMemberAddPaymentInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MutationMemberAddPaymentInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddPaymentInstrumentInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberAddPaymentInstrument' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
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
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MutationMemberAddPaymentInstrumentMutation, MutationMemberAddPaymentInstrumentMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PropertyDetailsByPropertyIdFields' } }] }
          }
        ]
      }
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
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
} as unknown as DocumentNode<MemberPropertyByPropertyIdQuery, MemberPropertyByPropertyIdQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PropertyInformationFields' } }] }
          }
        ]
      }
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
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
} as unknown as DocumentNode<MemberPropertiesByCommunityIdQuery, MemberPropertiesByCommunityIdQueryVariables>;
export const MutationUpdatePaymentInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MutationUpdatePaymentInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdatePaymentInstrumentInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberUpdatePaymentInstrument' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
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
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MutationUpdatePaymentInstrumentMutation, MutationUpdatePaymentInstrumentMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberSiteNeighborsListContainerFields' } }] }
          }
        ]
      }
    },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalInformation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'identityDetails' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }] }
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
} as unknown as DocumentNode<MemberSiteNeighborsListContainerQuery, MemberSiteNeighborsListContainerQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertiesSearchInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesSearch' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberPropertiesListSearchContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
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
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } }
        ]
      }
    },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersPropertiesListSearchContainerPropertyResultFields' } }]
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updatedAt' },
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
                  name: { kind: 'Name', value: 'createdAt' },
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
                  name: { kind: 'Name', value: 'tags' },
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
    }
  ]
} as unknown as DocumentNode<MemberPropertiesListSearchContainerPropertiesQuery, MemberPropertiesListSearchContainerPropertiesQueryVariables>;
export const MemberPropertiesGetAllTagsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPropertiesGetAllTags' },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'getAllPropertyTags' } }] }
    }
  ]
} as unknown as DocumentNode<MemberPropertiesGetAllTagsQuery, MemberPropertiesGetAllTagsQueryVariables>;
export const MemberPropertiesListSearchContainerMapSasTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPropertiesListSearchContainerMapSasToken' },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'getMapSasToken' } }] }
    }
  ]
} as unknown as DocumentNode<MemberPropertiesListSearchContainerMapSasTokenQuery, MemberPropertiesListSearchContainerMapSasTokenQueryVariables>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByOwnerId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'ownerId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersPropertiesListContainerPropertyFields' } }] }
          }
        ]
      }
    },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersPropertiesListContainerPropertiesQuery, MembersPropertiesListContainerPropertiesQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerMemberFields' } }] }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerMembersQuery, MembersServiceTicketsCreateContainerMembersQueryVariables>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByOwnerId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'ownerId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerPropertiesQuery, MembersServiceTicketsCreateContainerPropertiesQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketCreateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketCreate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsCreateContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsCreateContainerServiceTicketCreateMutation, MembersServiceTicketsCreateContainerServiceTicketCreateMutationVariables>;
export const MembersServiceTicketsDetailContainerMembersAssignableToTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerMembersAssignableToTickets' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersAssignableToTickets' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerMemberFields' } }] }
          }
        ]
      }
    },
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByOwnerId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'ownerId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerPropertiesQuery, MembersServiceTicketsDetailContainerPropertiesQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicket' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    },
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
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerServiceTicketQuery, MembersServiceTicketsDetailContainerServiceTicketQueryVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerServiceTicketUpdateMutation, MembersServiceTicketsDetailContainerServiceTicketUpdateMutationVariables>;
export const MembersServiceTicketsDetailContainerServiceTicketChangeStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketChangeStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketChangeStatusInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketChangeStatus' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketAssignInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAssign' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerServiceAssignMutation, MembersServiceTicketsDetailContainerServiceAssignMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketAddUpdateActivityInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketAddUpdateActivity' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketsDetailContainerAddUpdateActivityMutation, MembersServiceTicketsDetailContainerAddUpdateActivityMutationVariables>;
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
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketDeleteInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketDelete' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketMutationResult' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsDetailContainerServiceTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersServiceTicketDetailContainerServiceTicketDeleteMutation, MembersServiceTicketDetailContainerServiceTicketDeleteMutationVariables>;
export const MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestor' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsOpenByRequestor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsListContainerServiceTicketsOpenByRequestorFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicket' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestor' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignedTo' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'memberName' } }] }
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
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQuery,
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorQueryVariables
>;
export const MemberServiceTicketsListContainerSearchServiceTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberServiceTicketsListContainerSearchServiceTickets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsSearchInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsSearch' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersServiceTicketsListContainerSearchServiceTicketsFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberServiceTicketsListContainerSearchServiceTicketsResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'communityId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedTo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestorId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'assignedToId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ticketType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersServiceTicketsListContainerSearchServiceTicketsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ServiceTicketsSearchResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'serviceTicketsResults' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberServiceTicketsListContainerSearchServiceTicketsResultFields' } }]
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
                  name: { kind: 'Name', value: 'requestor' },
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
                  name: { kind: 'Name', value: 'assignedTo' },
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
                  name: { kind: 'Name', value: 'status' },
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
                  name: { kind: 'Name', value: 'priority' },
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
                  name: { kind: 'Name', value: 'requestorId' },
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
                  name: { kind: 'Name', value: 'assignedToId' },
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
    }
  ]
} as unknown as DocumentNode<MemberServiceTicketsListContainerSearchServiceTicketsQuery, MemberServiceTicketsListContainerSearchServiceTicketsQueryVariables>;
export const MemberNameServiceTicketContainerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberNameServiceTicketContainer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersNameServiceTicketContainerFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersNameServiceTicketContainerFields' },
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
} as unknown as DocumentNode<MemberNameServiceTicketContainerQuery, MemberNameServiceTicketContainerQueryVariables>;
export const MemberTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberTransactions' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketPaymentTransactions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'transactionReferenceId' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberTransactionsQuery, MemberTransactionsQueryVariables>;
export const MembersViolationTicketsDetailContainerViolationTicketDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicket' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicket' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersViolationTicketsDetailContainerViolationTicketQuery, MembersViolationTicketsDetailContainerViolationTicketQueryVariables>;
export const MembersViolationTicketsDetailContainerPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesByOwnerId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'ownerId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerPropertyFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerPropertyFields' },
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
} as unknown as DocumentNode<MembersViolationTicketsDetailContainerPropertiesQuery, MembersViolationTicketsDetailContainerPropertiesQueryVariables>;
export const MembersViolationTicketsDetailContainerViolationTicketUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersViolationTicketsDetailContainerViolationTicketUpdateMutation,
  MembersViolationTicketsDetailContainerViolationTicketUpdateMutationVariables
>;
export const MembersViolationTicketsDetailContainerViolationTicketChangeStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketChangeStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketChangeStatusInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketChangeStatus' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersViolationTicketsDetailContainerViolationTicketChangeStatusMutation,
  MembersViolationTicketsDetailContainerViolationTicketChangeStatusMutationVariables
>;
export const MembersViolationTicketsDetailContainerViolationTicketAssignDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketAssign' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketAssignInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketAssign' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersViolationTicketsDetailContainerViolationTicketAssignMutation,
  MembersViolationTicketsDetailContainerViolationTicketAssignMutationVariables
>;
export const MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketAddUpdateActivityInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketAddUpdateActivity' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutation,
  MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityMutationVariables
>;
export const MembersViolationTicketsDetailContainerServiceTicketDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerServiceTicketDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketDeleteInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketDelete' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersViolationTicketsDetailContainerServiceTicketDeleteMutation, MembersViolationTicketsDetailContainerServiceTicketDeleteMutationVariables>;
export const MembersViolationTicketsDetailContainerViolationTicketProcessPaymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketProcessPayment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketProcessPaymentInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'violationTicketProcessPayment' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicket' } },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financeDetails' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'serviceFee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submission' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionReference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'referenceId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'completedOn' } }
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
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketMutationResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ViolationTicketMutationResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
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
            name: { kind: 'Name', value: 'violationTicket' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersViolationTicketsDetailContainerViolationTicketFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  MembersViolationTicketsDetailContainerViolationTicketProcessPaymentMutation,
  MembersViolationTicketsDetailContainerViolationTicketProcessPaymentMutationVariables
>;
export const MemberPaymentInstrumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberPaymentInstruments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberPaymentInstruments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentInstruments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'paymentInstrumentId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cardNumber' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cardType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isDefault' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expirationMonth' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expirationYear' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'billTo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingAddressLine1' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingAddressLine2' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingCity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingState' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingCountry' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingEmail' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingFirstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingLastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingPhone' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'billingPostalCode' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'success' } }
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
} as unknown as DocumentNode<MemberPaymentInstrumentsQuery, MemberPaymentInstrumentsQueryVariables>;
export const MemberDeletePaymentInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MemberDeletePaymentInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberDeletePaymentInstrument' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'paymentInstrumentId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberDeletePaymentInstrumentMutation, MemberDeletePaymentInstrumentMutationVariables>;
export const MemberSetDefaultPaymentInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MemberSetDefaultPaymentInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberSetDefaultPaymentInstrument' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'paymentInstrumentId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorMessage' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MemberSetDefaultPaymentInstrumentMutation, MemberSetDefaultPaymentInstrumentMutationVariables>;
export const MembersSectionLayoutMemberForCurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersSectionLayoutMemberForCurrentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MembersSectionLayoutMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MembersSectionLayoutMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'roleName' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MembersSectionLayoutMemberForCurrentUserQuery, MembersSectionLayoutMemberForCurrentUserQueryVariables>;
export const SharedMemberProfileDetailsContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' },
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
} as unknown as DocumentNode<SharedMemberProfileDetailsContainerMemberQuery, SharedMemberProfileDetailsContainerMemberQueryVariables>;
export const SharedMemberProfileDetailsContainerMemberProfileUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberProfileUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberProfileUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' },
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedMemberProfileDetailsContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedMemberProfileDetailsContainerMemberProfileUpdateMutation, SharedMemberProfileDetailsContainerMemberProfileUpdateMutationVariables>;
export const SharedMemberProfileContainerMemberForCurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedMemberProfileContainerMemberForCurrentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedMemberProfileContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedMemberProfileContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedMemberProfileContainerMemberForCurrentUserQuery, SharedMemberProfileContainerMemberForCurrentUserQueryVariables>;
export const SharedPhotoUploadContainerMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPhotoUploadContainerMemberQuery, SharedPhotoUploadContainerMemberQueryVariables>;
export const SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAvatarImageInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileAvatarCreateAuthHeader' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberAvatarImageAuthHeaderResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberAvatarImageAuthHeaderResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberAvatarImageAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerAuthHeaderFields' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutation,
  SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderMutationVariables
>;
export const SharedPhotoUploadContainerMemberProfileAvatarRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberProfileAvatarRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberProfileAvatarRemove' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'memberId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPhotoUploadContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPhotoUploadContainerMemberProfileAvatarRemoveMutation, SharedPhotoUploadContainerMemberProfileAvatarRemoveMutationVariables>;
export const SharedPropertiesDetailContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<SharedPropertiesDetailContainerPropertyQuery, SharedPropertiesDetailContainerPropertyQueryVariables>;
export const SharedPropertiesDetailContainerMembersByCommunityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerMembersByCommunity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByCommunityId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'communityId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'communityId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerMemberFields' },
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
} as unknown as DocumentNode<SharedPropertiesDetailContainerMembersByCommunityQuery, SharedPropertiesDetailContainerMembersByCommunityQueryVariables>;
export const SharedPropertiesDetailContainerPropertyUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesDetailContainerPropertyUpdateMutation, SharedPropertiesDetailContainerPropertyUpdateMutationVariables>;
export const SharedPropertiesDetailContainerPropertyDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyDeleteInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyDelete' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesDetailContainerPropertyFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesDetailContainerPropertyDeleteMutation, SharedPropertiesDetailContainerPropertyDeleteMutationVariables>;
export const SharedPropertiesFloorPlanUploadContainerPropertyFloorPlanImageCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyFloorPlanImageCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyFloorPlanImageCreateAuthHeader' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyBlobFileAuthHeaderResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'floorPlanImages' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyBlobFileAuthHeaderResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerAuthHeaderFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesFloorPlanUploadContainerPropertyFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  SharedPropertiesFloorPlanUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutation,
  SharedPropertiesFloorPlanUploadContainerPropertyFloorPlanImageCreateAuthHeaderMutationVariables
>;
export const SharedPropertiesListingImageListContainerPropertyListingImageRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyListingImageRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyRemoveImageInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyListingImageRemove' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyMutationResultFields' },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageListContainerPropertyFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  SharedPropertiesListingImageListContainerPropertyListingImageRemoveMutation,
  SharedPropertiesListingImageListContainerPropertyListingImageRemoveMutationVariables
>;
export const SharedPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeader' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyListingImageCreateAuthHeader' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyBlobFileAuthHeaderResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerAuthHeaderFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BlobAuthHeader' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authHeader' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blobPath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'requestDate' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indexTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metadataFields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listingDetail' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'images' } }] }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyBlobFileAuthHeaderResultFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyBlobFileAuthHeaderResult' } },
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
            name: { kind: 'Name', value: 'authHeader' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerAuthHeaderFields' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingImageUploadContainerPropertyFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  SharedPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutation,
  SharedPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderMutationVariables
>;
export const SharedPropertiesListingContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'bedDescriptions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roomName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
} as unknown as DocumentNode<SharedPropertiesListingContainerPropertyQuery, SharedPropertiesListingContainerPropertyQueryVariables>;
export const SharedPropertiesListingContainerPropertyUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'bedDescriptions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roomName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
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
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesListingContainerPropertyFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesListingContainerPropertyUpdateMutation, SharedPropertiesListingContainerPropertyUpdateMutationVariables>;
export const SharedPropertiesLocationContainerPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectID' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mapSASToken' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySecondarySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivisionName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countryTertiarySubdivision' } },
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
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } }] }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesLocationContainerPropertyQuery, SharedPropertiesLocationContainerPropertyQueryVariables>;
export const SharedPropertiesLocationContainerPropertyUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PropertyUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Property' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mapSASToken' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySecondarySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countrySubdivisionName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'countryTertiarySubdivision' } },
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
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } }] }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyMutationResultFields' },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedPropertiesLocationContainerPropertyPropertyFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedPropertiesLocationContainerPropertyUpdateMutation, SharedPropertiesLocationContainerPropertyUpdateMutationVariables>;
export const SharedSearchDrawerContainerMemberForCurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberForCurrentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customViews' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sortOrder' } },
                { kind: 'Field', name: { kind: 'Name', value: 'columnsToDisplay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedSearchDrawerContainerMemberForCurrentUserQuery, SharedSearchDrawerContainerMemberForCurrentUserQueryVariables>;
export const SharedSearchDrawerContainerMemberUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberUpdateInput' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberUpdate' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberMutationResultFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customViews' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sortOrder' } },
                { kind: 'Field', name: { kind: 'Name', value: 'columnsToDisplay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberMutationResultFields' },
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
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedSearchDrawerContainerMemberFields' } }] }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedSearchDrawerContainerMemberUpdateMutation, SharedSearchDrawerContainerMemberUpdateMutationVariables>;
export const StaffSectionLayoutContainerUserCurrentQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'StaffSectionLayoutContainerUserCurrentQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'staffUserCurrent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'StaffSectionLayoutContainerUserCurrentQueryFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StaffSectionLayoutContainerUserCurrentQueryFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'StaffUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'role' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'communityPermissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageStaffRolesAndPermissions' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canManageAllCommunities' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canDeleteCommunities' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canChangeCommunityOwner' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canReIndexSearchCollections' } }
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
      }
    }
  ]
} as unknown as DocumentNode<StaffSectionLayoutContainerUserCurrentQueryQuery, StaffSectionLayoutContainerUserCurrentQueryQueryVariables>;
export const SharedCommunitiesDropdownContainerMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SharedCommunitiesDropdownContainerMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userExternalId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'membersByUserExternalId' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'userExternalId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'userExternalId' } } }],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SharedCommunitiesDropdownContainerMembersFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SharedCommunitiesDropdownContainerMembersFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'memberName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'community' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SharedCommunitiesDropdownContainerMembersQuery, SharedCommunitiesDropdownContainerMembersQueryVariables>;
export const LoggedInUserRootContainerUserCurrentQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LoggedInUserRootContainerUserCurrentQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userCurrent' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' } }] }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'personalInformation' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identityDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoggedInUserRootContainerUserCurrentQueryQuery, LoggedInUserRootContainerUserCurrentQueryQueryVariables>;
export const LoggedInUserCommunityContainerUserCurrentQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LoggedInUserCommunityContainerUserCurrentQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userCurrent' },
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' } }] }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberForCurrentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profile' },
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'avatarDocumentId' } }] }
                },
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LoggedInUserContainerUserCurrentFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'personalInformation' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identityDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'restOfName' } }
                    ]
                  }
                }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoggedInUserCommunityContainerUserCurrentQueryQuery, LoggedInUserCommunityContainerUserCurrentQueryQueryVariables>;
