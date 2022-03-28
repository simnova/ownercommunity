import {Button} from 'antd'
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import PageEditor from './components/page-editor';
import Home from './components/home';
import CmsPage from './components/cms-page';
import { PageTree } from './components/page-tree';
import AdminLayout from './components/admin-layout';
import RequireMsal from './components/shared/require-msal';
import ApolloConnection from './components/shared/apollo-connection';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import RequireAuth from './components/shared/require-auth';
import { Accounts } from './components/layouts/accounts';

function App() {
  const homeSection = (
    <ApolloConnection AuthenticationIdentifier="account">
      <Home />
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
        <Route path="/" element={homeSection}>
        </Route>
        <Route path='admin/*' element={adminSection} />
        <Route path='members/*' element={memberSection} />
        <Route path='accounts/*' element={accountsSection} />


        <Route path="/admin2" element={<AdminLayout />}> 
          <Route path="pageEditor" element={<PageEditor />} />
          <Route path="pageTree" element={<PageTree />} />
        </Route>

       
        <Route path="*" element={<CmsPage />} /> 
      </Routes>
    </>
  );
}

export default App;
