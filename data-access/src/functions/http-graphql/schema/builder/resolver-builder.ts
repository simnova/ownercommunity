/**
 * This file is used to traverse  all the files in this directory
 * and merge them together to create the application schema
 */
import { Resolvers } from './generated';
import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

console.log(`custom-log | resolver-builder | ${path.join(__dirname, "../../../http-graphql/**/*.resolvers.*")}`);
const resolversArray = loadFilesSync(path.join(__dirname, "../../../http-graphql/**/*.resolvers.*"));
const permissionsArray = loadFilesSync(path.join(__dirname, "../../../http-graphql/**/*.permissions.*"));

export const resolvers: Resolvers = mergeResolvers(resolversArray);
export const permissions = mergeResolvers(permissionsArray);