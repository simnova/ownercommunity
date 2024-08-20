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
export const EntityGenerateInterfaceForEntityReference = (
  inputStructure: NestedPathOrSubDocumentBaseInputStructure,
  modelSchemaInputStructure: ModelSchemaInputStructure
) => {
  let result = "";
  let omitText = "";
  const nameWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, inputStructure.name);
  if (HasOtherThanPrimitiveFields(inputStructure.fields)) {
    //build Omit type for EntityReference
    let omitFields: string[] = [];
    inputStructure.fields.forEach((field) => {
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
export const EntityGeneratePrimitiveFieldsForEntityProps = (primitiveFields: Field[]) => {
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

export const EntityGenerateNestedPathFieldsForEntityProps = (nestedPathFields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  nestedPathFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  readonly ${field.name}: ${typeWithVersionIfAny}Props;\n`;
    }
  });
  return result;
};

export const EntityGeneratePopulateDocFieldsForEntityProps = (subdocumentBaseFields: Field[]) => {
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

export const EntityGenerateDocumentArrayFieldsForEntityProps = (
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
export const EntityGenerateNestedPathEntityReferenceFields = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  readonly ${field.name}: ${typeWithVersionIfAny}EntityReference;\n`;
    }
  });
  return result;
};

export const EntityGeneratePopulateDocEntityReferenceFields = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  readonly ${field.name}: ${field.type}EntityReference;\n`;
    }
  });
  return result;
};

export const EntityGenerateDocumentArrayEntityReferenceFields = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
      result += `  readonly ${field.name}: ReadonlyArray<${typeWithVersionIfAny}EntityReference>;\n`;
    }
  });
  return result;
};

// Field Getters
export const EntityGeneratePrimitiveFieldGetters = (fields: Field[]) => {
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

export const EntityGenerateNestedPathFieldGetters = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(modelSchemaInputStructure, field.type);
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

export const EntityGeneratePopulateDocFieldGetters = (fields: Field[]) => {
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

export const EntityGenerateDocumentArrayFieldGetters = (fields: Field[], modelSchemaInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      result += `  get ${field.name}(): ReadonlyArray<${modelSchemaInputStructure}> {
    return this.props.${field.name}.items.map((item) => new ${modelSchemaInputStructure}(item, this.context
    //, this.visa
    ));
  }\n`;
    }
  });
  return result;
};

// Field Setters
export const EntityGeneratePrimitiveFieldSetters = (fields: Field[]) => {
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

export const EntityGeneratePopulateDocFieldSetters = (fields: Field[]) => {
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
export const GetDomainEntityDefinitions = (modelSchemaInputStructure: ModelSchemaInputStructure) => {
  if (modelSchemaInputStructure.subdocumentBases) {
    for (let subdocumentBase of modelSchemaInputStructure.subdocumentBases) {
      let result = null;
      // read template from file
      const template = fs.readFileSync(path.join(__dirname, "../entity/entity-template.txt"), "utf8");
      // replace placeholders in the template with the actual values
      //entity props
      const nameWithVersion = InsertVersionMiddleOfType(modelSchemaInputStructure, subdocumentBase.name);

      result = template.replace(/EntityName/g, nameWithVersion);
      result = result.replace(/\/\/PrimitiveFieldsForEntityProps/g, EntityGeneratePrimitiveFieldsForEntityProps(subdocumentBase.fields));
      result = result.replace(
        /\/\/NestedPathFieldsForEntityProps/g,
        EntityGenerateNestedPathFieldsForEntityProps(subdocumentBase.fields, modelSchemaInputStructure)
      );
      result = result.replace(/\/\/PopulateDocFieldsForEntityProps/g, EntityGeneratePopulateDocFieldsForEntityProps(subdocumentBase.fields));
      result = result.replace(
        /\/\/DocumentArrayFieldsForEntityProps/g,
        EntityGenerateDocumentArrayFieldsForEntityProps(subdocumentBase.fields, modelSchemaInputStructure)
      );
      //entity reference fields
      result = result.replace(
        /\/\/NestedPathEntityReferenceFields/g,
        EntityGenerateNestedPathEntityReferenceFields(subdocumentBase.fields, modelSchemaInputStructure)
      );
      result = result.replace(/\/\/PopulateDocEntityReferenceFields/g, EntityGeneratePopulateDocEntityReferenceFields(subdocumentBase.fields));
      result = result.replace(
        /\/\/DocumentArrayEntityReferenceFields/g,
        EntityGenerateDocumentArrayEntityReferenceFields(subdocumentBase.fields, modelSchemaInputStructure)
      );
      //getters
      result = result.replace(/\/\/PrimitiveFieldGetters/g, EntityGeneratePrimitiveFieldGetters(subdocumentBase.fields));
      result = result.replace(/\/\/NestedPathFieldGetters/g, EntityGenerateNestedPathFieldGetters(subdocumentBase.fields, modelSchemaInputStructure));
      result = result.replace(/\/\/PopulateDocFieldGetters/g, EntityGeneratePopulateDocFieldGetters(subdocumentBase.fields));
      result = result.replace(
        /\/\/DocumentArrayFieldGetters/g,
        EntityGenerateDocumentArrayFieldGetters(subdocumentBase.fields, modelSchemaInputStructure)
      );
      //setters
      result = result.replace(/\/\/PrimitiveFieldSetters/g, EntityGeneratePrimitiveFieldSetters(subdocumentBase.fields));
      result = result.replace(/\/\/PopulateDocFieldSetters/g, EntityGeneratePopulateDocFieldSetters(subdocumentBase.fields));
      //interface line for EntityReference
      result = result.replace(
        /\/\/InterfaceLineForEntityReference/g,
        EntityGenerateInterfaceForEntityReference(subdocumentBase, modelSchemaInputStructure)
      );

      // export into dist folder: dist/app/domain/contexts/<kebabcase-name>/<kebabcase-name>.ts
      const folderName = toKebabCase(modelSchemaInputStructure.name);
      const version = modelSchemaInputStructure.version ? `v${modelSchemaInputStructure.version}` : "";

      const distFolder = path.join(__dirname, "../../../dist/app/domain/contexts", folderName, version);
      if (!fs.existsSync(distFolder)) {
        fs.mkdirSync(distFolder, { recursive: true });
      }

      const versionPart = version ? "-" + version : "";
      const filename = toKebabCase(subdocumentBase.name).replace(
        toKebabCase(modelSchemaInputStructure.name),
        toKebabCase(modelSchemaInputStructure.name) + versionPart
      );
      const distFilePath = path.join(distFolder, `${filename}.ts`);
      fs.writeFileSync(distFilePath, result);
    }
  }
};
