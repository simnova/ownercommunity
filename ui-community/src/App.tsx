import { Route, Routes } from 'react-router-dom';
import './App.css';
import ApolloConnection from './components/shared/apollo-connection';
import { Accounts } from './components/layouts/accounts';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Root } from './components/layouts/root';
import { Staff } from './components/layouts/staff';
import { AuthLanding } from './components/shared/auth-landing';
import RequireAuth from './components/shared/require-auth';
import { AHPProofOfConcepts, AHPRootRouteLayer } from './components/layouts/ahp-proof-of-concepts';
import { AuthProvider } from 'react-oidc-context';
import { uiConfig, staffConfig } from './config/odic-config';

function App() {
  const authSection = (
    <AuthProvider {...uiConfig}>
      <RequireAuth forceLogin={true}>
        <AuthLanding />
      </RequireAuth>
    </AuthProvider>
  );

  const rootSection = (
    <AuthProvider>
      <ApolloConnection AuthenticationIdentifier="account">
        <Root />
      </ApolloConnection>
    </AuthProvider>
  );

  const communitySection = (
    <AuthProvider {...uiConfig}>
      <RequireAuth forceLogin={false}>
        <ApolloConnection AuthenticationIdentifier="account">
          <Routes>
            <Route path="/" element={<Accounts />} />
            <Route path="/accounts/*" element={<Accounts />} />
            <Route path="/:communityId/admin/:memberId/*" element={<Admin />} />
            <Route path="/:communityId/member/:memberId/*" element={<Members />} />
            <Route path={`/${AHPRootRouteLayer}/*`} element={<AHPProofOfConcepts />} />
          </Routes>
        </ApolloConnection>
      </RequireAuth>
    </AuthProvider>
  );

  const staffSection = (
    <AuthProvider {...staffConfig}>
      <RequireAuth forceLogin={false}>
        <ApolloConnection AuthenticationIdentifier="staff">
          <Routes>
            <Route path="/" element={<Staff />} />
          </Routes>
        </ApolloConnection>
      </RequireAuth>
    </AuthProvider>
  );

  return (
    <Routes>
      <Route path="*" element={rootSection}></Route>
      <Route path="/community/*" element={communitySection} />
      <Route path="/staff/*" element={staffSection} />
      <Route path="/login" element={authSection} />
    </Routes>
  );
}

export default App;
