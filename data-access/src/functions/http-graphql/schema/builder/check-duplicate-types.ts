/**
 * This code validates the content of *.graphql files before generating typescript interfaces for graphql schema
 * - display errors in console - for any duplicate type definitions or conflicting type definitions
 * - exit with failure if any error found
 * - stand-alone script
 * - be executed only on developer workstation as a CLI script defined in package.json
 */
import fs from 'fs';
import path from 'path';
import {glob} from 'glob';
import { parse, DocumentNode, DefinitionNode, ObjectTypeExtensionNode, ObjectTypeDefinitionNode, InterfaceTypeDefinitionNode, InputObjectTypeDefinitionNode, FieldDefinitionNode, Kind, InputValueDefinitionNode } from 'graphql';
import { error } from 'console';

type AllowedOutputTypeDefinitionNode = ObjectTypeDefinitionNode  | InterfaceTypeDefinitionNode;
type AllowedInputTypeDefinitionNode = InputObjectTypeDefinitionNode;
type AllowedExtensionTypeDefinitionNode = ObjectTypeExtensionNode;

const GRAPHQL_FILES_PATTERN = path.join(__dirname, "../../../http-graphql/**/*.graphql");
console.log(`... graphql-file-pattern | ${GRAPHQL_FILES_PATTERN}`);


// [TODO] sourcery suggestion: https://github.com/simnova/ownercommunity/pull/316#discussion_r1783529777


// extension types
function processExtensionTypeNode(outputTypeNode: AllowedExtensionTypeDefinitionNode, processedNodes: string[] = [], errors: string[] = []) {
    const fieldDefinitions = recursiveFunctionToFindExtensionFieldDefinitions(outputTypeNode);
    fieldDefinitions.forEach(fieldDef => {
        const extensionFieldName = `${outputTypeNode.name.value}.${fieldDef.name.value}`
        if(processedNodes.includes(extensionFieldName)) {
            errors.push(`duplicate-found | extension-field | ${extensionFieldName}`);
        }
        else {
            processedNodes.push(extensionFieldName);
        }
    });
}
function recursiveFunctionToFindExtensionFieldDefinitions(node: AllowedExtensionTypeDefinitionNode | FieldDefinitionNode , fieldDefinitions: FieldDefinitionNode[] = []): FieldDefinitionNode[] {
    if (node.kind === Kind.FIELD_DEFINITION) {
        fieldDefinitions.push(node);
    }
    if (node.kind === Kind.OBJECT_TYPE_EXTENSION) {
        node.fields.forEach((childNode: AllowedExtensionTypeDefinitionNode | FieldDefinitionNode) => recursiveFunctionToFindExtensionFieldDefinitions(childNode, fieldDefinitions));
    }
    return fieldDefinitions;
}


// output types
function processOutputTypeNode(outputTypeNode: AllowedOutputTypeDefinitionNode, processedNodes: string[] = [], errors: string[] = []) {
    const nodeName = outputTypeNode.name.value;
    if (processedNodes.includes(nodeName)) {
        errors.push(`duplicate-found | output-node | ${nodeName}`);
    } else {
        processedNodes.push(nodeName);
    }
    checkForDuplicateFieldsInOutputTypeNode(outputTypeNode, errors);
}
function checkForDuplicateFieldsInOutputTypeNode(outputTypeNode: AllowedOutputTypeDefinitionNode, errors: string[]) {
    const processedFields: string[] = [];
    const fieldDefinitions = recursiveFunctionToFindOutputFieldDefinitions(outputTypeNode);
    fieldDefinitions.forEach(fieldDef => {
        const fieldName = fieldDef.name.value;
        if(processedFields.includes(fieldName)) {
            errors.push(`duplicate-found | output-field | ${outputTypeNode.name.value}.${fieldName}`);
        }
        else {
            processedFields.push(fieldName);
        }
    });
}
function recursiveFunctionToFindOutputFieldDefinitions(node: AllowedOutputTypeDefinitionNode | FieldDefinitionNode , fieldDefinitions: FieldDefinitionNode[] = []): FieldDefinitionNode[] {
    if (node.kind === Kind.FIELD_DEFINITION) {
        fieldDefinitions.push(node);
    }
    if (node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
        node.fields.forEach((childNode: AllowedOutputTypeDefinitionNode | FieldDefinitionNode) => recursiveFunctionToFindOutputFieldDefinitions(childNode, fieldDefinitions));
    }
    return fieldDefinitions;
}


// input types
function processInputTypeNode(inputTypeNode: AllowedInputTypeDefinitionNode, processedNodes: string[] = [], errors: string[] = []) {
    const nodeName = inputTypeNode.name.value;
    if (processedNodes.includes(nodeName)) {
        errors.push(`duplicate-found | input-node | ${nodeName}`);
    } else {
        processedNodes.push(nodeName);
    }
    checkForDuplicateFieldsInInputTypeNode(inputTypeNode, errors);
}
function checkForDuplicateFieldsInInputTypeNode(inputTypeNode: AllowedInputTypeDefinitionNode, errors: string[]) {
    const processedFields: string[] = [];
    const fieldDefinitions = recursiveFunctionToFindInputValueDefinitions(inputTypeNode);
    fieldDefinitions.forEach(fieldDef => {
        const fieldName = fieldDef.name.value;
        if(processedFields.includes(fieldName)) {
            errors.push(`duplicate-found | input-field | ${inputTypeNode.name.value}.${fieldName}`);
        }
        else {
            processedFields.push(fieldName);
        }
    });
}
function recursiveFunctionToFindInputValueDefinitions(node: AllowedInputTypeDefinitionNode | InputValueDefinitionNode, inputValueDefinitions: InputValueDefinitionNode[] = []): InputValueDefinitionNode[] {
    if (node.kind === Kind.INPUT_VALUE_DEFINITION) {
        inputValueDefinitions.push(node);
    }
    if (node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION) {
        node.fields.forEach((childNode: AllowedInputTypeDefinitionNode | InputValueDefinitionNode) => recursiveFunctionToFindInputValueDefinitions(childNode, inputValueDefinitions));
    }
    return inputValueDefinitions;
}


// process definitions
function traverseDefinitions(definitions: readonly DefinitionNode[]| unknown[], processedNodesMap: Map<string, string[]> , errors: string[] = []) {
    definitions.forEach((defNode) => {
        if (defNode.kind === Kind.OBJECT_TYPE_DEFINITION) {
            processOutputTypeNode(defNode, processedNodesMap.get(defNode.kind), errors);
        }
        else if (defNode.kind === Kind.INTERFACE_TYPE_DEFINITION) {
            processOutputTypeNode(defNode, processedNodesMap.get(defNode.kind), errors);
        }
        else if (defNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION) {
            processInputTypeNode(defNode, processedNodesMap.get(defNode.kind), errors);
        }
        else if (defNode.kind === Kind.OBJECT_TYPE_EXTENSION) {
            processExtensionTypeNode(defNode, processedNodesMap.get(defNode.kind), errors);
        }
        else if (defNode.definitions) {
            traverseDefinitions(defNode.definitions, processedNodesMap, errors);
        }
    });
}


// glob + parse + traverse
glob(GRAPHQL_FILES_PATTERN).then((files) => {
    console.log(`... files-found | ${files?.length}`);
    const errors: string[] = [];
    let isSuccess: boolean = true;
    const processedNodesMap: Map<string, string[]> = new Map();
    processedNodesMap.set(Kind.OBJECT_TYPE_DEFINITION, []);
    processedNodesMap.set(Kind.INTERFACE_TYPE_DEFINITION, []);
    processedNodesMap.set(Kind.INPUT_OBJECT_TYPE_DEFINITION, []);
    processedNodesMap.set(Kind.OBJECT_TYPE_EXTENSION, []);
    files.forEach((file) => {
        console.log(`... processing ${file}`);
        const content = fs.readFileSync(file, 'utf8');
        const parsed: DocumentNode = parse(content);
        // console.log(`... validate-graphql-schema | parsed | ${JSON.stringify(parsed)}`);
        traverseDefinitions(parsed.definitions, processedNodesMap, errors);
        if(errors.length > 0) {
            isSuccess = false;
            errors.forEach((err) => {
                console.error(err);
            });
            errors.splice(0, errors.length);
        }
    });
    if(isSuccess) {
        console.log('✅ Schema validation passed. No duplicate or conflicting type definitions found.');
    }
    else {
        console.error('❌ Schema validation failed.');
        process.exit(1); // Exit with failure
    }
});

