import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireMsal from './components/shared/require-msal';
import ApolloConnection from './components/shared/apollo-connection';
import RelayConnection from './components/shared/relay-connection';

import { Root } from './components/layouts/root';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Accounts } from './components/layouts/accounts';
import { AuthLanding } from './components/shared/auth-landing';
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from './components/shared/relay/environment';

function App() {

  const authSection = (
    <RequireMsal identifier="account" forceLogin={true}>
      <AuthLanding />
    </RequireMsal>
  );

  const rootSection = (
    // <ApolloConnection AuthenticationIdentifier="account">
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Root />
    </RelayEnvironmentProvider>
    // </ApolloConnection>
  );

  const communitySection = (
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
      {/* <RelayEnvironmentProvider environment={RelayEnvironment}> */}
      <RelayConnection AuthenticationIdentifier="account">
        <Routes>
          <Route path="/accounts/*" element={<Accounts />} />
          <Route path="/:communityId/admin/*" element={<Admin />} />
          <Route path="/:communityId/member/:userId/*" element={<Members />} />
        </Routes>
      </RelayConnection>
      {/* </RelayEnvironmentProvider> */}
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
