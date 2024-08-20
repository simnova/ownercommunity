import { ModelSchemaInputStructure, SchemaTypeEnum } from "./common";
import { DataAccessPainKiller } from "./step-2-data-access-pain-killer";
import { GenerateGraphQLSchema } from "./step-3-export-to-graphql";
import { ExtractFullAggregateRootInputStructure } from "./step-1-raw-input-interface-model-to-tool-input-helpers";
import { rawInputApplicantUser } from "./raw-inputs/raw-input-applicant-user";
import { rawInputEntity } from "./raw-inputs/raw-input-entity";
import { rawInputIdentityCase } from "./raw-inputs/raw-input-identity-case";
import { rawInputStaffUser } from "./raw-inputs/raw-input-staff-user";




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
