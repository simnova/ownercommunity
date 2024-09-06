/**
 * This file merges all the schemas together to create 
 * the overall Apollo schema
 */

import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema, mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '@app/functions/http/graphql/schema/builder/resolver-builder';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import * as Scalars from 'graphql-scalars';
import { GraphqlContext } from '@app/main/graphql/graphql-context-builder';

const schema = loadSchemaSync('./src/routes/http/graphql/schema/builder/graphql.schema.json', {
  loaders: [new JsonFileLoader()],
});

const appSchema = addResolversToSchema(schema,resolvers)

const scalarSchema = makeExecutableSchema<GraphqlContext>({
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