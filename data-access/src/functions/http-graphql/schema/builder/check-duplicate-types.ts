import fs from 'fs';
import path from 'path';
import {glob} from 'glob';
import { parse, DocumentNode, DefinitionNode, ObjectTypeDefinitionNode, InterfaceTypeDefinitionNode, InputObjectTypeDefinitionNode, FieldDefinitionNode, Kind, InputValueDefinitionNode } from 'graphql';

type AllowedOutputTypeDefinitionNodes = ObjectTypeDefinitionNode  | InterfaceTypeDefinitionNode;
type AllowedInputTypeDefinitionNodes = InputObjectTypeDefinitionNode;


const GRAPHQL_FILES_PATTERN = path.join(__dirname, "../../../http-graphql/**/*.graphql");
console.log(`... graphql-file-pattern | ${GRAPHQL_FILES_PATTERN}`);

const processedObjectTypeNodes: string[] = [];
const processedInterfaceTypeNodes: string[] = [];
const processedInputObjectTypeNodes: string[] = [];
let isSuccess: boolean = true;


// output types
function processOutputTypeNode(outputTypeNode: AllowedOutputTypeDefinitionNodes, processedNodes: string[] = []) {
    const nodeName = outputTypeNode.name.value;
    if (processedNodes.includes(nodeName)) {
        console.error(`duplicate-found | output-node | ${nodeName}`);
        isSuccess = false;
    } else {
        processedNodes.push(nodeName);
    }
    checkForDuplicateFieldsInOutputTypeNode(outputTypeNode);
}
function checkForDuplicateFieldsInOutputTypeNode(outputTypeNode: AllowedOutputTypeDefinitionNodes) {
    const processedNodes: string[] = [];
    const fieldDefinitions = recursiveFunctionToFindOutputFieldDefinitions(outputTypeNode);
    fieldDefinitions.forEach(fieldDef => {
        const nodeName = fieldDef.name.value;
        if(processedNodes.includes(nodeName)) {
            console.error(`duplicate-found | output-field | ${outputTypeNode.name.value}.${nodeName}`);
            isSuccess = false;
        }
        else {
            processedNodes.push(nodeName);
        }
    });
}
function recursiveFunctionToFindOutputFieldDefinitions(node: AllowedOutputTypeDefinitionNodes | FieldDefinitionNode , fieldDefinitions: FieldDefinitionNode[] = []): FieldDefinitionNode[] {
    if (node.kind === Kind.FIELD_DEFINITION) {
        fieldDefinitions.push(node);
    }
    if (node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
        node.fields.forEach((childNode: any) => recursiveFunctionToFindOutputFieldDefinitions(childNode, fieldDefinitions));
    }
    return fieldDefinitions;
}


// input types
function processInputTypeNode(inputTypeNode: AllowedInputTypeDefinitionNodes, processedNodes: string[] = []) {
    const nodeName = inputTypeNode.name.value;
    if (processedNodes.includes(nodeName)) {
        console.error(`duplicate-found | input-node | ${nodeName}`);
        isSuccess = false;
    } else {
        processedNodes.push(nodeName);
    }
    checkForDuplicateFieldsInInputTypeNode(inputTypeNode);
}
function checkForDuplicateFieldsInInputTypeNode(inputTypeNode: AllowedInputTypeDefinitionNodes) {
    const processedNodes: string[] = [];
    const fieldDefinitions = recursiveFunctionToFindInputValueDefinitions(inputTypeNode);
    fieldDefinitions.forEach(fieldDef => {
        const nodeName = fieldDef.name.value;
        if(processedNodes.includes(nodeName)) {
            console.error(`duplicate-found | input-field | ${inputTypeNode.name.value}.${nodeName}`);
            isSuccess = false;
        }
        else {
            processedNodes.push(nodeName);
        }
    });
}
function recursiveFunctionToFindInputValueDefinitions(node: AllowedInputTypeDefinitionNodes | InputValueDefinitionNode, inputValueDefinitions: InputValueDefinitionNode[] = []): InputValueDefinitionNode[] {
    if (node.kind === Kind.INPUT_VALUE_DEFINITION) {
        inputValueDefinitions.push(node);
    }
    if (node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION) {
        node.fields.forEach((childNode: any) => recursiveFunctionToFindInputValueDefinitions(childNode, inputValueDefinitions));
    }
    return inputValueDefinitions;
}


// process definitions
function traverseDefinitions(
    definitions: readonly DefinitionNode[]| unknown[], 
) {
    definitions.forEach((defNode) => {
        if (defNode.kind === Kind.OBJECT_TYPE_DEFINITION) {
            processOutputTypeNode(defNode, processedObjectTypeNodes);
        }
        else if (defNode.kind === Kind.INTERFACE_TYPE_DEFINITION) {
            processOutputTypeNode(defNode, processedInterfaceTypeNodes);
        }
        else if (defNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION) {
            processInputTypeNode(defNode, processedInputObjectTypeNodes);
        }
        else if (defNode.definitions) {
            traverseDefinitions(defNode.definitions);
        }
    });
}


// glob + parse + traverse
glob(GRAPHQL_FILES_PATTERN).then((files) => {
    console.log(`... files-found | ${files?.length}`);
    files.forEach((file) => {
        console.log(`... processing-file | ${file}`);
        const content = fs.readFileSync(file, 'utf8');
        const parsed: DocumentNode = parse(content);
        // console.log(`... validate-graphql-schema | parsed | ${JSON.stringify(parsed)}`);
        traverseDefinitions(parsed.definitions);
    });
    if(isSuccess) {
        console.log('✅ Schema validation passed. No duplicate or conflicting type definitions found.');
    }
    else {
        console.error('❌ Schema validation failed.');
        process.exit(1); // Exit with failure
    }
});

