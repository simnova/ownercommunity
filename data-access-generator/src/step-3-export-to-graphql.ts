import * as fs from "fs";
import * as path from "path";
import { InsertVersionMiddleOfType as InsertVersionMiddleOfComplexType, ModelSchemaInputStructure, SchemaTypeEnum, toKebabCase } from "./common";

const RefineGraphqlTypeFromModelType = (modelType: string, schemaType: SchemaTypeEnum, isSimpleDate: boolean) => {
  if (schemaType === SchemaTypeEnum.Primitive) {
    switch (modelType) {
      case "string":
        return "String";
      case "string[]":
        return "[String]";
      case "number":
        return "Int";
      case "boolean":
        return "Boolean";
      case "Date":
        if (isSimpleDate) {
          return "Date";
        }
        return "DateTime";
      case "ObjectID":
        return "ObjectID";
      default:
        return modelType;
    }
  } else if (schemaType === SchemaTypeEnum.PopulatedDoc) {
    return modelType;
  } else if (schemaType === SchemaTypeEnum.DocumentArray) {
    return `[${modelType}]`;
  } else {
    // NestedPath
    return modelType;
  }
};

export const GenerateGraphQLSchema = (modelSchemaInput: ModelSchemaInputStructure) => {
  const baseWithVersion = modelSchemaInput.version ? `${modelSchemaInput.name}V${modelSchemaInput.version}` : modelSchemaInput.name;
  let schema = `
    type ${baseWithVersion} implements MongoBase {
          ${modelSchemaInput.fields
            .map(
              (field) =>
                `${field.name}: ${InsertVersionMiddleOfComplexType(
                  modelSchemaInput,
                  RefineGraphqlTypeFromModelType(field.type, field.schemaType!, !field.name.includes("At") && !field.name.includes("On"))
                )}`
            )
            .join("\n ")}
      id: ObjectID!
      schemaVersion: String
      createdAt: DateTime
      updatedAt: DateTime
    }
  `;

  // types for nestedPaths
  modelSchemaInput.nestedPaths?.forEach((nestedPath) => {
    const nestedPathNameWithVersion = InsertVersionMiddleOfComplexType(modelSchemaInput, nestedPath.name);
    schema += `
      type ${nestedPathNameWithVersion} {
            ${nestedPath.fields
              .map(
                (field) =>
                  `${field.name}: ${InsertVersionMiddleOfComplexType(
                    modelSchemaInput,
                    RefineGraphqlTypeFromModelType(field.type, field.schemaType!, !field.name.includes("At") && !field.name.includes("On"))
                  )}`
              )
              .join("\n")}
      }
    `;
  });

  // types for subdocumentBases
  modelSchemaInput.subdocumentBases?.forEach((subDocument) => {
    const subDocumentNameWithVersion = InsertVersionMiddleOfComplexType(modelSchemaInput, subDocument.name);
    schema += `
      type ${subDocumentNameWithVersion} implements MongoSubdocument {
            ${subDocument.fields
              .map(
                (field) =>
                  `${field.name}: ${InsertVersionMiddleOfComplexType(
                    modelSchemaInput,
                    RefineGraphqlTypeFromModelType(field.type, field.schemaType!, !field.name.includes("At") && !field.name.includes("On"))
                  )}`
              )
              .join("\n")}

        id: ObjectID!
        createdAt: DateTime
        updatedAt: DateTime
      }
    `;
  });

  const filename = toKebabCase(modelSchemaInput.name);
  const version = modelSchemaInput.version ? `v${modelSchemaInput.version}` : "";
  const distFolder = path.join(__dirname, "../dist/graphql");
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }

  const distFilePath = path.join(distFolder, `${filename + (version ? "-" + version : "")}.graphql`);
  fs.writeFileSync(distFilePath, schema);

  return schema;
};
