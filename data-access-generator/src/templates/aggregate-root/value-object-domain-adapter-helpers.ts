import * as fs from "fs";
import * as path from "path";
import { CapitalizeFirstLetter, Field, InsertVersionMiddleOfType, ModelSchemaInputStructure, SchemaTypeEnum } from "../../common";

// Primitive Fields
export const ValueObjectDomainAdapterGeneratePrimitiveFieldsForDomainAdapter = (primitiveFields: Field[]) => {
  // getter and setter for each primitive field
  let result = "";
  primitiveFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.Primitive) {
      result += `  get ${field.name}() {
    return this.doc.${field.name};
  }
  set ${field.name}(value: ${field.type}) {
    this.doc.${field.name} = value;
  }\n`;
    }
  });
  return result;
};
// Nested Path Fields
export const ValueObjectDomainAdapterGenerateNestedPathFieldsForDomainAdapter = (
  fields: Field[],
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  fields.forEach((field) => {
    const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      result += `  get ${field.name}() {
    if (!this.doc.${field.name}) {
      this.doc.set('${field.name}', {});
    }
    return new ${typeWithVersionIfAny}DomainAdapter(this.doc.${field.name});
  }\n`;
    }
  });

  return result;
};
// Populated Doc Fields
export const ValueObjectDomainAdapterGeneratePopulatedDocFieldsForDomainAdapter = (populatedDocFields: Field[]) => {
  let result = "";
  populatedDocFields.forEach((field) => {
    const capitalizedFieldName = CapitalizeFirstLetter(field.name);
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  get ${field.name}() {
    if (this.doc.${field.name}) {
      return new ${field.type}DomainAdapter(this.doc.${field.name});
    }
    return undefined;
  }\n`;
      if (field.isRequired === false) {
        result += `  set${capitalizedFieldName}Ref(${field.name}: ${field.type}EntityReference) {
          this.doc.set('${field.name}', ${field.name} ? ${field.name}['props']['doc'] : null);
        }\n`;
      } else {
        result += `  set${capitalizedFieldName}Ref(${field.name}: ${field.type}EntityReference) {
    this.doc.set('${field.name}', ${field.name}['props']['doc']);
  }\n`;
      }
    }
  });
  return result;
};
// Document Array Fields
export const ValueObjectDomainAdapterGenerateDocumentArrayFieldsForDomainAdapter = (
  fields: Field[],
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  fields.forEach((field) => {
    const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      result += `  get ${field.name}() {
    return new MongoosePropArray(this.doc.${field.name}, ${typeWithVersionIfAny}DomainAdapter);
  }\n`;
    }
  });

  return result;
};

export const GetValueObjectDomainAdapterDefinition = (modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result: string = "";
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "value-object-domain-adapter-template.txt"), "utf8");
  if (modelSchemaInputStructure.nestedPaths) {
    modelSchemaInputStructure.nestedPaths.forEach((nestedPath) => {
      let temp = "";
      // replace placeholders in the template with the actual values
      const nameWithVersion = InsertVersionMiddleOfType(modelSchemaInputStructure, nestedPath.name);
      temp = template.replace(/ValueObjectDomainAdapterName/g, nameWithVersion);
      temp = temp.replace(/ValueObjectDomainAdapterModelName/g, nestedPath.name);
      temp = temp.replace(/\/\/PrimitiveFields/g, ValueObjectDomainAdapterGeneratePrimitiveFieldsForDomainAdapter(nestedPath.fields));
      temp = temp.replace(
        /\/\/NestedPathFields/g,
        ValueObjectDomainAdapterGenerateNestedPathFieldsForDomainAdapter(nestedPath.fields, modelSchemaInputStructure)
      );
      temp = temp.replace(/\/\/PopulatedDocFields/g, ValueObjectDomainAdapterGeneratePopulatedDocFieldsForDomainAdapter(nestedPath.fields));
      temp = temp.replace(
        /\/\/DocumentArrayFields/g,
        ValueObjectDomainAdapterGenerateDocumentArrayFieldsForDomainAdapter(nestedPath.fields, modelSchemaInputStructure)
      );
      result += temp;
    });
  }

  return result;
};
