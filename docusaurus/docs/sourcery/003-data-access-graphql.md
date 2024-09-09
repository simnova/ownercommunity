### Path Pattern:
data-access/src/**/graphql/schema/types/*.graphql

### Rules:
- aggregate root graphql files should be found in the following path pattern: data-access/src/**/graphql/schema/types/
- each file should correspond to an aggregate root
- the file name should be kebob-cased and match the name of the aggregate root and should not be pluralized
- types defined in the graphql file should be prefixed with the name of the aggregate root and be PascalCased
- fields should be camelCased
- mutations should use verbs to describe the action
- mutations should return the type of the object that was created or updated wrapped in a type derived from MutationResult type
- input types should be prefixed with the name of the aggregate root, be PascalCased, and end with Input
- the root type should implement the interface MongoBase
- scalars should be leveraged when possible
- id fields should be of type ObjectId
- subtypes that are identified by an id should implement the interface MongoSubDocument

 