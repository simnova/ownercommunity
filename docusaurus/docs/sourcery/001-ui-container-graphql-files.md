### Path Pattern:
ui-*/**/*.container.graphql



### Rules:
- container graphql files are named: \<componentName>.container.graphql
- container graphql files should be found in the following path pattern: ui-\<PortalName>/src/components/layouts/\<AreaName>/components/\<componentName>.container.graphql
- container graphql files should contain queries and mutations for the container
    - query and mutation naming convention should follow pattern: \<AreaName>\<ContainerName>\<QueryName|MutationName>
    - queries and mutations should only define fields to return by using the spread operator with fragments
    - fragment for returned fields naming convention should follow the pattern: \<AreaName>\<ContainerName>\<GraphQLTypeName>Fields
    - mutation fragment naming convention should follow the pattern: \<AreaName>\<ContainerName>\<GraphQLTypeName>MutationResultFields
    - mutation fragment should use spread operator with fragment for GraphQL Type
- If any of the above rules are broken, direct the developer to refer to the document file named 001-ui-container-graphql-files.md