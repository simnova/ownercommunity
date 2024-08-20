import chalk from "chalk";
import { Field, ModelSchemaInputStructure, SchemaTypeEnum } from "./common";
import {
  GetDomainAggregateRootDefinition,
  GetDomainRepositoryDefinition,
  GetDomainUnitOfWorkDefinition,
  GetMongoRepositoryDefinition,
  GetMongoUnitOfWorkDefinition,
  GetDomainAdapterDefinition,
} from "./templates/aggregate-root/aggregate-root-helpers";
import { GetDomainEntityDefinitions } from "./templates/entity/entity-helpers";
import { GetDomainValueObjectDefinitions } from "./templates/value-object/value-object-helpers";

export const DataAccessPainKiller = (inputStructure: ModelSchemaInputStructure) => {
  console.log("Killing pain...");
  // Generate Domain Aggregate Root
  GetDomainAggregateRootDefinition(inputStructure);

  // Generate Domain Repository Definition
  GetDomainRepositoryDefinition(inputStructure);

  // Generate Domain UnitOfWork Definition
  GetDomainUnitOfWorkDefinition(inputStructure);

  // Generate Mongo Repository Definition
  GetMongoRepositoryDefinition(inputStructure);

  // Generate Mongo UnitOfWork Definition
  GetMongoUnitOfWorkDefinition(inputStructure);

  // Generate Domain Adapter Definition
  GetDomainAdapterDefinition(inputStructure);

  // Generate Domain Context Value Object Definitions
  GetDomainValueObjectDefinitions(inputStructure);

  // Generate Domain Context DomainEntity Definitions
  GetDomainEntityDefinitions(inputStructure);
  console.log("You should be good to go now!");
  console.log(chalk.yellow("Summary: "));
  console.log(chalk.blue("Aggregate Root Name:"), inputStructure.name);
  console.log(chalk.blue("Number of NestedPaths:"), inputStructure.nestedPaths?.length);
  console.log(chalk.blue("Number of SubdocumentBases:"), inputStructure.subdocumentBases?.length);
};

/*example: 

  export interface IdentityVerificationCase extends Case {
  caseDetails?: IdentityVerificationCaseCaseDetails;
  revisionRequest?: IdentityVerificationCaseRevisionRequest;
  caseHistory?: Types.DocumentArray<IdentityVerificationCaseCaseHistory>;
  assets?: IdentityVerificationCaseAssets;
  messages?: Types.DocumentArray<IdentityVerificationCaseMessage>;
  financeDetails?: IdentityVerificationCaseFinanceDetails;
  activityLog?: Types.DocumentArray<IdentityVerificationCaseActivityLog>;
 
  applicant: PopulatedDoc<ApplicantUser.ApplicantUser>;
  submittedAt?: Date;
  purgeEligibleAt?: Date;
  expirationEligibleAt?: Date;
 
  caseType?: string;
  discriminatorKey: string;
  state: string;
 
  caseName: string;
  systemTags?: string[];
  tags?: string[];
  caseFlagged?: Types.DocumentArray<IdentityVerificationCaseCaseFlagged>;
  search?: IdentityVerificationCaseSearch;
}


*/
