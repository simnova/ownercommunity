import { ModelSchemaInputStructure, Field, SchemaTypeEnum, NestedPathOrSubDocumentBaseInputStructure, RawInputFromModel } from "./common";

const isOptionalField = (field: string) => {
  return field.includes("?");
};
const isPrimitive = (type: string) => {
  return type === "string" || type === "number" || type === "boolean" || type === "Date" || type === "string[]";
};

const isPopulatedDoc = (type: string) => {
  return type.includes("PopulatedDoc");
};

const extractPopulatedDocType = (type: string) => {
  const regex = /PopulatedDoc<(.+)>/;
  return type.match(regex)?.[1].split(".")[1];
};

const isDocumentArray = (type: string) => {
  return type.includes("DocumentArray");
};

const extractDocumentArrayType = (type: string) => {
  const regex = /DocumentArray<(.+)>/;
  return type.match(regex)?.[1];
};

// hash: string; => ["hash", "string"]
const extractFields = (input: string) => {
  const fieldsRegex = /(\w+\?*): (.+);/g;
  const rawFields = input.matchAll(fieldsRegex);
  const fields: Field[] = [];

  for (const match of rawFields) {
    const fieldName = match[1];
    const fieldType = match[2];
    // ignore discriminatorKey
    if (fieldName === "discriminatorKey") {
      continue;
    }
    if (isPrimitive(fieldType)) {
      fields.push({
        name: fieldName.replace("?", ""),
        type: fieldType,
        schemaType: SchemaTypeEnum.Primitive,
        isRequired: !isOptionalField(fieldName),
      });
    } else if (isPopulatedDoc(fieldType)) {
      fields.push({
        name: fieldName.replace("?", ""),
        type: extractPopulatedDocType(fieldType)!,
        schemaType: SchemaTypeEnum.PopulatedDoc,
        isRequired: !isOptionalField(fieldName),
      });
    } else if (isDocumentArray(fieldType)) {
      fields.push({
        name: fieldName.replace("?", ""),
        type: extractDocumentArrayType(fieldType)!,
        schemaType: SchemaTypeEnum.DocumentArray,
        isRequired: !isOptionalField(fieldName),
      });
    } else {
      // NestedPath
      fields.push({
        name: fieldName.replace("?", ""),
        type: fieldType,
        schemaType: SchemaTypeEnum.NestedPath,
        isRequired: !isOptionalField(fieldName),
      });
    }
  }
  return fields;
};

// Function to extract the interface information
export function ExtractInputForAggregateRoot(input: string, version?: string) {
  // regex to extract the interface name
  const aggregateRootNameRegex = /interface (\w+)/;
  const aggregateRootName = input.match(aggregateRootNameRegex)?.[1];

  let aggregateInputStructure: ModelSchemaInputStructure = {
    name: aggregateRootName!,
    fields: [],
  };

  // extract the fields
  const fields = extractFields(input);

  aggregateInputStructure.fields = fields;

  if (version) {
    aggregateInputStructure.version = version;
  }

  return aggregateInputStructure;
}

enum ComplexSchemaType {
  NestedPath = "NestedPath",
  SubdocumentBase = "SubdocumentBase",
}

export const ExtractInputFor = (complexSchemaType: ComplexSchemaType, nestedPathsAndSubdocumentBaseText: string) => {
  let result: NestedPathOrSubDocumentBaseInputStructure[] = [];

  // regex to extract all complex type blocks
  let complexSchemaTypeDefinitionsRegex: RegExp;

  if (complexSchemaType === ComplexSchemaType.NestedPath) {
    complexSchemaTypeDefinitionsRegex = /export\s+interface\s+\w+\s+extends\s+NestedPath\s*{[^}]*}/g;
  } else {
    complexSchemaTypeDefinitionsRegex = /export\s+interface\s+\w+\s+extends\s+SubdocumentBase\s*{[^}]*}/g;
  }
  const complexSchemaTypeDefinitionMatches = nestedPathsAndSubdocumentBaseText.matchAll(complexSchemaTypeDefinitionsRegex);

  for (let match of complexSchemaTypeDefinitionMatches) {
    const definitionBlock = match[0];
    const interfaceNameRegex = /interface (\w+)/;
    const interfaceName = definitionBlock.match(interfaceNameRegex)?.[1];

    // extract fields
    const fields = extractFields(definitionBlock);

    const item: NestedPathOrSubDocumentBaseInputStructure = {
      name: interfaceName!,
      fields: fields,
    };

    result.push(item);
  }

  return result; // nestedPaths or subdocumentBases depending on the type
};

export const ExtractFullAggregateRootInputStructure = (rawInput: RawInputFromModel) => {
  const aggregateRootInputStructure = ExtractInputForAggregateRoot(rawInput.aggregateRootDefinition, rawInput.version);

  const nestedPaths = rawInput.complexSchemaTypeDefinitions
    ? ExtractInputFor(ComplexSchemaType.NestedPath, rawInput.complexSchemaTypeDefinitions)
    : [];
  const subdocumentBases = rawInput.complexSchemaTypeDefinitions
    ? ExtractInputFor(ComplexSchemaType.SubdocumentBase, rawInput.complexSchemaTypeDefinitions)
    : [];

  aggregateRootInputStructure.nestedPaths = nestedPaths;
  aggregateRootInputStructure.subdocumentBases = subdocumentBases;

  return aggregateRootInputStructure;
};
