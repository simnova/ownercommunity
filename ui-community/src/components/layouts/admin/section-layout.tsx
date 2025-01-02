import { Layout, theme } from 'antd';
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { CommunitiesDropdownContainer } from '../../ui/organisms/dropdown-menu/communities-dropdown-container';
import { LoggedInUserContainer } from '../../ui/organisms/header/logged-in-user.container';
import './section-layout.css';
import { Content } from 'antd/es/layout/layout';

const { Header } = Layout;

interface AdminSectionLayoutProps {}

export const SectionLayout: React.FC<AdminSectionLayoutProps> = () => {
  const params = useParams();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout
      // className="site-layout"
      style={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        overflowY: 'hidden'
      }}
    >
      <Header
        style={{
          display: 'flex',
          padding: '0 16px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          zIndex: 1000,
          backgroundColor: colorBgContainer
        }}
      >
        <CommunitiesDropdownContainer data={{ id: params.communityId }} />
        <Link className="allowBoxShadow" to={`/community/${params.communityId}/member/${params.memberId}`}>
          View Member Site
        </Link>
        <LoggedInUserContainer autoLogin={true} />
      </Header>
      <Layout
        style={{
          transform: 'translateY(60px)'
        }}
      >
        <Content
          style={{
            overflowX: 'hidden',
            width: '100%'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
