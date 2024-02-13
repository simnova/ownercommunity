import { Row, Space, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.JSX.Element;
  forceLogin?: boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
  const auth = useAuth();
  const location = useLocation();

  // automatically sign-in
  useEffect(() => {
    if (
      !hasAuthParams() &&
      props.forceLogin === true &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !auth.error
    ) {
      window.sessionStorage.setItem('redirectTo', `${location.pathname}${location.search}`);

      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect, auth.error]);

  if (auth.isLoading || auth.activeNavigator) {
    //still loading
    return (
      <Row justify={'center'} style={{ height: '100vh', alignItems: 'center' }}>
        <Space size={'large'} direction="vertical" style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <Typography.Title level={2}>Please wait...</Typography.Title>
        </Space>
      </Row>
    );
  }
  let result: React.JSX.Element;
  if (auth.isAuthenticated) {
    result = props.children;
  } else if (auth.error) {
    result = <Navigate to="/" />;
  } else {
    return (
      <Row justify={'center'} style={{ height: '100vh', alignItems: 'center' }}>
        <Space size={'large'} direction="vertical" style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>Not Authorized</Typography.Title>
        </Space>
      </Row>
    );
  }

  return result;
};
export default RequireAuth;
