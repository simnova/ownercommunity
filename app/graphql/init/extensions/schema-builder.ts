/**
 * This file merges all the schemas together to create 
 * the overall Apollo schema
 */

import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema, mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '../../schema';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import * as Scalars from 'graphql-scalars';
import { Context } from '../../context';

const schema = loadSchemaSync('./app/graphql/schema/codegen/graphql.schema.json', {
  loaders: [new JsonFileLoader()],
});

const appSchema = addResolversToSchema(schema,resolvers)

const scalarSchema = makeExecutableSchema<Context>({
  typeDefs:[
    ...Scalars.typeDefs,
  ],
  resolvers:{
    ...Scalars.resolvers,
  }
});

export const combinedSchema = mergeSchemas({
  schemas: [
    appSchema,
    scalarSchema,
  ]
});