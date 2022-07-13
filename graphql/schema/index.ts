import { Resolvers } from '../generated';
import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

console.log(`Loading resolvers from ${path.join(__dirname, "./**/*.resolvers.*")}`);
const resolversArray = loadFilesSync(path.join(__dirname, "./**/*.resolvers.*"));
const permissionsArray = loadFilesSync(path.join(__dirname, "./**/*.permissions.*"));

export const resolvers: Resolvers = mergeResolvers(resolversArray);
export const permissions = mergeResolvers(permissionsArray);