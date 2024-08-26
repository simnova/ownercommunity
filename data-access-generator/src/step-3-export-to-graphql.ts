import * as fs from "fs";
import * as path from "path";
import { InsertVersionMiddleOfType as InsertVersionMiddleOfComplexType, ModelSchemaInputStructure, SchemaTypeEnum, toKebabCase } from "./common";

const RefineGraphqlTypeFromModelType = (fieldName: string, modelFieldType: string, schemaType: SchemaTypeEnum) => {
  if (schemaType === SchemaTypeEnum.Primitive) {
    switch (modelFieldType) {
      case "string":
        return "String";
      case "string[]":
        return "[String]";
      case "number":
        if (fieldName.toLowerCase().includes("amount") || fieldName.toLowerCase().includes("fee")) {
          return "Float";
        }
        return "Int";
      case "boolean":
        return "Boolean";
      case "Date":
        if (!fieldName.toLowerCase().includes("at") && !fieldName.includes("on")) {
          return "Date";
        }
        return "DateTime";
      case "ObjectID":
        return "ObjectID";
      default:
        return modelFieldType;
    }
  } else if (schemaType === SchemaTypeEnum.PopulatedDoc) {
    return modelFieldType;
  } else if (schemaType === SchemaTypeEnum.DocumentArray) {
    return `[${modelFieldType}]`;
  } else {
    // NestedPath
    return modelFieldType;
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
                  RefineGraphqlTypeFromModelType(field.name, field.type, field.schemaType!)
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
                    RefineGraphqlTypeFromModelType(field.name, field.type, field.schemaType!)
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
                    RefineGraphqlTypeFromModelType(field.name, field.type, field.schemaType!)
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
