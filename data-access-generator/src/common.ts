export interface RawInputFromModel {
  aggregateRootDefinition: string;
  complexSchemaTypeDefinitions?: string;
  version?: string
}



export enum SchemaTypeEnum {
  Primitive = "Primitive",
  NestedPath = "NestedPath",
  SubdocumentBase = "SubdocumentBase",
  PopulatedDoc = "PopulatedDoc",
  DocumentArray = "Types.DocumentArray",
}

export interface Field {
  name: string;
  type: string;
  schemaType?: SchemaTypeEnum;
  isRequired?: boolean; // default is true
}

export interface NestedPathOrSubDocumentBaseInputStructure {
  name: string;
  fields: Field[];
}

export interface ModelSchemaInputStructure {
  name: string;
  fields: Field[];
  version?: string;
  nestedPaths?: NestedPathOrSubDocumentBaseInputStructure[];
  subdocumentBases?: NestedPathOrSubDocumentBaseInputStructure[];
}

export const HasOtherThanPrimitiveFields = (fields: Field[]) => {
  for (let field of fields) {
    if (field.schemaType !== SchemaTypeEnum.Primitive) {
      return true;
    }
  }

  return false;
};

export function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert a hyphen between lowercase and uppercase letters
    .toLowerCase(); // Convert the entire string to lowercase
}

export function CapitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const InsertVersionMiddleOfType = (modelSchema: ModelSchemaInputStructure, fieldType: string) => {
  const typeWithVersionIfAny = modelSchema.version ? fieldType.replace(modelSchema.name, `${modelSchema.name}V${modelSchema.version}`) : fieldType;
  return typeWithVersionIfAny;
};
