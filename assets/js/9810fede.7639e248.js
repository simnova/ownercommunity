"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[1253],{172:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var n=i(4848),t=i(8453);const o={sidebar_position:4,sidebar_label:"004 Authorization and Access Pattern",description:"Use Passport/Visa Pattern for Authorization and Access for the project.",status:"accepted",contact:"gidich",date:new Date("2024-04-18T00:00:00.000Z"),deciders:"gidich",consulted:"etang93, mgupta83",informed:"ikeem07, heruwala, nguyenduy"},r="Use Passport/Visa for Access Management",a={id:"decisions/authorization",title:"Use Passport/Visa for Access Management",description:"Use Passport/Visa Pattern for Authorization and Access for the project.",source:"@site/docs/decisions/0004-authorization.md",sourceDirName:"decisions",slug:"/decisions/authorization",permalink:"/docs/decisions/authorization",draft:!1,unlisted:!1,editUrl:"https://github.com/simnova/ownercommunity/tree/main/docusaurus/docs/decisions/0004-authorization.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,sidebar_label:"004 Authorization and Access Pattern",description:"Use Passport/Visa Pattern for Authorization and Access for the project.",status:"accepted",contact:"gidich",date:"2024-04-18T00:00:00.000Z",deciders:"gidich",consulted:"etang93, mgupta83",informed:"ikeem07, heruwala, nguyenduy"},sidebar:"tutorialSidebar",previous:{title:"002 Open Telemetry",permalink:"/docs/decisions/open-telemetry"},next:{title:"ADR Template",permalink:"/docs/decisions/adr-template"}},c={},d=[{value:"Context and Problem Statement",id:"context-and-problem-statement",level:2},{value:"Decision Drivers",id:"decision-drivers",level:2},{value:"Considered Options",id:"considered-options",level:2},{value:"Terminology:",id:"terminology",level:3},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Options",id:"pros-and-cons-of-the-options",level:2},{value:"Links",id:"links",level:2}];function l(e){const s={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"use-passportvisa-for-access-management",children:"Use Passport/Visa for Access Management"}),"\n",(0,n.jsx)(s.h2,{id:"context-and-problem-statement",children:"Context and Problem Statement"}),"\n",(0,n.jsx)(s.p,{children:"The project needs to define the Access Management strategy to ensure that only authorized users have access to the various functionalities."}),"\n",(0,n.jsx)(s.h2,{id:"decision-drivers",children:"Decision Drivers"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Security Requirements"}),": Ensure that only an authorized user with a specific role (aggregate of a set of permissions) have access to corresponding functionalities."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"User Authorization Mechanism"}),": Determines access to the functionalities based on the user's role, including whether the user can access associated records in a particular state."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Member record association"}),": Define access policies based on how a user's membership is associated with a record."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Read/Write Access"}),": Specify whether a user can read or write to a record."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"System Permissions"}),": Define if the system, while performing an operation, can access a record."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Domain layer implementation"}),": The implementation should reside in the domain layer without any dependencies on the infrastructure layer."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Auditing and Monitoring"}),": Define how to audit and monitor user activities within the system."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Future Flexibility and Extensibility"}),": Anticipate future growth and changes in the project's requirements when designing the IAM architecture. Consider factors like support for new authentication mechanisms, scalability, and ease of integration with other services."]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"considered-options",children:"Considered Options"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsxs)(s.strong,{children:["Option #1",":Use"," Passport/Visa"]}),": Use Passport/Visa for authorization."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"terminology",children:"Terminology:"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Visa"}),": A visa is issued based on an instance of an aggregate root, as well as the user's membership association, access to the record, system permissions, and domain layer implementation. Visas are granted based on the member's interactions with particular services or features."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Passport"}),": A passport is issued to community members upon successful authentication and user accesses any community, serving as the basis for obtaining visa with one or more permissions for specific services or features."]}),"\n",(0,n.jsx)(s.h2,{id:"decision-outcome",children:"Decision Outcome"}),"\n",(0,n.jsxs)(s.p,{children:["Chosen option: ",(0,n.jsx)(s.strong,{children:"Option #1: Use Passport/Visa for Authorization"})]}),"\n",(0,n.jsx)(s.p,{children:"The Passport/Visa pattern is a flexible and scalable approach to access management that aligns with the project's requirements. It allows for fine-grained control over user permissions and access to functionalities based on the user's role, membership association, and system permissions. The pattern also ensures that the implementation resides in the domain layer, making it easier to maintain and extend in the future."}),"\n",(0,n.jsx)(s.h2,{id:"pros-and-cons-of-the-options",children:"Pros and Cons of the Options"}),"\n",(0,n.jsx)(s.p,{children:"Pros of Passport/Visa:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Fine-grained access control"}),": The Passport/Visa pattern allows for fine-grained control over user permissions and access to functionalities based on the user's role, membership association, and system permissions."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Domain layer implementation"}),": The implementation resides in the domain layer, making it easier to maintain and extend in the future."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Scalability and flexibility"}),": The pattern is flexible and scalable, allowing for easy integration with other services and support for new authentication mechanisms."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"Cons of Passport/Visa:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Complexity"}),": The Passport/Visa pattern may introduce additional complexity to the project, especially when defining access policies and permissions for different user roles."]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"links",children:"Links"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://example.com",children:"Reference 1"})}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,s,i)=>{i.d(s,{R:()=>r,x:()=>a});var n=i(6540);const t={},o=n.createContext(t);function r(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);