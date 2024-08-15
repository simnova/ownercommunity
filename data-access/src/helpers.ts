import { Schema } from "mongoose";
import { StaffUserSchema } from "./infrastructure-services-impl/datastore/mongodb/models/users/staff-user";
import { EndUserSchema } from "./infrastructure-services-impl/datastore/mongodb/models/users/end-user";

export default function extractSchemaToObject(schema: Schema) {
  const paths = schema.paths;
  const extractedSchema: { [key: string]: any } = {};

  for (const key in paths) {
    if (paths[key].instance === "Embedded") {
      // Recursively extract nested schemas
      extractedSchema[key] = extractSchemaToObject((paths[key] as any).schema);
    } else {
      extractedSchema[key] = {
        type: paths[key].instance,
        required: paths[key].isRequired ?? false,
        // default: paths[key].default,
        // index: paths[key].options.index,
      };
    }
  }
  return extractedSchema;
}



console.log(extractSchemaToObject(EndUserSchema))

export const GetDomainAggregateRootDefinition = () => {
  let result = null;
 

  return result;
};

export const GetDomainRepositoryDefinition = () => {
  let result = null;
  return result;
};

export const GetDomainUnitOfWorkDefinition = () => {
  let result = null;
  return result;
};

export const GetDomainAdapterDefinition = () => {
  let result = null;
  return result;
};

export const GetMongoRepositoryDefinition = () => {
  let result = null;
  return result;
};

export const GetMongoUnitOfWorkDefinition = () => {
  let result = null;
  return result;
};

