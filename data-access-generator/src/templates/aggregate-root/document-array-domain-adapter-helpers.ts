import {
  CapitalizeFirstLetter,
  Field,
  InsertVersionMiddleOfType,
  ModelSchemaInputStructure,
  NestedPathOrSubDocumentBaseInputStructure,
  SchemaTypeEnum,
} from "../../common";
import * as fs from "fs";
import * as path from "path";

// Primitive Fields
export const DocumentArrayDomainAdapterGeneratePrimitiveFieldsForDomainAdapter = (primitiveFields: Field[]) => {
  // getter and setter for each primitive field
  let result = "";
  primitiveFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.Primitive) {
      result += `  get ${field.name}() {
    return this.props.${field.name};
  }
  set ${field.name}(value: ${field.type}) {
    this.props.${field.name} = value;
  }\n`;
    }
  });
  return result;
};
// Nested Path Fields
export const DocumentArrayDomainAdapterGenerateNestedPathFieldsForDomainAdapter = (
  fields: Field[],
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  get ${field.name}() {
    if (!this.props.${field.name}) {
      this.props.set('${field.name}', {});
    }
    return new ${typeWithVersionIfAny}DomainAdapter(this.props.${field.name});
  }\n`;
    }
  });

  return result;
};
// Populated Doc Fields
export const DocumentArrayDomainAdapterGeneratePopulatedDocFieldsForDomainAdapter = (populatedDocFields: Field[]) => {
  let result = "";
  populatedDocFields.forEach((field) => {
    const capitalizedFieldName = CapitalizeFirstLetter(field.name);
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  get ${field.name}() {
    if (this.props.${field.name}) {
      return new ${field.type}DomainAdapter(this.props.${field.name});
    }
    return undefined;
  }\n`;
      if (field.isRequired === false) {
        result += `  set${capitalizedFieldName}Ref(${field.name}: ${field.type}EntityReference) {
          this.props.set('${field.name}', ${field.name} ? ${field.name}['props']['doc'] : null);
        }\n`;
      } else {
        result += `  set${capitalizedFieldName}Ref(${field.name}: ${field.type}EntityReference) {
    this.props.set('${field.name}', ${field.name}['props']['doc']);
  }\n`;
      }
    }
  });
  return result;
};
// Document Array Fields
export const DocumentArrayDomainAdapterGenerateDocumentArrayFieldsForDomainAdapter = (
  fields: Field[],
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  get ${field.name}() {
    return new MongoosePropArray(this.props.${field.name}, ${typeWithVersionIfAny}DomainAdapter);
  }\n`;
    }
  });

  return result;
};

export const GetDocumentArrayDomainAdapterDefinition = (modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result: string = "";
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "document-array-domain-adapter-template.txt"), "utf8");
  if (modelSchemaInputStructure.subdocumentBases) {
    modelSchemaInputStructure.subdocumentBases.forEach((subdocumentBase) => {
      let temp = "";
      // replace placeholders in the template with the actual values
      const nameWithVersion = InsertVersionMiddleOfType(modelSchemaInputStructure, subdocumentBase.name);
      temp = template.replace(/DocumentArrayDomainAdapterName/g, nameWithVersion);
      temp = temp.replace(/DocumentArrayDomainAdapterModelName/g, subdocumentBase.name);
      temp = temp.replace(/\/\/PrimitiveFields/g, DocumentArrayDomainAdapterGeneratePrimitiveFieldsForDomainAdapter(subdocumentBase.fields));
      temp = temp.replace(
        /\/\/NestedPathFields/g,
        DocumentArrayDomainAdapterGenerateNestedPathFieldsForDomainAdapter(subdocumentBase.fields, modelSchemaInputStructure)
      );
      temp = temp.replace(/\/\/PopulatedDocFields/g, DocumentArrayDomainAdapterGeneratePopulatedDocFieldsForDomainAdapter(subdocumentBase.fields));
      temp = temp.replace(
        /\/\/DocumentArrayFields/g,
        DocumentArrayDomainAdapterGenerateDocumentArrayFieldsForDomainAdapter(subdocumentBase.fields, modelSchemaInputStructure)
      );
      result += temp;
    });
  }

  return result;
};
