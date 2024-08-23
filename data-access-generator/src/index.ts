import { ModelSchemaInputStructure, RawInputFromModel, SchemaTypeEnum } from "./common";
import { DataAccessPainKiller } from "./step-2-data-access-pain-killer";
import { GenerateGraphQLSchema } from "./step-3-export-to-graphql";
import { ExtractFullAggregateRootInputStructure } from "./step-1-raw-input-interface-model-to-tool-input-helpers";
import { rawInputApplicantUser } from "./raw-inputs/raw-input-applicant-user";
import { rawInputEntity } from "./raw-inputs/raw-input-entity";
import { rawInputIdentityCase } from "./raw-inputs/raw-input-identity-case";
import { rawInputStaffUser } from "./raw-inputs/raw-input-staff-user";
import { GenerateSchemaDefinitions } from "./step-4-generate-schema-definitions";
import { rawInputCredentialVerificationCase } from "./raw-inputs/raw-input-credential-verification-case";
import { rawInputSendReportCase } from "./raw-inputs/send-report-case";

const StartPainKilling = (rawInput: RawInputFromModel) => {
  const entityInputStructure = ExtractFullAggregateRootInputStructure(rawInput);
  DataAccessPainKiller(entityInputStructure);
  GenerateGraphQLSchema(entityInputStructure);
  GenerateSchemaDefinitions(entityInputStructure);
};

StartPainKilling(rawInputEntity);

StartPainKilling(rawInputApplicantUser);

StartPainKilling(rawInputIdentityCase);

StartPainKilling(rawInputStaffUser);

StartPainKilling(rawInputCredentialVerificationCase);

StartPainKilling(rawInputSendReportCase);
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
