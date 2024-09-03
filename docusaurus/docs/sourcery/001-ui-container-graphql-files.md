### Path Pattern:
ui-*/**/*.container.graphql



### Rules:
- container graphql files are named *.container.graphql
- container graphql files should be found in the following path pattern ui-\<\<PortalName>>/src/components/layouts/\<\<AreaName>>/components/*.container.graphql
- container graphql files should contain queries and mutations for the container
    - query and mutation naming convention should follow pattern \<\<AreaName>>\<\<ContainerName>>\<\<Query NamelMutation Name>>
    - queries and mutations should only use the spread operator with fragments
    - fragment for returned fields naming convention should follow the pattern \<\<AreaName>>\<\<ContainerName>>\<\<GraphQLTypeName>>Fields
    - mutation fragment naming convention should follow the pattern \<\<AreaName>>\<\<ContainerName>>\<\<GraphQLTypeName>>MutationResultFields
    - mutation fragment should use spread operator with fragment for GraphQL Type