import {Avatar, Button, Layout, Space } from "antd";
import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { GetUserRoles, UserRoles } from '../../../constants';

export const SectionLayout: React.FC<any> = () => {
  const auth = useAuth();
  const userRoles = GetUserRoles();

  const handleLogout = async () => {
    await auth.removeUser();
    await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
  };
  
  return (
    <Layout className='site-layout' style={{ minHeight: '100vh' }}>
      <div className='text-right ml-3'>
        <Button style={{ margin: '5px 5px' }} onClick={() => handleLogout()}>Log Out</Button>
      </div>
      {userRoles.includes(UserRoles.Staff) ? (
        <Outlet />
      ) : (
        <div>You are not a Staff user</div>
      )}
    </Layout>
  )
}