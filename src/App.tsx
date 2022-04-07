import './App.css';
import { Routes, Route } from "react-router-dom";
import RequireMsal from './components/shared/require-msal';
import RequireAuth from './components/shared/require-auth';
import ApolloConnection from './components/shared/apollo-connection';

import { Root } from './components/layouts/root';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Accounts } from './components/layouts/accounts';

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