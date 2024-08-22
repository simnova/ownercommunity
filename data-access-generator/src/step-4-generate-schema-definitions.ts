import * as fs from "fs";
import * as path from "path";
import { ModelSchemaInputStructure, SchemaTypeEnum, toKebabCase } from "./common";

const RefineSchemaTypeFromModelType = (modelFieldType: string, schemaType: SchemaTypeEnum) => {
  if (schemaType === SchemaTypeEnum.Primitive) {
    switch (modelFieldType) {
      case "string":
        return "{ type: String, required: false}";
      case "string[]":
        return "{ type: [String], required: false}";
      case "number":
        return "{ type: Number, required: false}";
      case "boolean":
        return "{ type: Boolean, required: false}";
      case "ObjectID":
        return "ObjectID";
      default:
        return `{ type: ${modelFieldType}, required: false}`;
    }
  } else if (schemaType === SchemaTypeEnum.PopulatedDoc) {
    return `{ type: Schema.Types.ObjectId, ref: ${modelFieldType}.${modelFieldType}Model.modelName, required: false}
`;
  } else if (schemaType === SchemaTypeEnum.DocumentArray) {
    return `{ type: [${modelFieldType}Schema], required: false }
`;
  } else {
    // NestedPath
    return `{type: ${modelFieldType}Type,required: false, ...NestedPathOptions,}`;
  }
};

export const GenerateSchemaDefinitions = (modelSchemaInput: ModelSchemaInputStructure) => {
  let result = "";
  const template = fs.readFileSync(path.join(__dirname, "./templates/schema-template.txt"), "utf8");

  // generate base schema
  result += template.replace(/ModelName/g, modelSchemaInput.name);

  // generate fields
  let baseFields = modelSchemaInput.fields.map((field) => {
    return `${field.name}: ${RefineSchemaTypeFromModelType(field.type, field.schemaType!)}`;
  });
  result = result.replace(/\/\/FieldDefinitions/g, baseFields.join(",\n") + ",");

  // generate nested path types
  let nestedPathTypeDefinitions = "";
  for (const nestedPath of modelSchemaInput.nestedPaths ?? []) {
    let nestedPathFields = nestedPath.fields.map((field) => {
      return `${field.name}: ${RefineSchemaTypeFromModelType(field.type, field.schemaType!)}`;
    });
    nestedPathTypeDefinitions += `export const ${nestedPath.name}Type = {
  ${nestedPathFields.join(",\n")},\n};\n\n`;
  }
  result = result.replace(/\/\/NestedPathTypeDefinitions/g, nestedPathTypeDefinitions);

  // generate subdocument schemas
  let subdocumentSchemas = "";
  for (const subdocument of modelSchemaInput.subdocumentBases ?? []) {
    let subdocumentFields = subdocument.fields.map((field) => {
      return `${field.name}: ${RefineSchemaTypeFromModelType(field.type, field.schemaType!)}`;
    });
    subdocumentSchemas += `export const ${subdocument.name}Schema = new Schema<${subdocument.name}, Model<${subdocument.name}>, ${subdocument.name}>({
  ${subdocumentFields.join(",\n")},\n});\n\n`;
  }
  result = result.replace(/\/\/SubdocumentBaseSchemaDefinitions/g, subdocumentSchemas);

  const filename = toKebabCase(modelSchemaInput.name);
  const distFolder = path.join(__dirname, "../dist/schemas");
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }

  const distFilePath = path.join(distFolder, `${filename}.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};
