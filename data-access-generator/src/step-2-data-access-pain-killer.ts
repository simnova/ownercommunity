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
  console.log("Killing pain for ", inputStructure.name, "...");
  // Generate Domain Aggregate Root file
  GetDomainAggregateRootDefinition(inputStructure);

  // Generate Domain Repository file
  GetDomainRepositoryDefinition(inputStructure);

  // Generate Domain UnitOfWork file
  GetDomainUnitOfWorkDefinition(inputStructure);

  // Generate Mongo Repository file
  GetMongoRepositoryDefinition(inputStructure);

  // Generate Mongo UnitOfWork file
  GetMongoUnitOfWorkDefinition(inputStructure);

  // Generate Domain Adapter file
  GetDomainAdapterDefinition(inputStructure);

  // Generate Domain Context Value Object files
  GetDomainValueObjectDefinitions(inputStructure);

  // Generate Domain Context DomainEntity files
  GetDomainEntityDefinitions(inputStructure);
  console.log(chalk.blue("You should be good to go now!"))
  console.log(chalk.blue("Summary: "));
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
