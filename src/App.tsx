import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireMsal from './components/shared/require-msal';
import RequireAuth from './components/shared/require-auth';
import ApolloConnection from './components/shared/apollo-connection';

import { Root } from './components/layouts/root';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Accounts } from './components/layouts/accounts';
import { AuthLanding } from './components/shared/auth-landing';
import { useEffect } from 'react';

function App() {

  const rootSection = (
    <ApolloConnection AuthenticationIdentifier="account">
      <Root />
    </ApolloConnection>
  )

  const adminSection = (
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
        <Admin />
      </ApolloConnection>
    </RequireMsal>
  )

  const accountsSection = (
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
        <Accounts />
      </ApolloConnection>
    </RequireMsal>
  )
  
  const memberSection = (
    <RequireMsal identifier="account">
      <RequireAuth>
        <ApolloConnection AuthenticationIdentifier="account">
          <Members />
        </ApolloConnection>
      </RequireAuth>
    </RequireMsal>
  )

  useEffect(() => {
    const trySetCommunityId = async() => {
      console.log('app-mounted');
      //attempt to lookup community id from url
      const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/community-domains/${ window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '') }`);
      const data = await api_call.json();
      if(data && data.communityId ){
        console.log('community-id:',data.communityId);
        localStorage.setItem('communityId',data.communityId);
        localStorage.setItem('communityUrl',`${window.location.protocol}//${window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '')}`);
      }
    }
    trySetCommunityId();
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={rootSection}></Route>
        <Route path='/community/:communityId/admin/*' element={adminSection} />
        <Route path='/community/:communityId/members/*' element={memberSection} />
        <Route path='accounts/*' element={accountsSection} />
      </Routes>
    </>
  );
}

export default App;