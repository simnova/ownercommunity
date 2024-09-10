"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[1186],{6454:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var t=s(4848),r=s(8453);const a={},i=void 0,l={id:"sourcery/data-access-graphql",title:"data-access-graphql",description:"Path Pattern:",source:"@site/docs/sourcery/003-data-access-graphql.md",sourceDirName:"sourcery",slug:"/sourcery/data-access-graphql",permalink:"/docs/sourcery/data-access-graphql",draft:!1,unlisted:!1,editUrl:"https://github.com/simnova/ownercommunity/tree/main/docusaurus/docs/sourcery/003-data-access-graphql.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ui-tsx-files",permalink:"/docs/sourcery/ui-tsx-files"},next:{title:"Work Planning",permalink:"/docs/category/work-planning"}},o={},c=[{value:"Path Pattern:",id:"path-pattern",level:3},{value:"Rules:",id:"rules",level:3}];function d(e){const n={h3:"h3",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h3,{id:"path-pattern",children:"Path Pattern:"}),"\n",(0,t.jsx)(n.p,{children:"data-access/src/**/graphql/schema/types/*.graphql"}),"\n",(0,t.jsx)(n.h3,{id:"rules",children:"Rules:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"aggregate root GraphQL files should be found in the following path pattern: data-access/src/**/graphql/schema/types/"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"each file should correspond to an aggregate root"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"the file name should be kebab-cased and match the name of the aggregate root"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"for multi-word aggregate roots, use kebab-case (e.g., 'user-profile.graphql' for 'UserProfile')"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"file names should not be pluralized"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"types defined in the graphql file should be prefixed with the name of the aggregate root and be PascalCased"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"fields should be camelCased"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"mutations should use verbs to describe the action"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"mutations should return the type of the object that was created or updated wrapped in a type derived from MutationResult type"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"input types should be prefixed with the name of the aggregate root, be PascalCased, and end with Input"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"the root type should implement the interface MongoBase"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"scalars should be leveraged when possible"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"id fields should be of type ObjectId"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"subtypes that are identified by an id should implement the interface MongoSubDocument"}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>l});var t=s(6540);const r={},a=t.createContext(r);function i(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);