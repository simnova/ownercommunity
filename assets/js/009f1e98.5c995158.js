"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7715],{8563:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>a,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>u});var o=e(4848),i=e(8453);const r={sidebar_position:2,sidebar_label:"Configuration",description:"Configuring your project environment."},s="Configuration",c={id:"getting-started/configuration",title:"Configuration",description:"Configuring your project environment.",source:"@site/docs/getting-started/configuration.md",sourceDirName:"getting-started",slug:"/getting-started/configuration",permalink:"/docs/getting-started/configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/simnova/ownercommunity/tree/main/docusaurus/docs/getting-started/configuration.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"Configuration",description:"Configuring your project environment."},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/docs/getting-started/installation"},next:{title:"Technical Overview",permalink:"/docs/category/technical-overview"}},a={},u=[];function _(n){const t={code:"code",em:"em",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"configuration",children:"Configuration"}),"\n",(0,o.jsx)(t.p,{children:"Please find below the instructions to configure the project environment. These steps will guide you through setting up the necessary configurations for operation."}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsxs)(t.strong,{children:["1. Create a ",(0,o.jsx)(t.em,{children:(0,o.jsx)(t.strong,{children:'".env"'})})," file in the base of the ui-community folder of the project and copy the values below into it"]}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:"VITE_FUNCTION_ENDPOINT=http://localhost:7071/api/graphql   \nVITE_APP_INSIGHTS_CONNECTION_STRING=InstrumentationKey=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/\n# AAD App Registrations > Applicaiton (client) ID  \nVITE_AAD_ACCOUNT_CLIENTID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  \n# https://<<TENANT NAME>>.b2clogin.com/<<TENANT NAME>>.onmicrosoft.com/<<CUSTOM POLICY NAME>>   \nVITE_AAD_ACCOUNT_AUTHORITY=https://ownercommunityb2c.b2clogin.com/ownercommunityb2c.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN   \n# <<Applicaiton (client) ID>>|openid \nVITE_AAD_ACCOUNT_SCOPES=openid\n# https://<<TENANT NAME>>.b2clogin.com/<<TENANT NAME>>.onmicrosoft.com/<<CUSTOM POLICY NAME>>/oauth2/v2.0/authorize?p=<<CUSTOM POLICY NAME>>  \nVITE_AAD_KNOWN_AUTHORITIES=https://ownercommunityb2c.b2clogin.com/ownercommunityb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN  \n# Where to redirect to after login \nVITE_AAD_REDIRECT_URI=http://localhost:3000  \nVITE_PORTAL_IDENTIFIER=ownercommunity-member \n# Feature flag url\nVITE_FEATURE_FLAG_URL=https://ownercommunity.blob.core.windows.net/feature-flag/feature-flag.json\nVITE_TIMEOUT_BEFORE_MAINTENANCE=120\n"})}),"\n",(0,o.jsx)("br",{}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsxs)(t.strong,{children:["2. Create a ",(0,o.jsx)(t.em,{children:(0,o.jsx)(t.strong,{children:'"local.settings.json"'})})," file in the base of the data-access folder of the project and copy the value below into it"]}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:'{\n  "IsEncrypted": false,\n  "Values": {\n\n    "MAPS_AZURE_SUBSCRIPTION_ID-INFO": "this is the subscription id of the map app identity",\n    "MAPS_AZURE_SUBSCRIPTION_ID": "",\n\n    "MAPS_RESOURCE_GROUP-INFO": "this is the resource group of the azure map app",\n    "MAPS_RESOURCE_GROUP": "rg-owner-community",\n\n    "MAPS_OBJECT_PRINCIPAL_ID-INFO": "this is the principal id of the map app identity",\n    "MAPS_OBJECT_PRINCIPAL_ID": "",  \n\n    "MAPS_ACCOUNT_NAME-INFO": "this is the name of the azure map account",\n    "MAPS_ACCOUNT_NAME": "oc-maps",\n\n    "VERCEL_TOKEN" : "",\n    "VERCEL_PROJECT" : "ownercommunity-firsthit",\n\n    "CONTENT_MODERATOR_SUBSCRIPTION_KEY": "",\n    "CONTENT_MODERATOR_ENDPOINT": "https://oc-cm.cognitiveservices.azure.com/",\n\n    "APPLICATIONINSIGHTS_CONNECTION_STRING": "";\n    \n    "BLOB_ACCOUNT_NAME": "ownercommunity",\n    "BLOB_ACCOUNT_KEY": "",\n    \n    "ACCOUNT_PORTAL_OIDC_ENDPOINT" : "https://ownercommunityb2c.b2clogin.com/ownercommunityb2c.onmicrosoft.com/b2c_1a_signup_signin/discovery/v2.0/keys",\n    "ACCOUNT_PORTAL_OIDC_AUDIENCE-info": "this comes from a B2C appliction -> B2C Appliction ClientID",\n    "ACCOUNT_PORTAL_OIDC_AUDIENCE": "http://localhost:3000/",  \n    "TO_GET_ACCOUNT_PORTAL_OIDC_ISSUER":"look it up from OIDC ENDPOINT",\n    "ACCOUNT_PORTAL_OIDC_ISSUER": "https://ownercommunityb2c.b2clogin.com/9227e22b-4754-46be-98c1-2a1a1e40457e/", \n\n    "FUNCTIONS_WORKER_RUNTIME": "node",\n    "AzureWebJobsStorage": "",\n    \n    "COSMOSDB": << removed >>,\n    "COSMOSDB_POOL_SIZE": "10",\n    "COSMOSDB_DBNAME": "owner-community",\n\n    "SEARCH_API_ENDPOINT" : "https://owner-community-search.search.windows.net",\n    "SEARCH_API_KEY" : "",\n\n    "languageWorkers:node:arguments": "--inspect=5858",\n    "NODE_ENV": "development"\n  },\n  "Host": {\n    "LocalHttpPort": 7071,\n    "CORS": "*"\n  }\n}\n'})})]})}function p(n={}){const{wrapper:t}={...(0,i.R)(),...n.components};return t?(0,o.jsx)(t,{...n,children:(0,o.jsx)(_,{...n})}):_(n)}},8453:(n,t,e)=>{e.d(t,{R:()=>s,x:()=>c});var o=e(6540);const i={},r=o.createContext(i);function s(n){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function c(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),o.createElement(r.Provider,{value:t},n.children)}}}]);