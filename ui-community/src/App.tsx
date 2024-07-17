import { Route, Routes } from 'react-router-dom';
import './App.css';
import ApolloConnection from './components/shared/apollo-connection';
import { Accounts } from './components/layouts/accounts';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Root } from './components/layouts/root';
import { AuthLanding } from './components/shared/auth-landing';
import RequireAuth from './components/shared/require-auth';
import { AHPProofOfConcepts, AHPRootRouteLayer } from './components/layouts/ahp-proof-of-concepts';

function App() {
  const authSection = (
    <RequireAuth forceLogin={true}>
      <AuthLanding />
    </RequireAuth>
  );

  const rootSection = (
    <ApolloConnection AuthenticationIdentifier="account">
      <Root />
    </ApolloConnection>
  );

  const communitySection = (
    <RequireAuth forceLogin={false}>
      <ApolloConnection AuthenticationIdentifier="account">
        <Routes>
          <Route path="/accounts/*" element={<Accounts />} />
          <Route path="/:communityId/admin/:memberId/*" element={<Admin />} />
          <Route path="/:communityId/member/:memberId/*" element={<Members />} />
        </Routes>
      </ApolloConnection>
    </RequireAuth>
  );

  const ahpProofOfConceptsSection = <AHPProofOfConcepts />;

  return (
    <Routes>
      <Route path="*" element={rootSection}></Route>
      <Route path="/community/*" element={communitySection} />
      <Route path="/login" element={authSection} />
      <Route path={`/${AHPRootRouteLayer}/*`} element={ahpProofOfConceptsSection} />
    </Routes>
  );
}

export default App;
