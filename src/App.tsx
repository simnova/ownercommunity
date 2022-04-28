import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import RequireMsal from './components/shared/require-msal';
import ApolloConnection from './components/shared/apollo-connection';

import { Root } from './components/layouts/root';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Accounts } from './components/layouts/accounts';
import { AuthLanding } from './components/shared/auth-landing';
import { BlobToLocalStorage } from './components/shared/blob-to-local-storage';

function App() {
  const params = useParams();

  const authSection = (
    <RequireMsal identifier='account' forceLogin={true}>
      <AuthLanding />
    </RequireMsal>
  )

  const rootSection = (
    <ApolloConnection AuthenticationIdentifier="account">
      <Root />
    </ApolloConnection>
  )

  const communitySection = (    
    <RequireMsal identifier="account">
      <ApolloConnection AuthenticationIdentifier="account">
        <Routes>
          <Route path='/accounts/*' element={ <Accounts />} />
          <Route path='/:communityId/admin/*' element={ <Admin />} />
          <Route path='/:communityId/members/*' element={<Members />} />
        </Routes>
      </ApolloConnection>
    </RequireMsal>
  )

  return (
    <>
      <Routes>
        <Route path="*" element={rootSection}></Route>
        <Route path='/community/*' element={communitySection} />
        <Route path='/login' element={authSection} />
      </Routes>
    </>
  );
}

export default App;