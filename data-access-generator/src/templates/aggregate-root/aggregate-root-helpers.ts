import * as fs from "fs";
import * as path from "path";
import {
  ModelSchemaInputStructure,
  Field,
  HasOtherThanPrimitiveFields,
  SchemaTypeEnum,
  toKebabCase,
  CapitalizeFirstLetter,
  InsertVersionMiddleOfType,
} from "../../common";
import { GetValueObjectDomainAdapterDefinition } from "./value-object-domain-adapter-helpers";
import { GetDocumentArrayDomainAdapterDefinition } from "./document-array-domain-adapter-helpers";

//interface line for EntityReference
export const AggregateRootGenerateInterfaceForEntityReference = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  let omitText = "";
  const aggregateRootNameWithVersionIfAny = aggregateRootInputStructure.version
    ? `${aggregateRootInputStructure.name}V${aggregateRootInputStructure.version}`
    : aggregateRootInputStructure.name;
  if (HasOtherThanPrimitiveFields(aggregateRootInputStructure.fields)) {
    //build Omit type for EntityReference
    let omitFields: string[] = [];
    aggregateRootInputStructure.fields.forEach((field) => {
      if (field.schemaType === SchemaTypeEnum.NestedPath || field.schemaType === SchemaTypeEnum.DocumentArray) {
        omitFields.push(`'${field.name}'`);
      } else if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
        const capitalizedFieldName = CapitalizeFirstLetter(field.name);
        omitFields.push(`'${field.name}'`);
        omitFields.push(`'set${capitalizedFieldName}Ref'`);
      }
    });
    omitText = `<Omit<${aggregateRootNameWithVersionIfAny}Props, ${omitFields.join(" | ")}>>`;
  }
  if (omitText) {
    result = `export interface ${aggregateRootNameWithVersionIfAny}EntityReference extends Readonly${omitText} {`;
  } else {
    result = `export interface ${aggregateRootNameWithVersionIfAny}EntityReference extends Readonly<${aggregateRootNameWithVersionIfAny}Props>{`;
  }

  return result;
};

/// Aggregate Root File helpers
// DomainEntity Props
export const AggregateRootGeneratePrimitiveFieldsForEntityProps = (primitiveFields: Field[]) => {
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

export const AggregateRootGenerateNestedPathFieldsForEntityProps = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = aggregateRootInputStructure.version
        ? field.type.replace(aggregateRootInputStructure.name, `${aggregateRootInputStructure.name}V${aggregateRootInputStructure.version}`)
        : field.type;
      result += `  readonly ${field.name}: ${typeWithVersionIfAny}Props;\n`;
    }
  });
  return result;
};

export const AggregateRootGeneratePopulateDocFieldsForEntityProps = (subdocumentBaseFields: Field[]) => {
  let result = "";
  subdocumentBaseFields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  readonly ${field.name}: ${field.type}Props;\n`;
      // capitalize the first letter of the field name
      const capitalizedFieldName = CapitalizeFirstLetter(field.name);
      result += `  set${capitalizedFieldName}Ref(${field.name}: ${field.type}EntityReference): void;\n`;
    }
  });
  return result;
};

export const AggregateRootGenerateDocumentArrayFieldsForEntityProps = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);
      result += `  readonly ${field.name}: PropArray<${typeWithVersionIfAny}Props>;\n`;
    }
  });
  return result;
};

// Entity Reference Fields
export const AggregateRootGenerateNestedPathEntityReferenceFields = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);

      result += `  readonly ${field.name}: ${typeWithVersionIfAny}EntityReference;\n`;
    }
  });
  return result;
};

export const AggregateRootGeneratePopulateDocEntityReferenceFields = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      result += `  readonly ${field.name}: ${field.type}EntityReference;\n`;
    }
  });
  return result;
};

export const AggregateRootGenerateDocumentArrayEntityReferenceFields = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);
      result += `  readonly ${field.name}: ReadonlyArray<${typeWithVersionIfAny}EntityReference>;\n`;
    }
  });
  return result;
};

// Field Getters
export const AggregateRootGeneratePrimitiveFieldGetters = (fields: Field[]) => {
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

export const AggregateRootGenerateNestedPathFieldGetters = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);

      if (field.isRequired === false) {
        result += `  get ${field.name}() {
      return this.props.${field.name} ? new ${typeWithVersionIfAny}(this.props.${field.name}, this.context
      //, this.visa
      ) : undefined;
    }\n`;
      } else {
        result += `  get ${field.name}() {
      return new ${typeWithVersionIfAny}(this.props.${field.name}
      //, this.visa
      );
    }\n`;
      }
    }
  });
  return result;
};

export const AggregateRootGeneratePopulateDocFieldGetters = (fields: Field[]) => {
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

export const AggregateRootGenerateDocumentArrayFieldGetters = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);

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
export const AggregateRootGeneratePrimitiveFieldSetters = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.Primitive) {
      const capitalizedFieldName = CapitalizeFirstLetter(field.name);
      result += `  set ${capitalizedFieldName}(value: ${field.type}) {
    this.props.${field.name} = value;
  }\n`;
    }
  });
  return result;
};

export const AggregateRootGeneratePopulateDocFieldSetters = (fields: Field[]) => {
  let result = "";
  fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.PopulatedDoc) {
      const capitalizedFieldName = CapitalizeFirstLetter(field.name);
      result += `  set ${capitalizedFieldName}(${field.name}: ${field.type}EntityReference) {
    this.props.set${capitalizedFieldName}Ref(${field.name});
  }\n`;
    }
  });
  return result;
};

/// Domain Adapter helpers
// Primitive Fields
export const AggregateRootGeneratePrimitiveFieldsForDomainAdapter = (primitiveFields: Field[]) => {
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
export const AggregateRootGenerateNestedPathFieldsForDomainAdapter = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.NestedPath) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);
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
export const AggregateRootGeneratePopulatedDocFieldsForDomainAdapter = (populatedDocFields: Field[]) => {
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
export const AggregateRootGenerateDocumentArrayFieldsForDomainAdapter = (aggregateRootInputStructure: ModelSchemaInputStructure) => {
  let result = "";
  aggregateRootInputStructure.fields.forEach((field) => {
    if (field.schemaType === SchemaTypeEnum.DocumentArray) {
      const typeWithVersionIfAny = InsertVersionMiddleOfType(aggregateRootInputStructure, field.type);
      result += `  get ${field.name}() {
    return new MongoosePropArray(this.doc.${field.name}, ${typeWithVersionIfAny}DomainAdapter);
  }\n`;
    }
  });
  return result;
};

// Domain Aggregate Root
export const GetDomainAggregateRootDefinition = (aggregateRootStructureInput: ModelSchemaInputStructure) => {
  let result = null;
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "aggregate-root-template.txt"), "utf8");
  // replace placeholders in the template with the actual values
  //entity props
  const aggregateRootName = aggregateRootStructureInput.version
    ? `${aggregateRootStructureInput.name}V${aggregateRootStructureInput.version}`
    : aggregateRootStructureInput.name;
  result = template.replace(/AggregateRootName/g, aggregateRootName);
  result = result.replace(
    /\/\/PrimitiveFieldsForEntityProps/g,
    AggregateRootGeneratePrimitiveFieldsForEntityProps(aggregateRootStructureInput.fields)
  );
  result = result.replace(/\/\/NestedPathFieldsForEntityProps/g, AggregateRootGenerateNestedPathFieldsForEntityProps(aggregateRootStructureInput));
  result = result.replace(
    /\/\/PopulateDocFieldsForEntityProps/g,
    AggregateRootGeneratePopulateDocFieldsForEntityProps(aggregateRootStructureInput.fields)
  );
  result = result.replace(
    /\/\/DocumentArrayFieldsForEntityProps/g,
    AggregateRootGenerateDocumentArrayFieldsForEntityProps(aggregateRootStructureInput)
  );

  //interface line for EntityReference
  result = result.replace(/\/\/InterfaceLineForEntityReference/g, AggregateRootGenerateInterfaceForEntityReference(aggregateRootStructureInput));

  //entity reference fields
  result = result.replace(/\/\/NestedPathEntityReferenceFields/g, AggregateRootGenerateNestedPathEntityReferenceFields(aggregateRootStructureInput));
  result = result.replace(
    /\/\/PopulateDocEntityReferenceFields/g,
    AggregateRootGeneratePopulateDocEntityReferenceFields(aggregateRootStructureInput.fields)
  );
  result = result.replace(
    /\/\/DocumentArrayEntityReferenceFields/g,
    AggregateRootGenerateDocumentArrayEntityReferenceFields(aggregateRootStructureInput)
  );
  //getters
  result = result.replace(/\/\/PrimitiveFieldGetters/g, AggregateRootGeneratePrimitiveFieldGetters(aggregateRootStructureInput.fields));
  result = result.replace(/\/\/NestedPathFieldGetters/g, AggregateRootGenerateNestedPathFieldGetters(aggregateRootStructureInput));
  result = result.replace(/\/\/PopulateDocFieldGetters/g, AggregateRootGeneratePopulateDocFieldGetters(aggregateRootStructureInput.fields));
  result = result.replace(/\/\/DocumentArrayFieldGetters/g, AggregateRootGenerateDocumentArrayFieldGetters(aggregateRootStructureInput));
  //setters
  result = result.replace(/\/\/PrimitiveFieldSetters/g, AggregateRootGeneratePrimitiveFieldSetters(aggregateRootStructureInput.fields));
  result = result.replace(/\/\/PopulateDocFieldSetters/g, AggregateRootGeneratePopulateDocFieldSetters(aggregateRootStructureInput.fields));

  // export into dist folder: dist/app/domain/contexts/<version><kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>.ts
  const filename = toKebabCase(aggregateRootStructureInput.name);
  const version = aggregateRootStructureInput.version ? `v${aggregateRootStructureInput.version}` : "";
  const distFolder = path.join(__dirname, "../../../dist/app/domain/contexts", filename, version);
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }

  const distFilePath = path.join(distFolder, `${filename + (version ? "-" + version : "")}.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};

// Domain Repository
export const GetDomainRepositoryDefinition = (aggregateRootStructureInput: ModelSchemaInputStructure) => {
  let result = null;
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "domain-repository-template.txt"), "utf8");
  // replace placeholders in the template with the actual values
  const nameWithVersion = InsertVersionMiddleOfType(aggregateRootStructureInput, aggregateRootStructureInput.name);
  result = template.replace(/DomainRepositoryName/g, nameWithVersion);
  // export into dist folder: dist/app/domain/contexts/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>-repository.ts
  const filename = toKebabCase(aggregateRootStructureInput.name);
  const version = aggregateRootStructureInput.version ? `v${aggregateRootStructureInput.version}` : "";
  const distFolder = path.join(__dirname, "../../../dist/app/domain/contexts", filename, version);
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }
  const distFilePath = path.join(distFolder, `${filename}${version ? "-" + version : ""}.repository.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};

// Domain Unit Of Work
export const GetDomainUnitOfWorkDefinition = (aggregateRootStructureInput: ModelSchemaInputStructure) => {
  let result = null;
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "domain-unit-of-work-template.txt"), "utf8");
  // replace placeholders in the template with the actual values
  const nameWithVersion = InsertVersionMiddleOfType(aggregateRootStructureInput, aggregateRootStructureInput.name);
  result = template.replace(/DomainUOWName/g, nameWithVersion);
  // export into dist folder: dist/app/domain/contexts/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>-uow.ts
  const filename = toKebabCase(aggregateRootStructureInput.name);
  const version = aggregateRootStructureInput.version ? `v${aggregateRootStructureInput.version}` : "";
  const distFolder = path.join(__dirname, "../../../dist/app/domain/contexts", filename, version);
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }
  const distFilePath = path.join(distFolder, `${filename}${version ? "-" + version : ""}.uow.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};

// Domain Adapter
export const GetDomainAdapterDefinition = (aggregateRootStructureInput: ModelSchemaInputStructure) => {
  let result: string = "null";
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "domain-adapter-template.txt"), "utf8");
  // replace placeholders in the template with the actual values
  const nameWithVersion = InsertVersionMiddleOfType(aggregateRootStructureInput, aggregateRootStructureInput.name);
  result = template.replace(/DomainAdapterName/g, nameWithVersion);
  result = result.replace(/DomainAdapterModelName/g, aggregateRootStructureInput.name);
  result = result.replace(/\/\/PrimitiveFields/g, AggregateRootGeneratePrimitiveFieldsForDomainAdapter(aggregateRootStructureInput.fields));
  result = result.replace(/\/\/NestedPathFields/g, AggregateRootGenerateNestedPathFieldsForDomainAdapter(aggregateRootStructureInput));
  result = result.replace(/\/\/PopulatedDocFields/g, AggregateRootGeneratePopulatedDocFieldsForDomainAdapter(aggregateRootStructureInput.fields));
  result = result.replace(/\/\/DocumentArrayFields/g, AggregateRootGenerateDocumentArrayFieldsForDomainAdapter(aggregateRootStructureInput));

  // domain adapter for nested paths
  result = result.replace(/\/\/NestedPathDomainAdapters/g, GetValueObjectDomainAdapterDefinition(aggregateRootStructureInput));

  // domain adapter for document arrays
  result = result.replace(/\/\/DocumentArrayDomainAdapters/g, GetDocumentArrayDomainAdapterDefinition(aggregateRootStructureInput));

  // export into dist folder: dist/infrastructure-services-impl/datastore/mongodb/infrastructure/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>.domain-adapter.ts
  const filename = toKebabCase(aggregateRootStructureInput.name);
  const version = aggregateRootStructureInput.version ? `v${aggregateRootStructureInput.version}` : "";
  const distFolder = path.join(__dirname, "../../../dist/infrastructure-services-impl/datastore/mongodb/infrastructure", filename, version);
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }
  const distFilePath = path.join(distFolder, `${filename}${version ? "-" + version : ""}.domain-adapter.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};

// Mongo Repository
export const GetMongoRepositoryDefinition = (aggregateRootStructureInput: ModelSchemaInputStructure) => {
  let result = null;
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "mongo-repository-template.txt"), "utf8");
  // replace placeholders in the template with the actual values
  const nameWithVersion = InsertVersionMiddleOfType(aggregateRootStructureInput, aggregateRootStructureInput.name);
  result = template.replace(/MongoRepositoryName/g, nameWithVersion);
  result = result.replace(/MongoRepositoryModelName/g, aggregateRootStructureInput.name);
  // export into dist folder: dist/infrastructure-services-impl/datastore/mongodb/infrastructure/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>.mongo-repository.ts
  const filename = toKebabCase(aggregateRootStructureInput.name);
  const version = aggregateRootStructureInput.version ? `v${aggregateRootStructureInput.version}` : "";

  const distFolder = path.join(__dirname, "../../../dist/infrastructure-services-impl/datastore/mongodb/infrastructure", filename, version);
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }
  const distFilePath = path.join(distFolder, `${filename}${version ? "-" + version : ""}.mongo-repository.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};

// Mongo Unit Of Work
export const GetMongoUnitOfWorkDefinition = (aggregateRootStructureInput: ModelSchemaInputStructure) => {
  let result = null;
  // read template from file
  const template = fs.readFileSync(path.join(__dirname, "mongo-unit-of-work-template.txt"), "utf8");
  // replace placeholders in the template with the actual values
  const nameWithVersion = InsertVersionMiddleOfType(aggregateRootStructureInput, aggregateRootStructureInput.name);
  result = template.replace(/MongoUOWName/g, nameWithVersion);
  result = result.replace(/MongoUOWModelName/g, aggregateRootStructureInput.name);
  // export into dist folder: dist/infrastructure-services-impl/datastore/mongodb/infrastructure/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>/<kebabcase-aggregate-root-name>.uow.ts
  const filename = toKebabCase(aggregateRootStructureInput.name);
  const version = aggregateRootStructureInput.version ? `v${aggregateRootStructureInput.version}` : "";

  const distFolder = path.join(__dirname, "../../../dist/infrastructure-services-impl/datastore/mongodb/infrastructure", filename, version);
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true });
  }
  const distFilePath = path.join(distFolder, `${filename}${version ? "-" + version : ""}.uow.ts`);
  fs.writeFileSync(distFilePath, result);

  return result;
};
