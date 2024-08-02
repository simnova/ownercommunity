import { Button, Layout } from "antd";
import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { GetUserRoles, UserRoles, GetAccessToken } from '../../../constants';

export interface SectionLayoutProps {
  
}

export const SectionLayout: React.FC<SectionLayoutProps> = () => {
  const auth = useAuth();
  const userRoles = GetUserRoles();
  const accessToken = GetAccessToken();

  const handleLogout = async () => {
    await auth.removeUser();
    await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
  };
  
  return (
    <Layout className='site-layout' style={{ minHeight: '100vh' }}>
      <div className='text-right ml-3'>
        <span className='text-sky-400 mr-3'>{' '}{accessToken.given_name} {accessToken.family_name}{' '}</span>
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