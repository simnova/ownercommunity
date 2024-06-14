"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8217],{6311:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var s=n(4848),t=n(8453);const o={sidebar_position:6,sidebar_label:"0006 Azure Maps Integration Decision",description:"Utilize Azure Maps for integrating mapping functionalities into the project.",status:"accepted",contact:"gidich",date:new Date("2024-04-18T00:00:00.000Z"),deciders:"gidich",consulted:"etang93, mgupta83",informed:"ikeem07, heruwala, nguyenduy"},r="Use Maps for the project",a={id:"decisions/maps",title:"Use Maps for the project",description:"Utilize Azure Maps for integrating mapping functionalities into the project.",source:"@site/docs/decisions/0006-maps.md",sourceDirName:"decisions",slug:"/decisions/maps",permalink:"/docs/decisions/maps",draft:!1,unlisted:!1,editUrl:"https://github.com/simnova/ownercommunity/tree/main/docusaurus/docs/decisions/0006-maps.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,sidebar_label:"0006 Azure Maps Integration Decision",description:"Utilize Azure Maps for integrating mapping functionalities into the project.",status:"accepted",contact:"gidich",date:"2024-04-18T00:00:00.000Z",deciders:"gidich",consulted:"etang93, mgupta83",informed:"ikeem07, heruwala, nguyenduy"},sidebar:"tutorialSidebar",previous:{title:"0005 Authorization and Access Pattern",permalink:"/docs/decisions/authorization"},next:{title:"0007 SerenityJS",permalink:"/docs/decisions/serenityjs"}},l={},c=[{value:"Context and Problem Statement",id:"context-and-problem-statement",level:2},{value:"Decision Drivers",id:"decision-drivers",level:2},{value:"Considered Options",id:"considered-options",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Options",id:"pros-and-cons-of-the-options",level:2},{value:"Azure Maps",id:"azure-maps",level:3},{value:"Google Maps API",id:"google-maps-api",level:3},{value:"Mapbox",id:"mapbox",level:3},{value:"Links",id:"links",level:2}];function d(e){const i={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"use-maps-for-the-project",children:"Use Maps for the project"}),"\n",(0,s.jsx)(i.h2,{id:"context-and-problem-statement",children:"Context and Problem Statement"}),"\n",(0,s.jsx)(i.p,{children:"The project requires mapping functionalities to display location-based data and provide users with interactive maps. The project needs a mapping solution that is easy to integrate, provides rich mapping capabilities, and is scalable to meet future requirements."}),"\n",(0,s.jsx)(i.h2,{id:"decision-drivers",children:"Decision Drivers"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Mapping Functionality"}),": The project requires mapping functionalities to display location-based data and provide users with interactive maps."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Ease of Integration"}),": The mapping solution should be easy to integrate with the project's existing infrastructure and technologies."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Scalability"}),": The solution should be scalable to handle future growth and increasing demands for mapping functionalities."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cost-Effectiveness"}),": The solution should be cost-effective and provide value for the project's budget."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Developer Experience"}),": The solution should offer a good developer experience, including comprehensive documentation, SDKs, support, and community resources."]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"considered-options",children:"Considered Options"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Option #1: Google Maps"}),": A popular mapping solution with rich features and functionalities. Google Maps offers comprehensive mapping capabilities, including geocoding, routing, and visualization."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Option #2: Azure Maps"}),": Microsoft's mapping solution that provides rich mapping capabilities, geospatial services, and developer tools. Azure Maps offers integration with Azure services and provides SDKs for various platforms."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Option #3: Mapbox"}),": A mapping platform that offers customizable maps, geocoding, and routing services. Mapbox provides tools for developers to create custom maps and integrate mapping functionalities into applications."]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"decision-outcome",children:"Decision Outcome"}),"\n",(0,s.jsxs)(i.p,{children:["Chosen option: ",(0,s.jsx)(i.strong,{children:"Option #2: Azure Maps"})]}),"\n",(0,s.jsx)(i.p,{children:"Azure Maps has been chosen as the mapping solution for the project due to its robust capabilities, seamless integration with Azure services, and developer-friendly tools. Providing comprehensive geospatial services such as geocoding, routing, traffic, and weather data, Azure Maps offers SDKs for various platforms, simplifying the integration of mapping functionalities. Aligned with the project's requirements for mapping functionalities, ease of scalability, and cost-effectiveness, Azure Maps presents a comprehensive suite alongside seamless integration with other Azure services. It ensures high performance and a developer-friendly environment, effectively meeting our project requirements."}),"\n",(0,s.jsx)(i.h2,{id:"pros-and-cons-of-the-options",children:"Pros and Cons of the Options"}),"\n",(0,s.jsx)(i.h3,{id:"azure-maps",children:"Azure Maps"}),"\n",(0,s.jsx)(i.p,{children:"Pros:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Comprehensive mapping functionalities including geocoding, routing, and spatial analytics."}),"\n",(0,s.jsx)(i.li,{children:"Seamless integration with other Azure services."}),"\n",(0,s.jsx)(i.li,{children:"Scalability and high performance."}),"\n",(0,s.jsx)(i.li,{children:"Developer-friendly environment with comprehensive documentation and SDKs."}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Cons:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Potential cost implications, although Azure Maps offers various pricing tiers to accommodate different usage levels."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"google-maps-api",children:"Google Maps API"}),"\n",(0,s.jsx)(i.p,{children:"Pros:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Widely used and familiar mapping solution."}),"\n",(0,s.jsx)(i.li,{children:"Extensive mapping features and capabilities."}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Cons:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Integration complexity, especially with non-Google platforms."}),"\n",(0,s.jsx)(i.li,{children:"Dependency on external services and infrastructure."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"mapbox",children:"Mapbox"}),"\n",(0,s.jsx)(i.p,{children:"Pros:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Customization options and design flexibility."}),"\n",(0,s.jsx)(i.li,{children:"Developer-friendly platform with robust SDKs."}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Cons:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Integration complexity, particularly with non-Mapbox environments."}),"\n",(0,s.jsx)(i.li,{children:"Limited spatial analytics compared to Azure Maps."}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"links",children:"Links"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"https://docs.microsoft.com/en-us/azure/azure-maps/",children:"Azure Maps Documentation"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"https://developers.google.com/maps/documentation",children:"Google Maps API Documentation"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"https://docs.mapbox.com/",children:"Mapbox Documentation"})}),"\n"]})]})}function p(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>a});var s=n(6540);const t={},o=s.createContext(t);function r(e){const i=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:i},e.children)}}}]);