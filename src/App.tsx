import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireMsal from './components/shared/require-msal';
import ApolloConnection from './components/shared/apollo-connection';

import { Root } from './components/layouts/root';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Accounts } from './components/layouts/accounts';
import { AuthLanding } from './components/shared/auth-landing';
import packageVersion from '../package.json';
import { useEffect } from 'react';
import axios from 'axios';
import { set } from 'lodash';
const appVersion = packageVersion.version;
console.log("Printing pacakge version",process.env.npm_package_version)
function App() {
  let cachedVersion = localStorage.getItem('cachedVersion');
  useEffect(() => {
    // check if there is cachedVersion in localstorage
    cachedVersion = localStorage.getItem('cachedVersion');
    if (!cachedVersion) {
      localStorage.setItem('cachedVersion', appVersion);
    }
  }, []);

  const fethcVersion = async () => {
    // const { data } = await axios.get('http://localhost:8000');
    const url = 'http://localhost:3000/meta.json';

const config = {
  params: {
    timestamp: Date.now(),
  },
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

const response = await axios.get(url,config);
const data = response.data;
    console.log('Checking version', data.version, cachedVersion);
    if (cachedVersion && data.version !== cachedVersion) {
      console.log(data.version);
      localStorage.setItem('cachedVersion', data.version);
      window.location.reload();
    }
  };

  useEffect(() => {
    fethcVersion();
    setInterval(() => {
      fethcVersion();
    }, 1 * 1000);
  }, []);

  const authSection = (
    <RequireMsal identifier="account" forceLogin={true}>
      <AuthLanding />
    </RequireMsal>
  );

  const rootSection = (
    <ApolloConnection AuthenticationIdentifier="account">
      <Root />
    </ApolloConnection>
  );

  const communitySection = (
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
        <Routes>
          <Route path="/accounts/*" element={<Accounts />} />
          <Route path="/:communityId/admin/*" element={<Admin />} />
          <Route path="/:communityId/member/:userId/*" element={<Members />} />
        </Routes>
      </ApolloConnection>
    </RequireMsal>
  );

  return (
    <>
      <Routes>
        <Route path="*" element={rootSection}></Route>
        <Route path="/community/*" element={communitySection} />
        <Route path="/login" element={authSection} />
      </Routes>
    </>
  );
}

export default App;
