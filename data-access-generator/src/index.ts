import { ModelSchemaInputStructure, SchemaTypeEnum } from "./common";
import { DataAccessPainKiller } from "./step-2-data-access-pain-killer";
import { GenerateGraphQLSchema } from "./step-3-export-to-graphql";
import { ExtractFullAggregateRootInputStructure } from "./step-1-raw-input-interface-model-to-tool-input-helpers";
import { rawInputApplicantUser } from "./raw-inputs/raw-input-applicant-user";
import { rawInputEntity } from "./raw-inputs/raw-input-entity";
import { rawInputIdentityCase } from "./raw-inputs/raw-input-identity-case";
import { rawInputStaffUser } from "./raw-inputs/raw-input-staff-user";

const StaffUserAggregateRootInputStructure: ModelSchemaInputStructure = {
  name: "StaffUser",
  fields: [
    {
      name: "firstName",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "lastName",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "accessBlocked",
      type: "boolean",
      isRequired: true,
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "tags",
      type: "string[]",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "search",
      type: "Search",
      schemaType: SchemaTypeEnum.NestedPath,
    },
    {
      name: "displayName",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "community",
      type: "Community",
      schemaType: SchemaTypeEnum.PopulatedDoc,
    },
    {
      name: "role",
      type: "EndUserRole",
      schemaType: SchemaTypeEnum.PopulatedDoc,
    },
  ],
};

const MemberAggregateRootInputStructure: ModelSchemaInputStructure = {
  name: "Member",
  fields: [
    {
      name: "memberName",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "community",
      type: "Community",
      schemaType: SchemaTypeEnum.PopulatedDoc,
    },
    {
      name: "accounts",
      type: "Account",
      isRequired: true,
      schemaType: SchemaTypeEnum.DocumentArray,
    },
    {
      name: "cybersourceCustomerId",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "customViews",
      type: "CustomView",
      schemaType: SchemaTypeEnum.DocumentArray,
    },
    {
      name: "role",
      type: "EndUserRole",
      schemaType: SchemaTypeEnum.PopulatedDoc,
    },
    {
      name: "profile",
      type: "Profile",
      schemaType: SchemaTypeEnum.NestedPath,
    },
  ],
};

const ServiceTicketAggregateRootInputStructure: ModelSchemaInputStructure = {
  name: "ServiceTicket",
  version: "1",
  fields: [
    {
      name: "community",
      type: "Community",
      schemaType: SchemaTypeEnum.PopulatedDoc,
    },
    {
      name: "property",
      type: "Property",
      schemaType: SchemaTypeEnum.PopulatedDoc,
      isRequired: false,
    },
    {
      name: "requestor",
      type: "Member",
      schemaType: SchemaTypeEnum.PopulatedDoc,
    },
    {
      name: "assignedTo",
      type: "Member",
      schemaType: SchemaTypeEnum.PopulatedDoc,
      isRequired: false,
    },
    {
      name: "service",
      type: "Service",
      schemaType: SchemaTypeEnum.PopulatedDoc,
      isRequired: false,
    },
    {
      name: "title",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "description",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "status",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },

    {
      name: "ticketType",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
      isRequired: false,
    },
    {
      name: "priority",
      type: "number",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "activityLog",
      type: "ServiceTicketActivityDetail",
      schemaType: SchemaTypeEnum.DocumentArray,
    },
    {
      name: "revisionRequest",
      type: "ServiceTicketRevisionRequest",
      schemaType: SchemaTypeEnum.NestedPath,
      isRequired: false,
    },
    {
      name: "messages",
      type: "ServiceTicketMessage",
      schemaType: SchemaTypeEnum.DocumentArray,
    },
    {
      name: "photos",
      type: "ServiceTicketPhoto",
      schemaType: SchemaTypeEnum.DocumentArray,
    },
    {
      name: "hash",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "lastIndexed",
      type: "Date",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "updateIndexFailedDate",
      type: "Date",
      schemaType: SchemaTypeEnum.Primitive,
    },
  ],

  // Nested Paths
  nestedPaths: [
    {
      name: "ServiceTicketRevisionRequest",
      fields: [
        {
          name: "requestedAt",
          type: "Date",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "requestedBy",
          type: "Member",
          schemaType: SchemaTypeEnum.PopulatedDoc,
        },
        {
          name: "revisionSummary",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "requestedChanges",
          type: "ServiceTicketRevisionRequestChanges",
          schemaType: SchemaTypeEnum.NestedPath,
        },
        {
          name: "revisionSubmittedAt",
          type: "Date",
          schemaType: SchemaTypeEnum.Primitive,
          isRequired: false,
        },
      ],
    },
    {
      name: "ServiceTicketRevisionRequestChanges",
      fields: [
        {
          name: "requestUpdatedAssignment",
          type: "boolean",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "requestUpdatedStatus",
          type: "boolean",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "requestUpdatedProperty",
          type: "boolean",
          schemaType: SchemaTypeEnum.Primitive,
        },
      ],
    },
  ],
  // Subdocument Bases
  subdocumentBases: [
    {
      name: "ServiceTicketMessage",
      fields: [
        {
          name: "sentBy",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "initiatedBy",
          type: "Member",
          schemaType: SchemaTypeEnum.PopulatedDoc,
          isRequired: false,
        },
        {
          name: "message",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "embedding",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
          isRequired: false,
        },
        {
          name: "createdAt",
          type: "Date",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "isHiddenFromApplicant",
          type: "boolean",
          schemaType: SchemaTypeEnum.Primitive,
        },
      ],
    },
    {
      name: "ServiceTicketPhoto",
      fields: [
        {
          name: "documentId",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "description",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
        },
      ],
    },
  ],
};

const StaffUserInputStructure: ModelSchemaInputStructure = {
  name: "StaffUser",
  fields: [
    {
      name: "firstName",
      type: "string",
      isRequired: false,
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "lastName",
      type: "string",
      isRequired: false,
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "emailAddress",
      type: "string",
      isRequired: false,
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "accessBlocked",
      type: "boolean",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "tags",
      type: "string[]",
      isRequired: false,
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "search",
      type: "Search",
      isRequired: false,
      schemaType: SchemaTypeEnum.NestedPath,
    },
    {
      name: "displayName",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },

    {
      name: "userType",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "schemaVersion",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
    {
      name: "externalId",
      type: "string",
      schemaType: SchemaTypeEnum.Primitive,
    },
  ],
  nestedPaths: [
    {
      name: "Search",
      fields: [
        {
          name: "hash",
          type: "string",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "indexedAt",
          type: "Date",
          schemaType: SchemaTypeEnum.Primitive,
        },
        {
          name: "indexingFailedAt",
          type: "Date",
          schemaType: SchemaTypeEnum.Primitive,
          isRequired: false,
        },
      ],
    },
  ],
};
const serviceTicketSchema: ModelSchemaInputStructure = {
  name: "ServiceTicket",
  fields: [
    { name: "community", type: "Community", schemaType: SchemaTypeEnum.PopulatedDoc },
    { name: "property", type: "Property", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
    { name: "requestor", type: "Member", schemaType: SchemaTypeEnum.PopulatedDoc },
    { name: "assignedTo", type: "Member", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
    { name: "service", type: "Service", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
    { name: "title", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "description", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "status", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "priority", type: "number", schemaType: SchemaTypeEnum.Primitive },
    { name: "ticketType", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "activityLog", type: "ActivityDetail", schemaType: SchemaTypeEnum.DocumentArray },
    { name: "revisionRequest", type: "ServiceTicketRevisionRequest", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
    { name: "messages", type: "ServiceTicketMessage", schemaType: SchemaTypeEnum.DocumentArray },
    { name: "photos", type: "Photo", schemaType: SchemaTypeEnum.DocumentArray },
    { name: "hash", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "lastIndexed", type: "Date", schemaType: SchemaTypeEnum.Primitive },
    { name: "updateIndexFailedDate", type: "Date", schemaType: SchemaTypeEnum.Primitive },
  ],
};

const staffUserSchema: ModelSchemaInputStructure = {
  name: "StaffUser",
  fields: [
    { name: "firstName", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "lastName", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "emailAddress", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "accessBlocked", type: "boolean", schemaType: SchemaTypeEnum.Primitive },
    { name: "tags", type: "string[]", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "search", type: "StaffUserSearch", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
    { name: "displayName", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "userType", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "schemaVersion", type: "string", schemaType: SchemaTypeEnum.Primitive },
    { name: "externalId", type: "string", schemaType: SchemaTypeEnum.Primitive },
  ],
  nestedPaths: [
    {
      name: "StaffUserSearch",
      fields: [
        { name: "hash", type: "string", schemaType: SchemaTypeEnum.Primitive },
        { name: "indexedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive },
        { name: "indexingFailedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
  ],
  subdocumentBases: [],
};

const modelSchemaInputStructure: ModelSchemaInputStructure = {
  name: "IdentityVerificationCase",
  fields: [
    { name: "caseDetails", type: "IdentityVerificationCaseCaseDetails", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
    { name: "revisionRequest", type: "IdentityVerificationCaseRevisionRequest", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
    { name: "caseHistory", type: "IdentityVerificationCaseCaseHistory", schemaType: SchemaTypeEnum.DocumentArray, isRequired: false },
    { name: "assets", type: "IdentityVerificationCaseAssets", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
    { name: "messages", type: "IdentityVerificationCaseMessage", schemaType: SchemaTypeEnum.DocumentArray, isRequired: false },
    { name: "financeDetails", type: "IdentityVerificationCaseFinanceDetails", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
    { name: "activityLog", type: "IdentityVerificationCaseActivityLog", schemaType: SchemaTypeEnum.DocumentArray, isRequired: false },
    { name: "applicant", type: "ApplicantUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
    { name: "submittedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "purgeEligibleAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "expirationEligibleAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "caseType", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "state", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
    { name: "caseName", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
    { name: "systemTags", type: "string[]", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "tags", type: "string[]", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
    { name: "caseFlagged", type: "IdentityVerificationCaseCaseFlagged", schemaType: SchemaTypeEnum.DocumentArray, isRequired: false },
    { name: "search", type: "IdentityVerificationCaseSearch", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
  ],
  nestedPaths: [
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationPhotoAssets",
      fields: [
        { name: "photo", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "photoUploadedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "photoVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationPassportDetails",
      fields: [
        { name: "passportCountry", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "passportNumber", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "passportIssueDate", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "passportExpirationDate", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "isPassportExpirationDateVisible", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "isPassportInLatinCharacters", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationPassportAssets",
      fields: [
        { name: "passport", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportUploadedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportExpiration", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportExpirationUploadedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportExpirationVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportTranslation", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportTranslationUploadedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "passportTranslationVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationNotarizationDetails",
      fields: [{ name: "isNotarizationComplete", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false }],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplication",
      fields: [
        { name: "attestedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "photoAssets",
          type: "IdentifyVerificationCaseCaseDetailsApplicationPhotoAssets",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        { name: "caseWorkedModifiedPassportDetails", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "passportDetails",
          type: "IdentityVerificationCaseCaseDetailsApplicationPassportDetails",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "passportAssets",
          type: "IdentityVerificationCaseCaseDetailsApplicationPassportAssets",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "notarizationDetails",
          type: "IdentityVerificationCaseCaseDetailsApplicationNotarizationDetails",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAudit",
      fields: [
        { name: "completedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
        { name: "result", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmations",
      fields: [
        { name: "isNotaryAcceptable", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "isNotarizedIdAcceptable", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "audit",
          type: "IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAudit",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAudit",
      fields: [
        { name: "completedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
        { name: "result", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationReviewAffirmations",
      fields: [
        { name: "isIdDocumentAcceptable", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "isIdDocumentDetailsAcceptable", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "isPhotoAcceptable", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "audit",
          type: "IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAudit",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsApplicationReview",
      fields: [
        { name: "caseWorkerAssigned", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
        {
          name: "affirmations",
          type: "IdentityVerificationCaseCaseDetailsApplicationReviewAffirmations",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "notaryAffirmations",
          type: "IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmations",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetailsDecision",
      fields: [
        { name: "completedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
        { name: "result", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "rejectionReason", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseDetails",
      fields: [
        { name: "application", type: "IdentityVerificationCaseCaseDetailsApplication", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
        {
          name: "applicationReview",
          type: "IdentityVerificationCaseCaseDetailsApplicationReview",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        { name: "decision", type: "IdentityVerificationCaseCaseDetailsDecision", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
        { name: "createdAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseRevisionRequestRequestedChanges",
      fields: [
        { name: "requestUpdatedPassportDetails", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestUploadPassport", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestUploadExpirationPage", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestUploadPassportTranslation", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestUploadPhoto", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseRevisionRequest",
      fields: [
        { name: "requestedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
        { name: "revisionSummary", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        {
          name: "requestedChanges",
          type: "IdentityVerificationCaseRevisionRequestRequestedChanges",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: true,
        },
        { name: "revisionSubmittedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory",
      fields: [
        { name: "assetVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "assetUploadedBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsPrivate",
      fields: [
        { name: "redactedNotarizedIdForm", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "redactedNotarizedIdFormHistory",
          type: "IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory",
          schemaType: SchemaTypeEnum.DocumentArray,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory",
      fields: [
        { name: "assetVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "assetUploadedBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsSharedIdFormHistory",
      fields: [
        { name: "assetVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "assetUploadedBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsShared",
      fields: [
        { name: "idForm", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "idFormHistory",
          type: "IdentityVerificationCaseAssetsSharedIdFormHistory",
          schemaType: SchemaTypeEnum.DocumentArray,
          isRequired: false,
        },
        { name: "notarizedIdForm", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        {
          name: "notarizedIdFormHistory",
          type: "IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory",
          schemaType: SchemaTypeEnum.DocumentArray,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseMessage",
      fields: [
        { name: "sentBy", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "initiatedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
        { name: "message", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "embedding", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "isHiddenFromApplicant", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReference",
      fields: [
        { name: "debitGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "creditGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReference",
      fields: [
        { name: "vendor", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "referenceId", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApproval",
      fields: [
        { name: "isApplicantApprovalRequired", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "isApplicantApproved", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "applicantRespondedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction",
      fields: [
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
        { name: "reason", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        {
          name: "approval",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApproval",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "transactionReference",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReference",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "financeReference",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReference",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: true,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReference",
      fields: [
        { name: "vendor", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "referenceId", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsSubmission",
      fields: [
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        {
          name: "transactionReference",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReference",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: true,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactions",
      fields: [
        {
          name: "submission",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsSubmission",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "adhocTransactions",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction",
          schemaType: SchemaTypeEnum.DocumentArray,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmission",
      fields: [
        { name: "debitGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "creditGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "recognitionDate", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognition",
      fields: [
        { name: "debitGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "creditGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "recognitionDate", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsRevenueRecognition",
      fields: [
        {
          name: "submission",
          type: "IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmission",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "recognition",
          type: "IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognition",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetails",
      fields: [
        { name: "serviceFee", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        {
          name: "revenueRecognition",
          type: "IdentityVerificationCaseFinanceDetailsRevenueRecognition",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: true,
        },
        {
          name: "transactions",
          type: "IdentityVerificationCaseFinanceDetailsTransactions",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseActivityLog",
      fields: [
        { name: "activityType", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "activityBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
        { name: "description", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "metaData", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "tags", type: "string[]", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseCaseFlagged",
      fields: [
        { name: "flagType", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "reason", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseSearch",
      fields: [
        { name: "hash", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "indexedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "indexingFailedAt", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
      ],
    },
  ],
  subdocumentBases: [
    {
      name: "IdentityVerificationCaseCaseHistory",
      fields: [
        { name: "caseDetails", type: "IdentityVerificationCaseCaseDetails", schemaType: SchemaTypeEnum.NestedPath, isRequired: true },
        { name: "revisionRequest", type: "IdentityVerificationCaseRevisionRequest", schemaType: SchemaTypeEnum.NestedPath, isRequired: false },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory",
      fields: [
        { name: "assetVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "assetUploadedBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory",
      fields: [
        { name: "assetVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "assetUploadedBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseAssetsSharedIdFormHistory",
      fields: [
        { name: "assetVersion", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "assetUploadedBy", type: "User", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseMessage",
      fields: [
        { name: "sentBy", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "initiatedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: false },
        { name: "message", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "embedding", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "isHiddenFromApplicant", type: "boolean", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction",
      fields: [
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "requestedBy", type: "StaffUser", schemaType: SchemaTypeEnum.PopulatedDoc, isRequired: true },
        { name: "reason", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        {
          name: "approval",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApproval",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "transactionReference",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReference",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: false,
        },
        {
          name: "financeReference",
          type: "IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReference",
          schemaType: SchemaTypeEnum.NestedPath,
          isRequired: true,
        },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReference",
      fields: [
        { name: "vendor", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "referenceId", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmission",
      fields: [
        { name: "debitGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "creditGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "recognitionDate", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
    {
      name: "IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognition",
      fields: [
        { name: "debitGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "creditGlAccount", type: "string", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "amount", type: "number", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
        { name: "recognitionDate", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: false },
        { name: "completedOn", type: "Date", schemaType: SchemaTypeEnum.Primitive, isRequired: true },
      ],
    },
  ],
};

const entityInputStructure = ExtractFullAggregateRootInputStructure(rawInputEntity);
DataAccessPainKiller(entityInputStructure);
GenerateGraphQLSchema(entityInputStructure);

const applicantUserInputStructure = ExtractFullAggregateRootInputStructure(rawInputApplicantUser);
DataAccessPainKiller(applicantUserInputStructure);
GenerateGraphQLSchema(applicantUserInputStructure);

const idVerificationCaseInputStructure = ExtractFullAggregateRootInputStructure(rawInputIdentityCase);
DataAccessPainKiller(idVerificationCaseInputStructure);
GenerateGraphQLSchema(idVerificationCaseInputStructure);

const staffUserInputStructure = ExtractFullAggregateRootInputStructure(rawInputStaffUser);
DataAccessPainKiller(staffUserInputStructure);
GenerateGraphQLSchema(staffUserInputStructure);





// (async () => {
//   const module = await import("iso-639-2");
//   const iso6392Languages = module.iso6392.reduce((acc, lang) => {
//     acc[lang.iso6392B] = lang.name;
//     return acc;
//   }, {} as Record<string, string>);  // export to a file
//   const fs = require("fs");
//   fs.writeFileSync("iso6392Languages.json", JSON.stringify(iso6392Languages));
//   console.log("iso6392Languages.json file created");

// })();
