import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import './index.less';
import './styles/ant.less';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import MsalProvider from './components/shared/msal-react-lite';
import msalProviderConfig from './config/msal-config';
import ApolloConnection from './components/shared/apollo-connection';

/*
import {
  ApolloLink, HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";



const countryLink = new HttpLink({
  uri: "https://countries.trevorblades.com/",
})
const serviceLink = new HttpLink({
  uri: "http://localhost:7071/api/graphql",
})

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'country',
    countryLink,
    serviceLink
  ),
  cache: new InMemoryCache()
});
*/

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider config={msalProviderConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
