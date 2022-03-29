import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
  __typename?: "AdditionalAmenities";
  amenities?: Maybe<Array<Maybe<Scalars["String"]>>>;
  category?: Maybe<Scalars["String"]>;
};

export type Address = {
  __typename?: "Address";
  country?: Maybe<Scalars["String"]>;
  countryCode?: Maybe<Scalars["String"]>;
  countryCodeISO3?: Maybe<Scalars["String"]>;
  countrySecondarySubdivision?: Maybe<Scalars["String"]>;
  countrySubdivision?: Maybe<Scalars["String"]>;
  countrySubdivisionName?: Maybe<Scalars["String"]>;
  countryTertiarySubdivision?: Maybe<Scalars["String"]>;
  extendedPostalCode?: Maybe<Scalars["String"]>;
  freeformAddress?: Maybe<Scalars["String"]>;
  municipality?: Maybe<Scalars["String"]>;
  municipalitySubdivision?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  streetName?: Maybe<Scalars["String"]>;
  streetNumber?: Maybe<Scalars["String"]>;
};

export type BedroomDetails = {
  __typename?: "BedroomDetails";
  bedDescriptions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  roomName?: Maybe<Scalars["String"]>;
};

export type BlobAuthHeader = {
  __typename?: "BlobAuthHeader";
  authHeader?: Maybe<Scalars["String"]>;
  blobContainer?: Maybe<Scalars["String"]>;
  blobName?: Maybe<Scalars["String"]>;
  requestDate?: Maybe<Scalars["String"]>;
};

/**  Required to enable Apollo Cache Control  */
export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Community = MongoBase & {
  __typename?: "Community";
  createdAt?: Maybe<Scalars["DateTime"]>;
  domain?: Maybe<Scalars["String"]>;
  handle?: Maybe<Scalars["String"]>;
  id: Scalars["ObjectID"];
  name?: Maybe<Scalars["String"]>;
  publicContentBlobUrl?: Maybe<Scalars["String"]>;
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  whiteLabelDomain?: Maybe<Scalars["String"]>;
};

export type CommunityCreateInput = {
  name: Scalars["String"];
};

export type CommunityMutationResult = {
  __typename?: "CommunityMutationResult";
  community?: Maybe<Community>;
  status: MutationStatus;
};

export type CommunityPermissions = {
  __typename?: "CommunityPermissions";
  canEditOwnMemberAccounts: Scalars["Boolean"];
  canEditOwnMemberProfile: Scalars["Boolean"];
  canManageCommunitySettings: Scalars["Boolean"];
  canManageMembers: Scalars["Boolean"];
  canManageRolesAndPermissions: Scalars["Boolean"];
  canManageSiteContent: Scalars["Boolean"];
};

export type CommunityPermissionsInput = {
  canEditOwnMemberAccounts: Scalars["Boolean"];
  canEditOwnMemberProfile: Scalars["Boolean"];
  canManageCommunitySettings: Scalars["Boolean"];
  canManageMembers: Scalars["Boolean"];
  canManageRolesAndPermissions: Scalars["Boolean"];
  canManageSiteContent: Scalars["Boolean"];
};

export type CommunityPublicContentAuthHeaderResult = {
  __typename?: "CommunityPublicContentAuthHeaderResult";
  authHeader?: Maybe<BlobAuthHeader>;
  community?: Maybe<Community>;
  status: MutationStatus;
};

export type CommunityPublicContentInput = {
  communityId: Scalars["ObjectID"];
  contentLength?: InputMaybe<Scalars["Int"]>;
  contentType?: InputMaybe<Scalars["String"]>;
};

export type CommunityUpdateInput = {
  domain?: InputMaybe<Scalars["String"]>;
  handle?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  whiteLabelDomain?: InputMaybe<Scalars["String"]>;
};

export type ListingDetails = {
  __typename?: "ListingDetails";
  additionalAmenities?: Maybe<AdditionalAmenities>;
  amenities?: Maybe<Array<Maybe<Scalars["String"]>>>;
  bathrooms?: Maybe<Scalars["Float"]>;
  bedroomDetails?: Maybe<BedroomDetails>;
  bedrooms?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  floorPlan?: Maybe<Scalars["String"]>;
  floorPlanImages?: Maybe<Array<Maybe<Scalars["String"]>>>;
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
  lease?: Maybe<Scalars["Float"]>;
  listingAgent?: Maybe<Scalars["String"]>;
  listingAgentCompany?: Maybe<Scalars["String"]>;
  listingAgentCompanyAddress?: Maybe<Scalars["String"]>;
  listingAgentCompanyEmail?: Maybe<Scalars["String"]>;
  listingAgentCompanyPhone?: Maybe<Scalars["String"]>;
  listingAgentCompanyWebsite?: Maybe<Scalars["String"]>;
  listingAgentEmail?: Maybe<Scalars["String"]>;
  listingAgentPhone?: Maybe<Scalars["String"]>;
  listingAgentWebsite?: Maybe<Scalars["String"]>;
  maxGuests?: Maybe<Scalars["Int"]>;
  price?: Maybe<Scalars["Float"]>;
  rentHigh?: Maybe<Scalars["Float"]>;
  rentLow?: Maybe<Scalars["Float"]>;
  squareFeet?: Maybe<Scalars["Int"]>;
  video?: Maybe<Scalars["String"]>;
};

export type Location = MongoBase & {
  __typename?: "Location";
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ObjectID"];
  position?: Maybe<Point>;
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type Member = MongoBase & {
  __typename?: "Member";
  accounts?: Maybe<Array<Maybe<MemberAccount>>>;
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ObjectID"];
  memberName?: Maybe<Scalars["String"]>;
  profile?: Maybe<MemberProfile>;
  role?: Maybe<Role>;
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MemberAccount = MongoEmbeddedBase & {
  __typename?: "MemberAccount";
  createdAt?: Maybe<Scalars["DateTime"]>;
  createdBy?: Maybe<User>;
  firstName: Scalars["String"];
  id: Scalars["ObjectID"];
  lastName?: Maybe<Scalars["String"]>;
  statusCode?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user?: Maybe<User>;
};

export type MemberAccountAddInput = {
  account: MemberAccountCreateInput;
  memberId: Scalars["ObjectID"];
};

export type MemberAccountCreateInput = {
  firstName: Scalars["String"];
  lastName?: InputMaybe<Scalars["String"]>;
  user: Scalars["ObjectID"];
};

export type MemberAccountRemoveInput = {
  accountId: Scalars["ObjectID"];
  memberId: Scalars["ObjectID"];
};

export type MemberAvatarImageAuthHeaderResult = {
  __typename?: "MemberAvatarImageAuthHeaderResult";
  authHeader?: Maybe<BlobAuthHeader>;
  member?: Maybe<Member>;
  status: MutationStatus;
};

export type MemberAvatarImageInput = {
  contentLength?: InputMaybe<Scalars["Int"]>;
  contentType?: InputMaybe<Scalars["String"]>;
  memberId: Scalars["ObjectID"];
};

export type MemberCreateInput = {
  accounts: Array<InputMaybe<MemberAccountCreateInput>>;
  community: Scalars["ObjectID"];
  name: Scalars["String"];
  profile?: InputMaybe<MemberProfileInput>;
  role?: InputMaybe<Scalars["ObjectID"]>;
};

export type MemberMutationResult = MutationResult & {
  __typename?: "MemberMutationResult";
  member?: Maybe<Member>;
  status: MutationStatus;
};

export type MemberProfile = {
  __typename?: "MemberProfile";
  avatarDocumentId?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  interests?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name?: Maybe<Scalars["String"]>;
  showEmail?: Maybe<Scalars["Boolean"]>;
  showInterests?: Maybe<Scalars["Boolean"]>;
  showLocation?: Maybe<Scalars["Boolean"]>;
  showProfile?: Maybe<Scalars["Boolean"]>;
  showProperties?: Maybe<Scalars["Boolean"]>;
};

export type MemberProfileInput = {
  bio?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  interests?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  showEmail?: InputMaybe<Scalars["Boolean"]>;
  showInterests?: InputMaybe<Scalars["Boolean"]>;
  showLocation?: InputMaybe<Scalars["Boolean"]>;
  showProfile?: InputMaybe<Scalars["Boolean"]>;
  showProperties?: InputMaybe<Scalars["Boolean"]>;
};

export type MemberProfileUpdateInput = {
  memberId: Scalars["ObjectID"];
  profile?: InputMaybe<MemberProfileInput>;
};

export type MemberRoleReassignInput = {
  memberId: Scalars["ObjectID"];
  newRole: Scalars["ObjectID"];
};

export type MemberUpdateInput = {
  id: Scalars["ObjectID"];
  name?: InputMaybe<Scalars["String"]>;
};

/** Base type for all models in mongo. */
export type MongoBase = {
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** The ID of the object. */
  id: Scalars["ObjectID"];
  schemaVersion?: Maybe<Scalars["String"]>;
  /** Automatically generated timestamp, updated on every save. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

/** Base type for all models in mongo. */
export type MongoEmbeddedBase = {
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** The ID of the object. */
  id: Scalars["ObjectID"];
  /** Automatically generated timestamp, updated on every save. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type Mutation = {
  __typename?: "Mutation";
  /** IGNORE: Dummy field necessary for the Mutation type to be valid */
  _empty?: Maybe<Scalars["String"]>;
  communityCreate?: Maybe<CommunityMutationResult>;
  communityPublicContentCreateAuthHeader: CommunityPublicContentAuthHeaderResult;
  communityUpdate: CommunityMutationResult;
  memberAccountAdd: MemberMutationResult;
  memberAccountRemove: MemberMutationResult;
  memberCreate: MemberMutationResult;
  memberProfileAvatarCreateAuthHeader: MemberAvatarImageAuthHeaderResult;
  memberProfileAvatarRemove: MemberMutationResult;
  memberProfileUpdate: MemberMutationResult;
  memberRoleReassign: MemberMutationResult;
  memberUpdate: MemberMutationResult;
  propertyAdd: PropertyMutationResult;
  propertyAssignOwner: PropertyMutationResult;
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
  input: CommunityPublicContentInput;
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
  memberId: Scalars["ObjectID"];
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberProfileUpdateArgs = {
  input: MemberProfileUpdateInput;
};

/**  Base Mutation Type definition - all mutations will be defined in separate files extending this type  */
export type MutationMemberRoleReassignArgs = {
  input: MemberRoleReassignInput;
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
  __typename?: "MutationStatus";
  errorMessage?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type PermissionsInput = {
  communityPermissions: CommunityPermissionsInput;
  propertyPermissions: PropertyPermissionsInput;
  serviceTicketPermissions: ServiceTicketPermissionsInput;
};

export type Point = MongoBase & {
  __typename?: "Point";
  coordinates?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ObjectID"];
  schemaVersion?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type Property = MongoBase & {
  __typename?: "Property";
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ObjectID"];
  listedForLease: Scalars["Boolean"];
  listedForRent: Scalars["Boolean"];
  listedForSale: Scalars["Boolean"];
  listedInDirectory: Scalars["Boolean"];
  location?: Maybe<Location>;
  owner?: Maybe<Member>;
  propertyName: Scalars["String"];
  propertyType?: Maybe<Scalars["String"]>;
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type PropertyAddInput = {
  communityId: Scalars["ObjectID"];
  propertyName: Scalars["String"];
};

export type PropertyAssignOwnerInput = {
  id: Scalars["ObjectID"];
  ownerId: Scalars["ObjectID"];
};

export type PropertyMutationResult = {
  __typename?: "PropertyMutationResult";
  property?: Maybe<Property>;
  status: MutationStatus;
};

export type PropertyPermissions = {
  __typename?: "PropertyPermissions";
  canEditOwnProperty: Scalars["Boolean"];
  canManageProperties: Scalars["Boolean"];
};

export type PropertyPermissionsInput = {
  canEditOwnProperty: Scalars["Boolean"];
  canManageProperties: Scalars["Boolean"];
};

export type PropertyRemoveOwnerInput = {
  id: Scalars["ObjectID"];
};

export type PropertyUpdateInput = {
  id: Scalars["ObjectID"];
  listedForLease?: InputMaybe<Scalars["Boolean"]>;
  listedForRent?: InputMaybe<Scalars["Boolean"]>;
  listedForSale?: InputMaybe<Scalars["Boolean"]>;
  listedInDirectory?: InputMaybe<Scalars["Boolean"]>;
  propertyName?: InputMaybe<Scalars["String"]>;
  propertyType?: InputMaybe<Scalars["String"]>;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type Query = {
  __typename?: "Query";
  /** IGNORE: Dummy field necessary for the Query type to be valid */
  _empty?: Maybe<Scalars["String"]>;
  communities?: Maybe<Array<Maybe<Community>>>;
  communityByDomain?: Maybe<Community>;
  communityByHandle?: Maybe<Community>;
  communityById?: Maybe<Community>;
  currentUser?: Maybe<User>;
  member?: Maybe<Member>;
  memberForCurrentUser?: Maybe<Member>;
  membersByCommunityId?: Maybe<Array<Maybe<Member>>>;
  propertiesByCommunityId?: Maybe<Array<Maybe<Property>>>;
  rolesByCommunityId?: Maybe<Array<Maybe<Role>>>;
  serviceTicketsAssignedCurrentUser?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsClosedByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByCommunity?: Maybe<Array<Maybe<ServiceTicket>>>;
  serviceTicketsOpenByRequestor?: Maybe<Array<Maybe<ServiceTicket>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryCommunityByDomainArgs = {
  domain: Scalars["String"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryCommunityByHandleArgs = {
  handle: Scalars["String"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryCommunityByIdArgs = {
  id: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMemberArgs = {
  id: Scalars["ID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMemberForCurrentUserArgs = {
  communityId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryMembersByCommunityIdArgs = {
  communityId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryPropertiesByCommunityIdArgs = {
  communityId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryRolesByCommunityIdArgs = {
  communityId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsAssignedCurrentUserArgs = {
  communityId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsClosedByRequestorArgs = {
  propertyId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsOpenByCommunityArgs = {
  communityId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryServiceTicketsOpenByRequestorArgs = {
  propertyId: Scalars["ObjectID"];
};

/**  Base Query Type definition - , all mutations will be defined in separate files extending this type  */
export type QueryUserArgs = {
  id: Scalars["ObjectID"];
};

export type Role = MongoBase & {
  __typename?: "Role";
  community?: Maybe<Community>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ObjectID"];
  isDefault: Scalars["Boolean"];
  permissions: RolePermissions;
  roleName: Scalars["String"];
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RoleAddInput = {
  communityId: Scalars["ObjectID"];
  permissions: PermissionsInput;
  roleName: Scalars["String"];
};

export type RoleDeleteAndReassignInput = {
  roleToDelete: Scalars["ObjectID"];
  roleToReassignTo: Scalars["ObjectID"];
};

export type RoleMutationResult = {
  __typename?: "RoleMutationResult";
  role?: Maybe<Role>;
  status: MutationStatus;
};

export type RolePermissions = {
  __typename?: "RolePermissions";
  communityPermissions: CommunityPermissions;
  propertyPermissions: PropertyPermissions;
  serviceTicketPermissions: ServiceTicketPermissions;
};

export type RoleUpdateInput = {
  id: Scalars["ObjectID"];
  isDefault: Scalars["Boolean"];
  permissions: PermissionsInput;
  roleName: Scalars["String"];
};

export type ServiceTicket = MongoBase & {
  __typename?: "ServiceTicket";
  activityLog?: Maybe<Array<Maybe<ServiceTicketActivityDetail>>>;
  assignedTo?: Maybe<Member>;
  community: Community;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ObjectID"];
  priority: Scalars["Int"];
  property?: Maybe<Property>;
  requestor: Property;
  schemaVersion?: Maybe<Scalars["String"]>;
  status: Scalars["String"];
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceTicketActivityDetail = MongoEmbeddedBase & {
  __typename?: "ServiceTicketActivityDetail";
  activityBy: Member;
  activityDescription: Scalars["String"];
  activityType: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ObjectID"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceTicketAddPhotoInput = {
  contentLength: Scalars["String"];
  contentType: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  serviceTicketId: Scalars["ObjectID"];
};

export type ServiceTicketAddUpdateActivityInput = {
  activityDescription: Scalars["String"];
  activityType: Scalars["String"];
  serviceTicketId: Scalars["ObjectID"];
};

export type ServiceTicketAssignInput = {
  assignedToId: Scalars["ObjectID"];
  serviceTicketId: Scalars["ObjectID"];
};

export type ServiceTicketChangeStatusInput = {
  serviceTicketId: Scalars["ObjectID"];
  status: Scalars["String"];
};

export type ServiceTicketCreateInput = {
  communityId: Scalars["ObjectID"];
  propertyId?: InputMaybe<Scalars["ObjectID"]>;
  requestorId: Scalars["ObjectID"];
  title: Scalars["String"];
};

export type ServiceTicketMutationResult = MutationResult & {
  __typename?: "ServiceTicketMutationResult";
  serviceTicket?: Maybe<ServiceTicket>;
  status: MutationStatus;
};

export type ServiceTicketPermissions = {
  __typename?: "ServiceTicketPermissions";
  canAssignTickets: Scalars["Boolean"];
  canCreateTickets: Scalars["Boolean"];
  canManageTickets: Scalars["Boolean"];
  canWorkOnTickets: Scalars["Boolean"];
};

export type ServiceTicketPermissionsInput = {
  canAssignTickets: Scalars["Boolean"];
  canCreateTickets: Scalars["Boolean"];
  canManageTickets: Scalars["Boolean"];
  canWorkOnTickets: Scalars["Boolean"];
};

export type ServiceTicketPhoto = MongoEmbeddedBase & {
  __typename?: "ServiceTicketPhoto";
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  documentId: Scalars["String"];
  id: Scalars["ObjectID"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceTicketPhotoAuthHeaderResult = MutationResult & {
  __typename?: "ServiceTicketPhotoAuthHeaderResult";
  authHeader?: Maybe<BlobAuthHeader>;
  serviceTicket?: Maybe<ServiceTicket>;
  status: MutationStatus;
};

export type ServiceTicketRemovePhotoInput = {
  photoId: Scalars["ObjectID"];
  serviceTicketId: Scalars["ObjectID"];
};

export type ServiceTicketSubmitInput = {
  serviceTicketId: Scalars["ObjectID"];
};

export type ServiceTicketUpdateInput = {
  description: Scalars["String"];
  priority: Scalars["Int"];
  propertyId?: InputMaybe<Scalars["ObjectID"]>;
  serviceTicketId: Scalars["ObjectID"];
  title: Scalars["String"];
};

export type User = MongoBase & {
  __typename?: "User";
  createdAt?: Maybe<Scalars["DateTime"]>;
  email?: Maybe<Scalars["EmailAddress"]>;
  externalId?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ObjectID"];
  lastName?: Maybe<Scalars["String"]>;
  schemaVersion?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UserMutationResult = MutationResult & {
  __typename?: "UserMutationResult";
  status: MutationStatus;
  user?: Maybe<User>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id: Scalars["ObjectID"];
  lastName?: InputMaybe<Scalars["String"]>;
};

export type CommunityCreateContainerMutationCommunityCreateMutationVariables =
  Exact<{
    input: CommunityCreateInput;
  }>;

export type CommunityCreateContainerMutationCommunityCreateMutation = {
  __typename?: "Mutation";
  communityCreate?: {
    __typename?: "CommunityMutationResult";
    status: {
      __typename?: "MutationStatus";
      success: boolean;
      errorMessage?: string | null;
    };
    community?: {
      __typename?: "Community";
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
  __typename?: "CommunityMutationResult";
  status: {
    __typename?: "MutationStatus";
    success: boolean;
    errorMessage?: string | null;
  };
  community?: {
    __typename?: "Community";
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

export type CommunityListContainerCommunitiesQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CommunityListContainerCommunitiesQueryQuery = {
  __typename?: "Query";
  communities?: Array<{
    __typename?: "Community";
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
  __typename?: "Community";
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

export type AdminCommunityMenuContainerCommunitiesQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminCommunityMenuContainerCommunitiesQueryQuery = {
  __typename?: "Query";
  communities?: Array<{
    __typename?: "Community";
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
  __typename?: "Community";
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

export type AdminMembersDetailContainerMemberQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AdminMembersDetailContainerMemberQuery = {
  __typename?: "Query";
  member?: {
    __typename?: "Member";
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: "Role"; id: any; roleName: string } | null;
  } | null;
};

export type AdminMembersDetailContainerMemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
}>;

export type AdminMembersDetailContainerMemberUpdateMutation = {
  __typename?: "Mutation";
  memberUpdate: {
    __typename?: "MemberMutationResult";
    status: {
      __typename?: "MutationStatus";
      success: boolean;
      errorMessage?: string | null;
    };
    member?: {
      __typename?: "Member";
      memberName?: string | null;
      id: any;
      createdAt?: any | null;
      updatedAt?: any | null;
      role?: { __typename?: "Role"; id: any; roleName: string } | null;
    } | null;
  };
};

export type AdminMembersDetailContainerMutationFieldsFragment = {
  __typename?: "MemberMutationResult";
  status: {
    __typename?: "MutationStatus";
    success: boolean;
    errorMessage?: string | null;
  };
  member?: {
    __typename?: "Member";
    memberName?: string | null;
    id: any;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: "Role"; id: any; roleName: string } | null;
  } | null;
};

export type AdminMembersDetailContainerMemberFieldsFragment = {
  __typename?: "Member";
  memberName?: string | null;
  id: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  role?: { __typename?: "Role"; id: any; roleName: string } | null;
};

export type AdminMembersListContainerMembersByCommunityIdQueryVariables =
  Exact<{
    communityId: Scalars["ObjectID"];
  }>;

export type AdminMembersListContainerMembersByCommunityIdQuery = {
  __typename?: "Query";
  membersByCommunityId?: Array<{
    __typename?: "Member";
    id: any;
    memberName?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    role?: { __typename?: "Role"; roleName: string } | null;
  } | null> | null;
};

export type AdminMembersListContainerMembersByCommunityIdFieldsFragment = {
  __typename?: "Member";
  id: any;
  memberName?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  role?: { __typename?: "Role"; roleName: string } | null;
};

export type LoggedInUserContainerCurrentUserQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type LoggedInUserContainerCurrentUserQueryQuery = {
  __typename?: "Query";
  currentUser?: {
    __typename?: "User";
    id: any;
    externalId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

export type LoggedInUserContainerCurrentUserFieldsFragment = {
  __typename?: "User";
  id: any;
  externalId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export type UserListItemFieldsFragment = {
  __typename?: "User";
  id: any;
  firstName?: string | null;
  lastName?: string | null;
};

export type UserListGetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type UserListGetUsersQuery = {
  __typename?: "Query";
  users?: Array<{
    __typename?: "User";
    id: any;
    firstName?: string | null;
    lastName?: string | null;
  } | null> | null;
};

export type UserListGetUsersFieldsFragment = { __typename?: "User"; id: any };

export const CommunityCreateContainerMutationCommunityCreateFieldsFragmentDoc =
  {
    kind: "Document",
    definitions: [
      {
        kind: "FragmentDefinition",
        name: {
          kind: "Name",
          value: "CommunityCreateContainerMutationCommunityCreateFields",
        },
        typeCondition: {
          kind: "NamedType",
          name: { kind: "Name", value: "CommunityMutationResult" },
        },
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: { kind: "Name", value: "status" },
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  { kind: "Field", name: { kind: "Name", value: "success" } },
                  {
                    kind: "Field",
                    name: { kind: "Name", value: "errorMessage" },
                  },
                ],
              },
            },
            {
              kind: "Field",
              name: { kind: "Name", value: "community" },
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  { kind: "Field", name: { kind: "Name", value: "name" } },
                  { kind: "Field", name: { kind: "Name", value: "domain" } },
                  {
                    kind: "Field",
                    name: { kind: "Name", value: "whiteLabelDomain" },
                  },
                  { kind: "Field", name: { kind: "Name", value: "handle" } },
                  {
                    kind: "Field",
                    name: { kind: "Name", value: "publicContentBlobUrl" },
                  },
                  { kind: "Field", name: { kind: "Name", value: "id" } },
                  {
                    kind: "Field",
                    name: { kind: "Name", value: "schemaVersion" },
                  },
                  { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                  { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                ],
              },
            },
          ],
        },
      },
    ],
  } as unknown as DocumentNode<
    CommunityCreateContainerMutationCommunityCreateFieldsFragment,
    unknown
  >;
export const CommunityListContainerCommunitiesFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CommunityListContainerCommunitiesFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Community" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "domain" } },
          { kind: "Field", name: { kind: "Name", value: "whiteLabelDomain" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "publicContentBlobUrl" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "schemaVersion" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CommunityListContainerCommunitiesFieldsFragment,
  unknown
>;
export const AdminCommunityMenuContainerCommunitiesFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: {
        kind: "Name",
        value: "AdminCommunityMenuContainerCommunitiesFields",
      },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Community" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "domain" } },
          { kind: "Field", name: { kind: "Name", value: "whiteLabelDomain" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "publicContentBlobUrl" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "schemaVersion" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminCommunityMenuContainerCommunitiesFieldsFragment,
  unknown
>;
export const AdminMembersDetailContainerMemberFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminMembersDetailContainerMemberFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Member" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "memberName" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "role" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "roleName" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminMembersDetailContainerMemberFieldsFragment,
  unknown
>;
export const AdminMembersDetailContainerMutationFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: {
        kind: "Name",
        value: "AdminMembersDetailContainerMutationFields",
      },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MemberMutationResult" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "status" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errorMessage" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "member" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "AdminMembersDetailContainerMemberFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdminMembersDetailContainerMemberFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AdminMembersDetailContainerMutationFieldsFragment,
  unknown
>;
export const AdminMembersListContainerMembersByCommunityIdFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: {
        kind: "Name",
        value: "AdminMembersListContainerMembersByCommunityIdFields",
      },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Member" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "memberName" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "role" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "roleName" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminMembersListContainerMembersByCommunityIdFieldsFragment,
  unknown
>;
export const LoggedInUserContainerCurrentUserFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LoggedInUserContainerCurrentUserFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "externalId" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LoggedInUserContainerCurrentUserFieldsFragment,
  unknown
>;
export const UserListItemFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserListItemFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserListItemFieldsFragment, unknown>;
export const UserListGetUsersFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserListGetUsersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
      },
    },
  ],
} as unknown as DocumentNode<UserListGetUsersFieldsFragment, unknown>;
export const CommunityCreateContainerMutationCommunityCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "CommunityCreateContainerMutationCommunityCreate",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CommunityCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "communityCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value:
                      "CommunityCreateContainerMutationCommunityCreateFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...CommunityCreateContainerMutationCommunityCreateFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  CommunityCreateContainerMutationCommunityCreateMutation,
  CommunityCreateContainerMutationCommunityCreateMutationVariables
>;
export const CommunityListContainerCommunitiesQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CommunityListContainerCommunitiesQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "communities" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "CommunityListContainerCommunitiesFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...CommunityListContainerCommunitiesFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  CommunityListContainerCommunitiesQueryQuery,
  CommunityListContainerCommunitiesQueryQueryVariables
>;
export const AdminCommunityMenuContainerCommunitiesQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: {
        kind: "Name",
        value: "AdminCommunityMenuContainerCommunitiesQuery",
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "communities" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "AdminCommunityMenuContainerCommunitiesFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdminCommunityMenuContainerCommunitiesFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AdminCommunityMenuContainerCommunitiesQueryQuery,
  AdminCommunityMenuContainerCommunitiesQueryQueryVariables
>;
export const AdminMembersDetailContainerMemberDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminMembersDetailContainerMember" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "member" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "AdminMembersDetailContainerMemberFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdminMembersDetailContainerMemberFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AdminMembersDetailContainerMemberQuery,
  AdminMembersDetailContainerMemberQueryVariables
>;
export const AdminMembersDetailContainerMemberUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AdminMembersDetailContainerMemberUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "MemberUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "memberUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "AdminMembersDetailContainerMutationFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdminMembersDetailContainerMutationFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AdminMembersDetailContainerMemberUpdateMutation,
  AdminMembersDetailContainerMemberUpdateMutationVariables
>;
export const AdminMembersListContainerMembersByCommunityIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: {
        kind: "Name",
        value: "AdminMembersListContainerMembersByCommunityId",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "communityId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ObjectID" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "membersByCommunityId" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "communityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "communityId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value:
                      "AdminMembersListContainerMembersByCommunityIdFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...AdminMembersListContainerMembersByCommunityIdFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AdminMembersListContainerMembersByCommunityIdQuery,
  AdminMembersListContainerMembersByCommunityIdQueryVariables
>;
export const LoggedInUserContainerCurrentUserQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LoggedInUserContainerCurrentUserQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "LoggedInUserContainerCurrentUserFields",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...LoggedInUserContainerCurrentUserFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  LoggedInUserContainerCurrentUserQueryQuery,
  LoggedInUserContainerCurrentUserQueryQueryVariables
>;
export const UserListGetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserListGetUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "UserListItemFields" },
                },
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "UserListGetUsersFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserListItemFieldsFragmentDoc.definitions,
    ...UserListGetUsersFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UserListGetUsersQuery,
  UserListGetUsersQueryVariables
>;
