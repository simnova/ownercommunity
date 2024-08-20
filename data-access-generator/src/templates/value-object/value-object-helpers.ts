import {
  Field,
  HasOtherThanPrimitiveFields,
  InsertVersionMiddleOfType,
  ModelSchemaInputStructure,
  NestedPathOrSubDocumentBaseInputStructure,
  SchemaTypeEnum,
  toKebabCase,
} from "../../common";
import * as fs from "fs";
import * as path from "path";

//interface line for EntityReference
export const ValueObjectGenerateInterfaceForEntityReference = (
  valueObjectInputStructure: NestedPathOrSubDocumentBaseInputStructure,
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  let omitText = "";
  const nameWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, valueObjectInputStructure.name);
  if (HasOtherThanPrimitiveFields(valueObjectInputStructure.fields)) {
    //build Omit type for EntityReference
    let omitFields: string[] = [];
    valueObjectInputStructure.fields.forEach((field) => {
      if (field.schemaType === SchemaTypeEnum.NestedPath || field.schemaType === SchemaTypeEnum.DocumentArray) {
        omitFields.push(`'${field.name}'`);
      } else if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
        const capitalizedFieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
        omitFields.push(`'${field.name}'`);
        omitFields.push(`'set${capitalizedFieldName}Ref'`);
      }
    });
    omitText = `<Omit<${nameWithVersionIfAny}Props, ${omitFields.join(" | ")}>>`;
  }
  if (omitText) {
    result = `export interface ${nameWithVersionIfAny}EntityReference extends Readonly${omitText} {`;
  } else {
    result = `export interface ${nameWithVersionIfAny}EntityReference extends Readonly<${nameWithVersionIfAny}Props>{`;
  }

  return result;
};

/// Value Object File helpers
// Entity Props
export const ValueObjectGeneratePrimitiveFieldsForValueObjectProps = (primitiveFields: Field[]) => {
  let result = "";
  primitiveFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.Primitive) {
      if (field.isRequired === false) {
        result += `  ${field.name}?: ${field.type};\n`;
      } else {
        result += `  ${field.name}: ${field.type};\n`;
      }
    }
  });
  return result;
};

export const ValueObjectGenerateNestedPathFieldsForValueObjectProps = (
  nestedPathFields: Field[],
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  nestedPathFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  readonly ${field.name}: ${typeWithVersionIfAny}Props;\n`;
    }
  });
  return result;
};

export const ValueObjectGeneratePopulateDocFieldsForValueObjectProps = (subdocumentBaseFields: Field[]) => {
  let result = "";
  subdocumentBaseFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  readonly ${field.name}: ${field.type}Props;\n`;
      // capitalize the first letter of the field name
      const capitalizedFieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
      result += `  set${capitalizedFieldName}Ref(${field.name}: ${field.type}EntityReference): void;\n`;
    }
  });
  return result;
};

export const ValueObjectGenerateDocumentArrayFieldsForValueObjectProps = (
  documentArrayFields: Field[],
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  documentArrayFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  readonly ${field.name}: PropArray<${typeWithVersionIfAny}Props>;\n`;
    }
  });
  return result;
};

// Entity Reference Fields
export const ValueObjectGenerateNestedPathEntityReferenceFields = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      result += `  readonly ${field.name}: ${typeWithVersionIfAny}EntityReference;\n`;
    }
  });
  return result;
};

export const ValueObjectGeneratePopulateDocEntityReferenceFields = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  readonly ${field.name}: ${field.type}EntityReference;\n`;
    }
  });
  return result;
};

export const ValueObjectGenerateDocumentArrayEntityReferenceFields = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      result += `  readonly ${field.name}: ReadonlyArray<${typeWithVersionIfAny}EntityReference>;\n`;
    }
  });
  return result;
};

// Field Getters
export const ValueObjectGeneratePrimitiveFieldGetters = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.Primitive) {
      result += `  get ${field.name}() {
    return this.props.${field.name};
    }\n`;
    }
  });
  return result;
};

export const ValueObjectGenerateNestedPathFieldGetters = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      if (field.isRequired === false) {
        result += `  get ${field.name}() {
      return this.props.${field.name} ? new ${typeWithVersionIfAny}(this.props.${field.name}, this.context) : undefined;
    }\n`;
      } else {
        result += `  get ${field.name}() {
      return new ${typeWithVersionIfAny}(this.props.${field.name}, this.context
      //, this.visa
      );
    }\n`;
      }
    }
  });
  return result;
};

export const ValueObjectGeneratePopulateDocFieldGetters = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      if (field.isRequired === false) {
        result += `  get ${field.name}(): ${field.type}EntityReference {
          return this.props.${field.name} ? new ${field.type}(this.props.${field.name}, this.context) : undefined;
        }\n`;
      } else {
        result += `  get ${field.name}(): ${field.type}EntityReference {
          return new ${field.type}(this.props.${field.name}, this.context);
        }\n`;
      }
    }
  });
  return result;
};

export const ValueObjectGenerateDocumentArrayFieldGetters = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  get ${field.name}(): ReadonlyArray<${typeWithVersionIfAny}> {
    return this.props.${field.name}.items.map((item) => new ${typeWithVersionIfAny}(item, this.context
    //, this.visa
    ));
  }\n`;
    }
  });
  return result;
};

// Field Setters
export const ValueObjectGeneratePrimitiveFieldSetters = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.Primitive) {
      const capitalizedFieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
      result += `  set ${capitalizedFieldName}(value: ${field.type}) {
    this.props.${field.name} = value;
  }\n`;
    }
  });
  return result;
};

export const ValueObjectGeneratePopulateDocFieldSetters = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      const capitalizedFieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
      result += `  set ${capitalizedFieldName}(${field.name}: ${field.type}EntityReference) {
    this.props.set${capitalizedFieldName}Ref(${field.name});
  }\n`;
    }
  });
  return result;
};

// Domain Context Value Object
export const GetDomainValueObjectDefinitions = (modelSchemaInputStructure: ModelSchemaInputStructure) => {
  if (modelSchemaInputStructure.nestedPaths) {
    for (let nestedPath of modelSchemaInputStructure.nestedPaths) {
      let result = null;
      // read template from file
      const template = fs.readFileSync(path.join(__dirname, "../value-object/value-object-template.txt"), "utf8");
      // replace placeholders in the template with the actual values
      //entity props
      const nameWithVersion = InsertVersionMiddleOfType(modelSchemaInputStructure, nestedPath.name);
      result = template.replace(/ValueObjectName/g, nameWithVersion);
      result = result.replace(/\/\/PrimitiveFieldsForValueObjectProps/g, ValueObjectGeneratePrimitiveFieldsForValueObjectProps(nestedPath.fields));
      result = result.replace(
        /\/\/NestedPathFieldsForValueObjectProps/g,
        ValueObjectGenerateNestedPathFieldsForValueObjectProps(nestedPath.fields, modelSchemaInputStructure)
      );
      result = result.replace(
        /\/\/PopulateDocFieldsForValueObjectProps/g,
        ValueObjectGeneratePopulateDocFieldsForValueObjectProps(nestedPath.fields)
      );
      result = result.replace(
        /\/\/DocumentArrayFieldsForValueObjectProps/g,
        ValueObjectGenerateDocumentArrayFieldsForValueObjectProps(nestedPath.fields, modelSchemaInputStructure)
      );
      //entity reference fields
      result = result.replace(
        /\/\/NestedPathEntityReferenceFields/g,
        ValueObjectGenerateNestedPathEntityReferenceFields(nestedPath.fields, modelSchemaInputStructure)
      );
      result = result.replace(/\/\/PopulateDocEntityReferenceFields/g, ValueObjectGeneratePopulateDocEntityReferenceFields(nestedPath.fields));
      result = result.replace(
        /\/\/DocumentArrayEntityReferenceFields/g,
        ValueObjectGenerateDocumentArrayEntityReferenceFields(nestedPath.fields, modelSchemaInputStructure)
      );
      //getters
      result = result.replace(/\/\/PrimitiveFieldGetters/g, ValueObjectGeneratePrimitiveFieldGetters(nestedPath.fields));
      result = result.replace(/\/\/NestedPathFieldGetters/g, ValueObjectGenerateNestedPathFieldGetters(nestedPath.fields, modelSchemaInputStructure));
      result = result.replace(/\/\/PopulateDocFieldGetters/g, ValueObjectGeneratePopulateDocFieldGetters(nestedPath.fields));
      result = result.replace(
        /\/\/DocumentArrayFieldGetters/g,
        ValueObjectGenerateDocumentArrayFieldGetters(nestedPath.fields, modelSchemaInputStructure)
      );
      //setters
      result = result.replace(/\/\/PrimitiveFieldSetters/g, ValueObjectGeneratePrimitiveFieldSetters(nestedPath.fields));
      result = result.replace(/\/\/PopulateDocFieldSetters/g, ValueObjectGeneratePopulateDocFieldSetters(nestedPath.fields));
      //interface line for EntityReference
      result = result.replace(
        /\/\/InterfaceLineForEntityReference/g,
        ValueObjectGenerateInterfaceForEntityReference(nestedPath, modelSchemaInputStructure)
      );

      // export into dist folder: dist/app/domain/contexts/<kebabcase-name>/<kebabcase-name>.ts
      const folderName = toKebabCase(modelSchemaInputStructure.name);
      const version = modelSchemaInputStructure.version ? `v${modelSchemaInputStructure.version}` : "";
      const distFolder = path.join(__dirname, "../../../dist/app/domain/contexts", folderName, version);
      if (!fs.existsSync(distFolder)) {
        fs.mkdirSync(distFolder, { recursive: true });
      }
      const versionPart = version ? "-" + version : "";
      const filename = toKebabCase(nestedPath.name).replace(
        toKebabCase(modelSchemaInputStructure.name),
        toKebabCase(modelSchemaInputStructure.name) + versionPart
      );
      const distFilePath = path.join(distFolder, `${filename}.ts`);
      fs.writeFileSync(distFilePath, result);
    }
  }
};
