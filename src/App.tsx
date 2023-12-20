import { Route, Routes } from 'react-router-dom';
import './App.css';
import ApolloConnection from './components/shared/apollo-connection';
import RequireMsal from './components/shared/require-msal';

import { Accounts } from './components/layouts/accounts';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Root } from './components/layouts/root';
import { AuthLanding } from './components/shared/auth-landing';

function App() {
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
    <Routes>
      <Route path="*" element={rootSection}></Route>
      <Route path="/community/*" element={communitySection} />
      <Route path="/login" element={authSection} />
    </Routes>
  );
}

export default App;
